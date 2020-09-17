package edu.brown.cs.swang153;

import edu.brown.cs.swang153.objects.DistanceComparator;
import edu.brown.cs.swang153.objects.NaiveStudent;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class DistanceComparatorTest {
  private NaiveStudent makeStudent(Double x, Double y, Double z) {
    List<Double> coordList = new ArrayList<Double>();
    coordList.add(x);
    coordList.add(y);
    coordList.add(z);
    return new NaiveStudent(coordList);
  }
  /**
   * Test that comparator works with negative values
   */
  @Test
  public void negativeTest() {
    DistanceComparator comparator = new DistanceComparator();
    NaiveStudent n1 = this.makeStudent( 1.0, 1.0, 1.0);
    n1.setDistance(-10.0);
    NaiveStudent n2 = this.makeStudent(1.0, 1.0, 1.0);
    n2.setDistance(5.0);
    assertEquals(comparator.compare(n1, n2), 1);
  }
  /**
   * Test that comparator works with decimal values
   */
  @Test
  public void decimalTest() {
    DistanceComparator comparator = new DistanceComparator();
    NaiveStudent n1 = this.makeStudent(1.0, 1.0, 1.0);
    n1.setDistance(5.04192);
    NaiveStudent n2 = this.makeStudent(1.0, 1.0, 1.0);
    n2.setDistance(5.04191);
    assertEquals(comparator.compare(n1, n2), -1);
  }
  /**
   * Test that comparator works with equal values
   */
  @Test
  public void equalTest() {
    DistanceComparator comparator = new DistanceComparator();
    NaiveStudent n1 = this.makeStudent(1.0, 1.0, 1.0);
    n1.setDistance(-231.12);
    NaiveStudent n2 = this.makeStudent(1.0, 1.0, 1.0);
    n2.setDistance(-231.12);
    assertEquals(comparator.compare(n1, n2), 0);
  }
  /**
   * Test that comparator works with -0 and 0
   */
  @Test
  public void negZeroTest() {
    DistanceComparator comparator = new DistanceComparator();
    NaiveStudent n1 = this.makeStudent(0.0, 1.0, 1.0);
    n1.setDistance(-0.0);
    NaiveStudent n2 = this.makeStudent(0.0, 1.0, 1.0);
    n2.setDistance(0.0);
    assertEquals(comparator.compare(n1, n2), 0);
  }
}
