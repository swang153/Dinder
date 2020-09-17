package edu.brown.cs.swang153.commands;

/**
 * Interface allows Commands to have callback functions to programs.
 */
public interface Command {
  /**
   * Calls a Command's callback function.
   * @param args Arguments to be passed into Command
   */
  void callback(String[] args);
}
