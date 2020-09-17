package edu.brown.cs.swang153.objects;

import java.util.List;

/**
 * Dummy student class used for JUnit Node and distance comparator tests.
 */
public class NaiveStudent implements Node {
  private List<Double> coordinates;
  private Double distance;

  /**
   * Constructor.
   * @param coordinates x,y,z coordinates
   */
  public NaiveStudent(List<Double> coordinates) {
    this.coordinates = coordinates;
    this.distance = Double.MAX_VALUE;
  }

  /**
   * Gets the coordinates of the node.
   * @return coordinate
   */
  public List<Double> getCoordinates() {
    return this.coordinates;
  }

  @Override
  public void setLeft(Node left) {
  }

  @Override
  public void setRight(Node right) {

  }

  @Override
  public Node getLeft() {
    return null;
  }

  @Override
  public Node getRight() {
    return null;
  }

  @Override
  public int getDepth() {
    return 0;
  }

  @Override
  public void setDepth(int depth) {

  }

  @Override
  public void setParent(Node node) {

  }

  @Override
  public Node getParent() {
    return null;
  }

  @Override
  public String getID() {
    return null;
  }

  @Override
  public String getName() {
    return null;
  }

  @Override
  public void setDistance(Double d) {
    this.distance = d;
  }

  @Override
  public Double getDistance() {
    return this.distance;
  }
}
