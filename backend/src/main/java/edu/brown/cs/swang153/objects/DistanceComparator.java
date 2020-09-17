package edu.brown.cs.swang153.objects;

import java.util.Comparator;

/**
 * Comparator to compare the distances of two nodes.
 *
 */
public class DistanceComparator implements Comparator<Node> {

  /**
   * Constructor. No variables
   */
  public DistanceComparator() {

  }

  @Override
  public int compare(Node n1, Node n2) {
    Double n1Distance = n1.getDistance();
    Double n2Distance = n2.getDistance();

    if (n1Distance > n2Distance) {
      return -1;
    } else if (n1Distance < n2Distance) {
      return 1;
    }
    return 0;
  }
}
