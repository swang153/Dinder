package edu.brown.cs.swang153.api;

import com.google.gson.Gson;

import spark.ResponseTransformer;

public class JsonUtil {
  protected JsonUtil() {
    // prevents calls from subclass
    throw new UnsupportedOperationException();
  }
  public static String toJson(Object object) {
    return new Gson().toJson(object);
  }

  public static ResponseTransformer json() {
    return JsonUtil::toJson;
  }
}
