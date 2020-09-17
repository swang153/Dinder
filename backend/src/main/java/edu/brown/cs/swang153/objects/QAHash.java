package edu.brown.cs.swang153.objects;

import java.util.Map;

public class QAHash {
  // instance variables
  private static Map<Integer, String> QAConverter;

  protected QAHash() {
    throw new UnsupportedOperationException();
  }

  /**
   * stores map into the static variable.
   * @param map to save
   */
  public static void setMap(Map<Integer, String> map) {
    QAHash.QAConverter = map;
  }

  /**
   * @return hash map from column integer to name
   */
  public static Map<Integer, String> getConverter() {
    return QAHash.QAConverter;
  }
}
