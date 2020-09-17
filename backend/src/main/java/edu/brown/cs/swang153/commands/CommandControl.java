package edu.brown.cs.swang153.commands;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Class handles creating commands and calling appropriate commands for REPL.
 */
public class CommandControl {


  private Map<String, Command> commands;
  private DinderCommands dinder;
  private List<String> results;
  private String resultsString;

  /**
   * Creates Commands for class.
   */
  public CommandControl() {
    this.results = new ArrayList<String>();
    this.dinder = new DinderCommands();
    this.commands = this.getCommandMap();
  }

  /**
   * Creates Map of String patterns to Commands.
   *
   * @return Map of Strings to Commands
   */
  public  Map<String, Command> getCommandMap() {
    Map<String, Command> hashMap = new HashMap<String, Command>();
    hashMap.put("dinder", this.dinder.new CmdData());
    hashMap.put("vegetarian", this.dinder.new CmdVegetarian());
    hashMap.put("match", this.dinder.new CmdMatch());
    return hashMap;
  }

  /**
   * Calls the appropriate Command for the REPL input.
   *
   * @param pattern user input
   * @param args    command arguments
   */
  public void callCommands(String[] pattern, String[] args) {
    this.clearResults();
    this.clearResultsString();
    if (this.commands.containsKey(pattern[0])) {
      if (args.length < 1) {
        System.err.println("ERROR: Must provide arguments for commands");
        return;
      }
      this.commands.get(pattern[0]).callback(args);
    } else {
      System.err.println("ERROR: " + pattern[0]
          + " is not a valid command (make sure to use correct capitalization)");
      this.results.add("ERROR: " + pattern[0]
          + " is not a valid command (make sure to use correct capitalization)");
    }
  }

  /**
   * Clears the list of results presented in GUI.
   */
  public void clearResults() {
    this.results.clear();
  }

  /**
   * Clears the list of results presented in GUI.
   */
  public void clearResultsString() {
    this.resultsString = "";
  }
}
