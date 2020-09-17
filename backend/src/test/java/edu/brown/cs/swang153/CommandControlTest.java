package edu.brown.cs.swang153;

import edu.brown.cs.swang153.commands.Command;
import edu.brown.cs.swang153.commands.CommandControl;
import org.junit.Test;
import java.util.Map;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class CommandControlTest {
  @Test
  public void hashMapTest() {
    CommandControl commandControl = new CommandControl();
    Map<String, Command> map = commandControl.getCommandMap();
    assertEquals(map.size(), 3);
    Set<String> keys = map.keySet();
    assertTrue(keys.contains("dinder"));
    assertTrue(keys.contains("match"));
    assertTrue(keys.contains("vegetarian"));
  }
}
