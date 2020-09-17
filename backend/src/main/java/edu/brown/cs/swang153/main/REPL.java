package edu.brown.cs.swang153.main;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

import edu.brown.cs.swang153.commands.CommandControl;

/**
 * This class creates a REPL to listen for user input and respond accordingly.
 * This class is also responsible for notifying the user in the command line if
 * their input is not accepted by the program.
 */
public class REPL {

  private CommandControl control;

  /**
   * Repl Constructor.
   * 
   * @param c CommandControl passed in
   */
  public REPL(CommandControl c) {
    this.control = c;
  }

  /**
   * Creates BufferedReader to handle user input and call the correct callback
   * functions. Also displays the program's output
   */
  public void handleInput() {
    try (BufferedReader br = new BufferedReader(
        new InputStreamReader(System.in))) {
      String input;
      while ((input = br.readLine()) != null) {
        String[] split = input.trim()
            .split(" (?=(([^'\"]*['\"]){2})*[^'\"]*$)");
        String[] args = Arrays.copyOfRange(split, 1, split.length);
        this.control.callCommands(split, args);
      }
    } catch (Exception e) {
      System.out.println("REPL ERROR: " + e);
      e.printStackTrace();
    }
  }
}
