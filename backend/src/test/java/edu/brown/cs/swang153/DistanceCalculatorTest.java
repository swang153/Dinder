package edu.brown.cs.swang153;

import edu.brown.cs.swang153.objects.DistanceCalculator;
import edu.brown.cs.swang153.objects.NaiveStudent;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class DistanceCalculatorTest {
  private List<Double> makeCoordinate(Double x, Double y, Double z) {
    List<Double> coordList = new ArrayList<Double>();
    coordList.add(x);
    coordList.add(y);
    coordList.add(z);
    return coordList;
  }
  /**
   * Test calculator on a basic distance
   */
  @Test
  public void basicTest() {
    DistanceCalculator calculator = new DistanceCalculator();
    List<Double> c1 = this.makeCoordinate(10.0, 10.0, 10.0);
    List<Double> c2 = this.makeCoordinate(20.0, 20.0, 20.0);
    double distance = calculator.getDistance(c1, c2);
    assertTrue(Math.abs(distance - 300.0) < 0.0001);
  }
  /**
   * Test calculator when distance is zero
   */
  @Test
  public void zeroDistTest() {
    DistanceCalculator calculator = new DistanceCalculator();
    List<Double> c1 = this.makeCoordinate(10.0, 10.0, 10.0);
    List<Double> c2 = this.makeCoordinate(10.0, 10.0, 10.0);
    double distance = calculator.getDistance(c1, c2);
    assertTrue(Math.abs(distance - 0) < 0.0001);
  }

  /**
   * Test calculator when coordinates are zero
   */
  @Test
  public void zeroTest() {
    DistanceCalculator calculator = new DistanceCalculator();
    List<Double> c1 = this.makeCoordinate(0.0, 0.0, 0.0);
    List<Double> c2 = this.makeCoordinate(0.0, 0.0, 0.0);
    double distance = calculator.getDistance(c1, c2);
    assertTrue(Math.abs(distance - 0) < 0.0001);
  }
}
