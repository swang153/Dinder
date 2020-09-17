package edu.brown.cs.swang153;

import edu.brown.cs.swang153.objects.*;
import org.junit.Test;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class NodeComparatorTest {
  private NaiveStudent makeStudent(Double x, Double y, Double z) {
    List<Double> coordList = new ArrayList<Double>();
    coordList.add(x);
    coordList.add(y);
    coordList.add(z);
    return new NaiveStudent(coordList);
  }

  /**
   * Tests that basic node comparison works.
   */
  @Test
  public void basicTest() {
    NaiveStudent n1 = this.makeStudent(15.0, 25.0, 30.0);
    NaiveStudent n2 = this.makeStudent(20.0, 12.0, 30.01);
    NodeComparator<Node> comparator = new NodeComparator<Node>();
    comparator.setDimension(0);
    assertEquals(comparator.compare(n1, n2), -1);
    comparator.setDimension(1);
    assertEquals(comparator.compare(n1, n2), 1);
    comparator.setDimension(2);
    assertEquals(comparator.compare(n1, n2), -1);
  }
  /**
   * Tests that comparator works when nodes are equal
   */
  @Test
  public void equalTest() {
    NaiveStudent n1 = this.makeStudent(15.1, 10.1, 12.1);
    NaiveStudent n2 = this.makeStudent(15.1, 10.1, 12.1);
    NodeComparator<Node> comparator = new NodeComparator<Node>();
    comparator.setDimension(0);
    assertEquals(comparator.compare(n1, n2), 0);
    comparator.setDimension(1);
    assertEquals(comparator.compare(n1, n2), 0);
    comparator.setDimension(2);
    assertEquals(comparator.compare(n1, n2), 0);
  }
  /**
   * Tests that comparator works with large coordinates
   */
  @Test
  public void largeTest() {
    NaiveStudent n1 = this.makeStudent(1500000.0123, -2500043.030, -30334431.01342);
    NaiveStudent n2 = this.makeStudent(204323.0, 12432.0, 34320.01);
    NodeComparator<Node> comparator = new NodeComparator<Node>();
    comparator.setDimension(0);
    assertEquals(comparator.compare(n1, n2), 1);
    comparator.setDimension(1);
    assertEquals(comparator.compare(n1, n2), -1);
    comparator.setDimension(2);
    assertEquals(comparator.compare(n1, n2), -1);
  }
}
