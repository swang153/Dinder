package edu.brown.cs.swang153.commands;

import java.io.File;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.brown.cs.swang153.objects.KDTree;
import edu.brown.cs.swang153.objects.Node;
import edu.brown.cs.swang153.objects.QAHash;
import edu.brown.cs.swang153.objects.Query;
import edu.brown.cs.swang153.objects.Student;

/**
 * Class to hold all commands the Dinder program will execute.
 */
public class DinderCommands {
  private static Query db = null;
  private static List<Node> nodes;
  private static final int NUM_MATCHES = 3;

  /**
   * Gets the database of users.
   * 
   * @return Query
   */
  public static Query getQuery() {
    return db;
  }

  /**
   * Gets the List of student nodes.
   * 
   * @return List of students
   */
  public List<Node> getStudents() {
    return this.nodes;
  }

  /**
   * Queries the database for students and constructs the KDTree to print
   * matches in the command line.
   * 
   * @param args       REPL args
   * @param vegetarian boolean if student wants only to be matched w/
   *                   vegetarians
   */
  public static void commandLineMatches(String[] args, boolean vegetarian) {
    boolean isValid = true;
    KDTree tree;
    if (vegetarian) {
      try {
        if (!db.vegetarian(args[0])) {
          System.err.println(
              "ERROR: cannot be matched with vegetarians if you aren't vegetarian");
        }
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
    if (db == null) {
      System.err.println("ERROR: Must call dinder to set up database first");
      return;
    }
    if (args == null) {
      System.err.println("ERROR: Invalid argument for match command");
      isValid = false;
    }
    if (args.length == 1) {
      //
      Student target = null;
      int dimension = 0;
      try {
        nodes = db.getStudents(vegetarian);
      } catch (SQLException e) {
        System.err.println("ERROR: Could not create students from database");
      }
      for (Node s : nodes) {
        if (s.getID().equals(args[0])) {
          target = (Student) s;
          dimension = target.getCoordinates().size();
        }
      }

      // if student not found
      if (target == null) {
        System.err.println("ERROR: student not found in database");
        isValid = false;
      }
      if (isValid) {
        tree = new KDTree();
        tree.makeTree(nodes, 0, dimension);
        tree.matchNames(tree.getRoot(), target, NUM_MATCHES);
        tree.printPQ();
      }
    }
  }

  /**
   * Queries the database for students and constructs the KDTree to return a
   * list of matches as Student nodes.
   * 
   * @param id         student's id
   * @param vegetarian boolean if student wants only to be matched w/
   *                   vegetarians
   * @return list of student node matches
   */
  public static List<Student> frontendMatches(String id, boolean vegetarian) {
    boolean isValid = true;
    KDTree tree;
    Student target = null;
    int dimension = 0;
    if (vegetarian) {
      try {
        if (!db.vegetarian(id)) {
          System.err.println(
              "ERROR: cannot be matched with vegetarians if you aren't vegetarian");
        }
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
    try {
      nodes = db.getStudents(vegetarian);
    } catch (SQLException e) {
      System.err.println("ERROR: Could not create students from database");
    }
    for (Node s : nodes) {
      if (s.getID().equals(id)) {
        target = (Student) s;
        dimension = target.getCoordinates().size();
      }
    }
    // if student not found
    if (target == null) {
      System.err.println("ERROR: student not found in database");
      isValid = false;
    }
    if (isValid) {
      tree = new KDTree();
      tree.makeTree(nodes, 0, dimension);
      tree.matchNames(tree.getRoot(), target, NUM_MATCHES);
      return tree.getStudents();
    } else {
      return null;
    }
  }

  /**
   * Connects to the database of the students.
   */
  public class CmdData implements Command {

    @Override
    public void callback(String[] args) {
      // Check if input is valid
      if (args.length != 1 | args == null) {
        System.err.println("ERROR: Invalid argument for maps command");
        return;
      } else if (!new File(args[0]).exists() || !args[0].endsWith(".sqlite3")) {
        System.err.println(
            "ERROR: File does not exist (make sure to include .sqlite3 extension");
        return;
      }
      String dbName = args[0];
      // set up database connection
      try {
        db = new Query(dbName);
        if (db.getConn() == null) {
          System.err.println("ERROR: Could not set up connection to database");
        }
        System.out.println("dinder set to " + dbName);
      } catch (Exception e) {
        System.err.println("ERROR: Could not set up connection to database");
      }
      // build QAHash
      Map<Integer, String> map = new HashMap<Integer, String>();
      map.put(0, "email");
      map.put(1, "password");
      map.put(2, "firstName");
      map.put(3, "lastName");
      map.put(4, "gender");
      map.put(5, "profilePicture");
      map.put(6, "introMessage");
      map.put(7, "gradYear");
      map.put(8, "concentration");
      map.put(9, "classes");
      map.put(10, "breakfast");
      map.put(11, "lunch");
      map.put(12, "dinner");
      map.put(13, "vegetarian");
      map.put(14, "diningHall");
      map.put(15, "thayer");
      map.put(16, "pineapple");
      map.put(17, "eggs");
      map.put(18, "coffee");
      map.put(19, "takeout");
      QAHash.setMap(map);
    }
  }

  public class CmdMatch implements Command {
    @Override
    public void callback(String[] args) {
      DinderCommands.commandLineMatches(args, false);
    }

    /**
     * Returns Student nodes of matches for frontend.
     * 
     * @param id student ID
     * @return List of student nodes
     */
    public List<Student> getMatches(String id) {
      return DinderCommands.frontendMatches(id, false);
    }
  }

  public class CmdVegetarian implements Command {

    @Override
    public void callback(String[] args) {
      DinderCommands.commandLineMatches(args, true);
    }

    /**
     * Returns Student nodes of vegetarian matches for frontend.
     * 
     * @param id student ID
     * @return List of vegetarian student nodes
     */
    public List<Student> getVegetarianMatches(String id) {
      return DinderCommands.frontendMatches(id, true);
    }
  }
}
