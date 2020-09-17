package edu.brown.cs.swang153;

import edu.brown.cs.swang153.commands.CommandControl;
import edu.brown.cs.swang153.commands.DinderCommands;
import edu.brown.cs.swang153.objects.Student;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Tests the non-command line methods (ones that return list of student nodes)
 */
public class DinderCommandsTest {
  private CommandControl control;
  public void setUp() {
    control = new CommandControl();
    String input = "dinder data/users.sqlite3";
    String[] split = input.trim().split(" (?=(([^'\"]*['\"]){2})*[^'\"]*$)");
    String[] args = Arrays.copyOfRange(split, 1, split.length);
    this.control.callCommands(split, args);
  }
  @Test
  public void getVegetarianStudentsTest() {
    setUp();
    List<Student> matches = DinderCommands.frontendMatches("thane_parks@brown.edu", true);
    assertEquals(matches.size(), 3);
    assertTrue(matches.get(0).getName().equals("Rashad"));
    assertTrue(matches.get(1).getName().equals("Vernon"));
    assertTrue(matches.get(2).getName().equals("Dahlia"));
  }
  @Test
  public void getStudentsTest() {
    setUp();
    List<Student> matches = DinderCommands.frontendMatches("astra_terry@brown.edu", false);
    assertEquals(matches.size(), 3);
    assertTrue(matches.get(0).getName().equals("Cora"));
    assertTrue(matches.get(1).getName().equals("Jasper"));
    assertTrue(matches.get(2).getName().equals("Mariam"));
  }
}
