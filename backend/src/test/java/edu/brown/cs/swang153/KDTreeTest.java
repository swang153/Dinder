package edu.brown.cs.swang153;

import edu.brown.cs.swang153.commands.DinderCommands;
import edu.brown.cs.swang153.commands.DinderCommands.CmdData;
import edu.brown.cs.swang153.objects.KDTree;
import edu.brown.cs.swang153.objects.Node;
import edu.brown.cs.swang153.objects.Query;
import edu.brown.cs.swang153.objects.Student;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class KDTreeTest {
  private Query db;
  private List<Node> nodes;
  private void setUp() {
    DinderCommands dinderCmds = new DinderCommands();
    dinderCmds.new CmdData().callback(new String[] {
        "data/users.sqlite3"
    });
    this.db = DinderCommands.getQuery();
    try {
      this.nodes = db.getStudents(false);
    } catch (SQLException e) {
      System.err.println("ERROR: Could not set up connection");
    }
  }
  private void tearDown() {
    this.db = null;
  }

  /**
   * Tests that tree size is correct.
   */
  @Test
  public void sizeTest() {
    this.setUp();
    KDTree tree = new KDTree();
    tree.makeTree(this.nodes, 0, 7);
    assertEquals(tree.getTree().size(), 17);
    this.tearDown();
  }

  /**
   * Tests get root.
   */
  @Test
  public void rootTest() {
    this.setUp();
    KDTree tree = new KDTree();
    tree.makeTree(this.nodes, 0, 7);
    String rootID = tree.getRoot().getID();
    assertEquals(rootID, "fletcher_malone@brown.edu");
  }

  /**
   * Tests matching algorithm and getStudents method.
   */
  @Test
  public void matchTest() {
    this.setUp();
    String id = "astra_terry@brown.edu";
    Student target = null;
    for (Node s: this.nodes) {
      if (s.getID().equals(id)) {
       target = (Student) s;
      }
    }
    KDTree tree = new KDTree();
    tree.makeTree(this.nodes, 0, 7);
    tree.matchNames(tree.getRoot(), target, 3);
    List<Student> matches = tree.getStudents();
    assertEquals(matches.get(0).getID(), "cora_scott@brown.edu");
    assertEquals(matches.get(1).getID(), "jasper_cooper@brown.edu");
    assertEquals(matches.get(2).getID(), "mariam_erickson@brown.edu");
    this.tearDown();
  }

}
