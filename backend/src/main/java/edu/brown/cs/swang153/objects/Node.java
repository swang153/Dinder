package edu.brown.cs.swang153.objects;

import java.util.List;

/**
 * Interface representing a generic node in a tree.
 *
 */
public interface Node {

  /**
   * Gets Node's Coordinates.
   *
   * @return Node's Coordinates
   */
  List<Double> getCoordinates();

  /**
   * Adds a left child to the Node.
   *
   * @param left the Node to be added as left child
   */
  void setLeft(Node left);

  /**
   * Adds a right child to the Node.
   *
   * @param right the Node to be added as right child
   */
  void setRight(Node right);

  /**
   * Gets the Node's left child.
   *
   * @return the Node's left child
   */
  Node getLeft();

  /**
   * Gets the Node's right child.
   *
   * @return the Node's right child
   */
  Node getRight();

  /**
   * Gets the Node's depth.
   *
   * @return the node's current depth
   */
  int getDepth();

  /**
   * Sets the Node's depth.
   *
   * @param depth Node's depth
   */
  void setDepth(int depth);

  /**
   * Sets Node's parent.
   *
   * @param node Node's parent
   */
  void setParent(Node node);

  /**
   * Gets the Node's parent.
   *
   * @return the Node's parent
   */
  Node getParent();

  /**
   * Gets the Node's string ID.
   *
   * @return Node ID
   */
  String getID();

  /**
   * Gets the Node's Name.
   *
   * @return Node name
   */
  String getName();

  /**
   * Sets Node's k-dimensional distance from target.
   *
   * @param d Node's distance
   */
  void setDistance(Double d);

  /**
   * Gets Node's k-dimensional distance from target.
   *
   * @return Node's distance
   */
  Double getDistance();
}
