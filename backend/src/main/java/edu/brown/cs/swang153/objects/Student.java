package edu.brown.cs.swang153.objects;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import edu.brown.cs.swang153.commands.DinderCommands;

/**
 * Class for a student profile.
 */
public class Student implements Node {

  // KD node variables
  private Node left, right, parent;
  private Double distance;
  private int depth;
  private List<Double> coordinate;
  // profile variables
  private String email, password;
  private String firstName, lastName;
  private String profilePicture;
  private String introMessage;
  private String gender, gradYear;
  private String concentration, classes;
  private String breakfast, lunch, dinner, vegetarian;
  private String diningHall, thayer;
  private String pineapple, eggs, coffee, takeout;

  /**
   * Constructor. Converts string attributes to numeric weights.
   * 
   * @param coord string coordinates of attributes
   */
  public Student(List<String> coord) {
    // node variables
    this.left = null;
    this.right = null;
    this.distance = null;
    this.depth = Integer.MAX_VALUE;
    this.coordinate = new ArrayList<Double>();
    // profile
    this.email = coord.get(0);
    this.password = coord.get(1);
    this.firstName = coord.get(2);
    this.lastName = coord.get(3);
    this.gender = coord.get(4);
    this.profilePicture = coord.get(5);
    this.introMessage = coord.get(6);
    this.gradYear = coord.get(7);
    this.concentration = coord.get(8);
    this.classes = coord.get(9);
    this.breakfast = coord.get(10);
    this.lunch = coord.get(11);
    this.dinner = coord.get(12);
    this.vegetarian = coord.get(13);
    // coordinates
    this.diningHall = coord.get(14);
    this.thayer = coord.get(15);
    this.pineapple = coord.get(16);
    this.eggs = coord.get(17);
    this.coffee = coord.get(18);
    this.takeout = coord.get(19);
    // convert coordinate strings to respective weights
    Query q = DinderCommands.getQuery();

    Map<Integer, String> converter = QAHash.getConverter();
    for (int i = 14; i < coord.size(); i++) {
      double w;
      try {
        w = q.getWeight(converter.get(i), coord.get(i));
        this.coordinate.add(w);
      } catch (SQLException e) {
        System.out.println("ERROR: weights not found");
      }
    }
  }

  @Override
  public List<Double> getCoordinates() {
    return this.coordinate;
  }

  @Override
  public void setLeft(Node left) {
    this.left = left;
  }

  @Override
  public void setRight(Node right) {
    this.right = right;
  }

  @Override
  public Node getLeft() {
    return this.left;
  }

  @Override
  public Node getRight() {
    return this.right;
  }

  @Override
  public int getDepth() {
    return this.depth;
  }

  @Override
  public void setDepth(int depth) {
    this.depth = depth;
  }

  @Override
  public void setParent(Node node) {
    this.parent = node;
  }

  @Override
  public Node getParent() {
    return this.parent;
  }

  /**
   * @return id
   */
  public String getID() {
    return this.email;
  }

  @Override
  public String getName() {
    return this.firstName;
  }

  @Override
  public void setDistance(Double d) {
    this.distance = d;
  }

  @Override
  public Double getDistance() {
    return this.distance;
  }

  /**
   * Overriding equals hashcode with user's email.
   * 
   * @return result
   */
  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((email == null) ? 0 : email.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (getClass() != obj.getClass()) {
      return false;
    }
    Student other = (Student) obj;
    if (email == null) {
      if (other.email != null) {
        return false;
      }
    } else if (!email.equals(other.email)) {
      return false;
    }
    return true;
  }
}
