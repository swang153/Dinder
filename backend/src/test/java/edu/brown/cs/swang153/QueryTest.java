package edu.brown.cs.swang153;

import edu.brown.cs.swang153.objects.Node;
import edu.brown.cs.swang153.objects.Query;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class QueryTest {
  private Query db = null;
  @Before
  public void setUp() {
    db = new Query("data/users.sqlite3");
  }
  @After
  public void tearDown() {
    db = null;
  }
  @Test
  public void vegetarianTest() throws SQLException {
    setUp();
    boolean veg1 = db.vegetarian("astra_terry@brown.edu");
    boolean veg2 = db.vegetarian("vernon_admas@brown.edu");
    assertFalse(veg1);
    assertTrue(veg2);
    tearDown();
  }
  @Test
  public void getThayerWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("thayer", "Den Den Fried Chicken");
    Double weight2 = db.getWeight("thayer", "Pokeworks");

    assertTrue(weight1.equals(1.0));
    assertTrue(weight2.equals(3.0));
    tearDown();
  }
  @Test
  public void getYearWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("year", "2021");
    Double weight2 = db.getWeight("year", "2022");

    assertTrue(weight1.equals(1.0));
    assertTrue(weight2.equals(2.0));
    tearDown();
  }
  @Test
  public void getCoffeeWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("coffee", "frappuccino");
    Double weight2 = db.getWeight("coffee", "iced");

    assertTrue(weight1.equals(5.0));
    assertTrue(weight2.equals(3.0));
    tearDown();
  }
  @Test
  public void getTakeoutWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("takeout", "Lo mein");
    Double weight2 = db.getWeight("takeout", "Penne alla vodka");

    assertTrue(weight1.equals(1.0));
    assertTrue(weight2.equals(5.0));
    tearDown();
  }
  @Test
  public void getPineappleWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("pineapple", "yes");
    Double weight2 = db.getWeight("pineapple", "no");

    assertTrue(weight1.equals(1.0));
    assertTrue(weight2.equals(0.0));
    tearDown();
  }
  @Test
  public void getDiningHallWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("dininghall", "Ratty");
    Double weight2 = db.getWeight("dininghall", "Ivy");

    assertTrue(weight1.equals(5.0));
    assertTrue(weight2.equals(1.0));
    tearDown();
  }
  @Test
  public void getEggsWeight() throws SQLException {
    setUp();
    Double weight1 = db.getWeight("eggs", "over easy");
    Double weight2 = db.getWeight("eggs", "sunny side up");

    assertTrue(weight1.equals(3.0));
    assertTrue(weight2.equals(5.0));
    tearDown();
  }
}
