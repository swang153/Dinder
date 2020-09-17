package edu.brown.cs.swang153.main;

import edu.brown.cs.swang153.api.RestApi;
import edu.brown.cs.swang153.commands.CommandControl;
import edu.brown.cs.swang153.commands.DinderCommands;

/**
 * The Main class of our project. This is where execution begins.
 *
 */
public final class Main {

  private static final int DEFAULT_PORT = 4567;
  private static CommandControl control;

  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) {
    new Main(args).run();
  }

  private String[] args;

  private Main(String[] args) {
    control = new CommandControl();
    this.args = args;
  }

  private void run() {
    if (this.args.length > 0 && this.args[0].equals("api")) {
      DinderCommands dinderCmds = new DinderCommands();
      dinderCmds.new CmdData().callback(new String[] {
          "data/production.sqlite3"
      });
      new RestApi(dinderCmds);
    }
    REPL repl = new REPL(control);
    repl.handleInput();
  }
}
