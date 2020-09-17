package edu.brown.cs.swang153.objects;

import java.util.List;


/**
 * Class contains functions to calculate distances between Nodes and Coordinates.
 */
public class DistanceCalculator {

  /**
   * Gets the distance between two coordinates.
   *
   * @param target  Target coordinate
   * @param current Current coordinate
   * @return Euclidean distance between two coordinates
   */
  public Double getDistance(List<Double> target, List<Double> current) {
    int dim = target.size();

    // loop through coordinates to find euclidean distance
    double distance = 0;
    for (int i = 0; i < dim; i++) {
      distance += this.axisDistance(target, current, i);
    }

    return distance;
  }

  /**
   * Gets the distance between two coordinates in given axis.
   *
   * @param target  Target coordinate
   * @param current Current coordinate
   * @param axis    axis to compare
   * @return Euclidean distance between two coordinates in given axis
   */
  public double axisDistance(List<Double> target, List<Double> current, int axis) {
    return Math.pow(target.get(axis) - current.get(axis), 2);
  }

}
