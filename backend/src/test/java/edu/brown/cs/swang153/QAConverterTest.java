package edu.brown.cs.swang153;

import edu.brown.cs.swang153.commands.DinderCommands;
import edu.brown.cs.swang153.commands.DinderCommands.CmdData;
import edu.brown.cs.swang153.objects.QAHash;
import edu.brown.cs.swang153.objects.Query;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class QAConverterTest {
  private Query db = null;

  @Before
  public void setUp() {
    DinderCommands dinderCmds = new DinderCommands();
    dinderCmds.new CmdData().callback(new String[] {
        "data/users.sqlite3"
    });
    db = DinderCommands.getQuery();
  }

  @After
  public void tearDown() {
    db = null;
  }
  @Test
  public void testGetWeights() throws SQLException {
    setUp();
    List<String> stringVals = new ArrayList<String>();
    stringVals.add("Ivy");
    stringVals.add("Den Den Fried Chicken");
    stringVals.add("yes");
    stringVals.add("hard boiled");
    stringVals.add("black");
    stringVals.add("Penne alla vodka");
    
    List<Double> weights = new ArrayList<Double>();
    Map<Integer, String> converter = QAHash.getConverter();
    for (int i = 14; i < converter.size(); i++) {
      weights.add(db.getWeight(converter.get(i), stringVals.get(i-14)));
    }
    assertEquals(6, weights.size());
    assertTrue(weights.get(0).equals(1.0));
    assertTrue(weights.get(1).equals(1.0));
    assertTrue(weights.get(2).equals(1.0));
    assertTrue(weights.get(3).equals(1.0));
    assertTrue(weights.get(4).equals(1.0));
    assertTrue(weights.get(5).equals(5.0));
    tearDown();
  }
}