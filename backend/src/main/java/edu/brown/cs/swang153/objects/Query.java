package edu.brown.cs.swang153.objects;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * query class with caching.
 */
public class Query {
  // variables
  private static Connection conn = null;

  /**
   * Constructor. Make a connection to the database.
   * @param filename filename location of database file.
   */
  public Query(String filename) {
    File f = new File(filename);
    if (!f.exists()) {
      throw new IllegalArgumentException();
    }
    try {
      Class.forName("org.sqlite.JDBC");
      String urlToDB = "jdbc:sqlite:" + filename;
      conn = DriverManager.getConnection(urlToDB);
      Statement stat = conn.createStatement();
      stat.executeUpdate("PRAGMA foreign_keys=ON;");
    } catch (SQLException e) {
      System.err
          .println("ERROR: Connection to SQLite could not be established.");
    } catch (ClassNotFoundException e) {
      System.err.println("ERROR: Class not found exception.");
    }
  }
  public boolean vegetarian(String studentID) throws SQLException {
    PreparedStatement prep = conn.prepareStatement("SELECT vegetarian FROM profiles WHERE "
        + "email=?;");
    prep.setString(1, studentID);
    ResultSet rs = prep.executeQuery();
    String vegetarian = rs.getString(1);
    rs.close();
    prep.close();
    if (vegetarian.equals("yes")) {
      return true;
    } else if (vegetarian.equals("no")) {
      return false;
    } else {
      System.err.println("ERROR: vegetarian does not have a yes/no value");
      return false;
    }
  }

  /**
   * Returns the current connection.
   * @return Connection
   */
  public Connection getConn() {
    return conn;
  }

  /**
   * Creates student objects from database.
   * @param vegetarian boolean if student wants to be matched w/ other vegetarians
   * @return list of student objects
   * @throws SQLException SQL Exception
   */
  public List<Node> getStudents(boolean vegetarian) throws SQLException {
    List<Node> result = new ArrayList<Node>();
    PreparedStatement prep;
    if (!vegetarian) {
      prep = conn.prepareStatement("SELECT * from profiles WHERE vegetarian='no';");
    } else {
      prep = conn.prepareStatement("SELECT * from profiles WHERE vegetarian='yes';");
    }
    // loop through every line in database
    ResultSet rs = prep.executeQuery();
    int cols = rs.getMetaData().getColumnCount();

    while (rs.next()) {
      List<String> coord = new ArrayList<String>();
      for (int i = 1; i <= cols; i++) {
        coord.add(rs.getString(i));
      }
      Student s = new Student(coord);
      result.add(s);
    }

    // close
    prep.close();
    rs.close();
    return result;
  }
  /**
   * Gets weight from a string value.
   * @param tableName table name of attribute's weights for values
   * @param variableName variable's value
   * @return numeric weight
   * @throws SQLException SQL Exception
   */
  public Double getWeight(String tableName, String variableName)
      throws SQLException {
    PreparedStatement prep = conn
        .prepareStatement("SELECT weight FROM " + tableName + " WHERE name=?;");
    prep.setString(1, variableName);
    ResultSet rs = prep.executeQuery();
    String diningWeight = rs.getString(1);
    rs.close();
    prep.close();
    return Double.parseDouble(diningWeight);
  }

  /**
   * check whether email and password are valid.
   * @param email email
   * @param password password
   * @return student object
   * @throws SQLException (if invalid email)
   */
  public Student checkLogin(String email, String password) throws SQLException {

    // find password
    PreparedStatement prep = conn
        .prepareStatement("SELECT password FROM profiles WHERE email=?;");
    prep.setString(1, email);
    ResultSet rs = prep.executeQuery();

    // null if does not exist
    if (!rs.next()) {
      return null;
    }

    String truePassword = rs.getString(1);
    rs.close();
    prep.close();

    // invalid password
    if (!truePassword.equals(password)) {
      return null;
    }

    // valid password
    prep = conn.prepareStatement("SELECT * FROM profiles WHERE email=?;");
    prep.setString(1, email);
    rs = prep.executeQuery();

    // get student profile
    int cols = rs.getMetaData().getColumnCount();
    List<String> coord = new ArrayList<String>();
    for (int i = 1; i <= cols; i++) {
      coord.add(rs.getString(i));
    }
    // close and return student
    prep.close();
    rs.close();
    Student s = new Student(coord);
    return s;
  }

  /**
   * updates a profile into database.
   * @param coord coordinates
   * @return false if the profile does not exist already
   * @throws SQLException SQL Exception
   */
  public boolean updateProfile(List<String> coord) throws SQLException {

    // find the profile
    PreparedStatement prep = conn.prepareStatement("SELECT * from profiles WHERE email=?;");
    prep.setString(1, coord.get(0));
    ResultSet rs = prep.executeQuery();

    // false if does not exist
    if (!rs.next()) {
      return false;
    }
    prep.close();
    rs.close();
    // build string for update statement
    Map<Integer, String> map = QAHash.getConverter();
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < map.size(); i++) {
      builder.append(map.get(i) + "=\"" + coord.get(i) + "\"");
      if (i != map.size() - 1) {
        builder.append(", ");
      }
    }
    String b = builder.toString();

    Statement statement = conn.createStatement();
    statement.executeUpdate(
        "UPDATE profiles SET " + b + " WHERE email=\"" + coord.get(0) + "\";");
    statement.close();
    return true;
  }

  /**
   * adds a profile into database.
   * @param coord coordinate
   * @return true if the profile already exists
   * @throws SQLException SQL Exception
   */
  public boolean addProfile(List<String> coord) throws SQLException {

    // find the profile
    PreparedStatement prep = conn
        .prepareStatement("SELECT * from profiles WHERE email=?;");
    prep.setString(1, coord.get(0));
    ResultSet rs = prep.executeQuery();

    // true if already exists
    if (rs.next()) {
      return true;
    }
    prep.close();
    rs.close();

    // build string for add statement
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < coord.size(); i++) {
      builder.append("\"" + coord.get(i) + "\"");
      if (i != coord.size() - 1) {
        builder.append(", ");
      }
    }
    String b = builder.toString();

    Statement statement = conn.createStatement();
    statement.executeUpdate("INSERT INTO profiles VALUES(" + b + ");");
    statement.close();
    return false;
  }
}
