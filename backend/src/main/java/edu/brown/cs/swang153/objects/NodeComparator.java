package edu.brown.cs.swang153.objects;

import java.util.Comparator;
import java.util.List;

/**
 * Class contains function to compare Node Coordinates based on selected
 * dimension.
 *
 * @param <T> Class that extends Node
 */
public class NodeComparator<T extends Node> implements Comparator<T> {

  private int currDimensionIndex;

  /**
   * Constructors sets current dimension to zero.
   */
  public NodeComparator() {
    this.currDimensionIndex = 0;
  }

  /**
   * Updates the coordinate dimension that the comparator should compare on.
   *
   * @param dimension The current dimension of the KD-Tree
   */
  public void setDimension(int dimension) {
    this.currDimensionIndex = dimension;
  }

  @Override
  public int compare(T n1, T n2) {
    List<Double> n1Coordinates = n1.getCoordinates();
    List<Double> n2Coordinates = n2.getCoordinates();

    if (n1Coordinates.get(this.currDimensionIndex) > n2Coordinates
        .get(this.currDimensionIndex)) {
      return 1;
    } else if (n2Coordinates.get(this.currDimensionIndex) > n1Coordinates
        .get(this.currDimensionIndex)) {
      return -1;
    }
    return 0;
  }
}
