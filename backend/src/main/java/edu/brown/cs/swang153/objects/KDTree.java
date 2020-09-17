package edu.brown.cs.swang153.objects;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.google.common.collect.MinMaxPriorityQueue;


/**
 * Class contains functions to create and search through kd tree.
 *
 */
public class KDTree {
  private List<Node> tree;
  private NodeComparator<Node> comparator;
  private DistanceCalculator distCalculator;
  private DistanceComparator distComparator;
  private Node root;
  private MinMaxPriorityQueue<Node> pq;

  /**
   * Constructor. instantiates comparator, tree list, distance calculator,
   * distance comparator, priority queue, and root variable.
   */
  public KDTree() {
    this.comparator = new NodeComparator<Node>();
    this.tree = new ArrayList<Node>();
    this.distCalculator = new DistanceCalculator();
    this.distComparator = new DistanceComparator();
    this.pq = MinMaxPriorityQueue.orderedBy(this.distComparator).create();
    this.root = null;
  }

  /**
   * Gets the index of the median in a list of Nodes.
   *
   * @param nodes List of Nodes
   * @return index of median Node
   */
  private int getMedian(List<Node> nodes) {
    int median = Math.round(nodes.size() / 2);
    return median;
  }

  /**
   * Gets the root of KD-Tree.
   *
   * @return Root Node of KD-Tree
   */
  public Node getRoot() {
    return this.root;
  }

  /**
   * Clears the KD-Tree.
   */
  public void clearTree() {
    this.tree.clear();
  }

  /**
   * Recursive function to make a KD-Tree.
   *
   * @param nodes         List of Nodes
   * @param currDimension Current dimension of Node in tree
   * @param numDimensions Total number of dimensions in tree
   * @return The medianNode of current list (null if empty)
   */
  public Node makeTree(List<Node> nodes, int currDimension, int numDimensions) {
    if (numDimensions < 0) {
      System.err.println("ERROR: Number of tree dimensions must be > 0");
      return null;
    }

    if (nodes != null && nodes.size() == 0) {
      return null;
    }

    this.comparator.setDimension(currDimension % numDimensions);
    Collections.sort(nodes, this.comparator);
    Node medianNode = nodes.get(this.getMedian(nodes));
    medianNode.setDepth(currDimension);
    if (medianNode.getDepth() == 0) {
      this.root = medianNode;
    }

    List<Node> leftTree = nodes.subList(0, this.getMedian(nodes));
    List<Node> rightTree = nodes.subList(this.getMedian(nodes) + 1,
        nodes.size());

    medianNode
        .setLeft(this.makeTree(leftTree, currDimension + 1, numDimensions));
    medianNode
        .setRight(this.makeTree(rightTree, currDimension + 1, numDimensions));

    this.tree.add(medianNode);
    return medianNode;
  }

  /**
   * Gets the KD-Tree.
   *
   * @return List of Nodes representing KD-Tree
   */
  public List<Node> getTree() {
    return this.tree;
  }

  /**
   * Adds the k nearest neighbors of Node to priority queue given target Node.
   *
   * @param node   Current Node
   * @param target Target Node
   * @param k      Number of neighbors
   */
  public void matchNames(Node node, Node target, int k) {
    List<Double> nodeCoords = node.getCoordinates();
    List<Double> targetCoords = target.getCoordinates();

    double nodeDistance = this.distCalculator.getDistance(targetCoords, nodeCoords);
    node.setDistance(nodeDistance);

    if (!node.equals(target)) {
      if (this.pq.size() < k) {
        this.pq.add(node);
      } else if (nodeDistance < this.distCalculator
          .getDistance(targetCoords, this.pq.peek().getCoordinates())) {
        this.pq.remove();
        this.pq.add(node);
      }
    }

    int depth = node.getDepth() % nodeCoords.size();

    double axisDistance = this.distCalculator.axisDistance(targetCoords, nodeCoords, depth);

    if (this.pq.size() < k || this.distCalculator.getDistance(targetCoords,
        this.pq.peek().getCoordinates()) > axisDistance) {
      if (node.getLeft() != null) {
        this.matchNames(node.getLeft(), target, k);
      }
      if (node.getRight() != null) {
        this.matchNames(node.getRight(), target, k);
      }
    } else {
      Double nodeCoord = nodeCoords.get(depth);
      Double targetCoord = targetCoords.get(depth);
      if (nodeCoord < targetCoord && node.getRight() != null) {
        this.matchNames(node.getRight(), target, k);
      } else if (nodeCoord == targetCoord) {
        if (node.getLeft() != null) {
          this.matchNames(node.getLeft(), target, k);
        }
        if (node.getRight() != null) {
          this.matchNames(node.getRight(), target, k);
        }
      } else if (nodeCoord > targetCoord && node.getLeft() != null) {
        this.matchNames(node.getLeft(), target, k);
      }
    }
  }

  /**
   * Prints PriorityQueue representing KD-Tree.
   */
  public void printPQ() {
    List<String> pqList = new ArrayList<String>();
    while (this.pq.size() > 0) {
      Node removed = this.pq.removeLast();
      System.out.println(removed.getName());
    }
  }

  /**
   * Returns list of student nodes from priority queue (matches).
   * @return matched student nodes
   */
  public List<Student> getStudents() {
    List<Student> pqList = new ArrayList<Student>();
    while (this.pq.size() > 0) {
      Student removed = (Student) this.pq.removeLast();
      pqList.add(removed);
    }
    return pqList;
  }

}
