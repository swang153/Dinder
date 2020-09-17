package edu.brown.cs.swang153.api;

import static edu.brown.cs.swang153.api.JsonUtil.json;
import static edu.brown.cs.swang153.api.JsonUtil.toJson;
import static spark.Spark.after;
import static spark.Spark.before;
import static spark.Spark.exception;
import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import edu.brown.cs.swang153.commands.DinderCommands;
import edu.brown.cs.swang153.objects.QAHash;
import edu.brown.cs.swang153.objects.Query;
import edu.brown.cs.swang153.objects.Student;

public class RestApi {
  public RestApi(final DinderCommands dinderCmds) {

    /**
     * Pals gets email and returns three pals objects email: name@brown.edu
     * http://localhost:4567/pals/name@brown.edu
     */
    get("/pals/:id", (req, res) -> {
      String id = req.params(":id");

      boolean isVegetarian = DinderCommands.getQuery().vegetarian(id);
      List<Student> pals;
      if (isVegetarian) {
        pals = dinderCmds.new CmdVegetarian().getVegetarianMatches(id);
      } else {
        pals = dinderCmds.new CmdMatch().getMatches(id);
      }

      if (pals == null || pals.isEmpty()) {
        res.status(400);
        return new ResponseError("ERROR: No user with id '%s' found", id);
      }
      res.status(200);
      return pals;
    }, json());

    /**
     * Login checks email password and returns student object email:
     * name@brown.edu password: 123123
     * http://localhost:4567/login?email=name@brown.edu&password=123123
     */
    post("/login", (req, res) -> {
      Query db = DinderCommands.getQuery();
      Student s = db.checkLogin(req.queryParams("email"),
          req.queryParams("password"));
      if (s == null) {
        res.status(400);
        return new ResponseError(
            "ERROR: Email and password combination is incorrect");
      }
      res.status(200);
      return s;
    }, json());

    /**
     * New survey creates student profile from survey answers inserts into
     * database and returns student object
     */
    post("/survey", (req, res) -> {
      // get parameters
      Map<Integer, String> map = QAHash.getConverter();
      List<String> coord = new ArrayList<String>();
      for (int i = 0; i < map.size(); i++) {
        coord.add(req.queryParams(map.get(i)));
      }
      // add to the database
      Query db = DinderCommands.getQuery();
      boolean exists = db.addProfile(coord);
      if (exists) {
        res.status(400);
        return new ResponseError("ERROR: profile to add already exists");
      }
      res.status(200);
      // create and return student
      Student newStudent = new Student(coord);
      return newStudent;
    }, json());

    /**
     * Update survey updates database with new survey answers returns updated
     * student objects
     */
    put("/survey", (req, res) -> {

      // get parameters
      Map<Integer, String> map = QAHash.getConverter();
      List<String> coord = new ArrayList<String>();
      for (int i = 0; i < map.size(); i++) {
        coord.add(req.queryParams(map.get(i)));
      }

      // update the database
      Query db = DinderCommands.getQuery();
      boolean exists = db.updateProfile(coord);
      if (!exists) {
        res.status(400);
        return new ResponseError("ERROR: profile to update does not exist");
      }

      res.status(200);
      // create and return student
      Student newStudent = new Student(coord);
      return newStudent;
    }, json());

    // Enable CORS
    options("/*", (request, response) -> {

      String accessControlRequestHeaders = request
          .headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers",
            accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request
          .headers("Access-Control-Request-Method");
      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods",
            accessControlRequestMethod);
      }

      return "OK";
    });

    before((request, response) -> response.header("Access-Control-Allow-Origin",
        "*"));

    after((req, res) -> {
      res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
      res.header("Access-Control-Allow-Headers",
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
      res.type("application/json");
    });

    exception(IllegalArgumentException.class, (e, req, res) -> {
      res.status(400);
      res.body(toJson(new ResponseError(e)));
    });
  }
}
