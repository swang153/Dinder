# README

## Stars

1) Known bugs
	No known bugs
	
2) Design details specific to your code
	I have a Coordinate class to create instances of Coordinates for Stars.
	I have a StarsCommandControl class (stars specific) that handles mapping strings to callback functions and sets up/calls the functions.
	My REPL handles getting input and identifying command arguments then passes them into the StarsCommandControl.
	I have a Node interface and Stars implements Node. This is to make the KD-Tree generic.
	I have a NaiveMethods class that implements naive search methods to allow me to test the KD Tree.
	
3) Any runtime/space optimizations you made beyond the minimum requirements
	Use of MinMaxPriority Queue to avoid needing to sort kd-tree list while iterating in search algorithms or giving output.
	
5) How to run any tests you wrote/tried by hand
	My JUNIT and System tests are in src/test.
	
4) How to build/run your program
	To run my package I run mvn package then ./run or ./run --gui in the command line. This brings up the repl/gui. 
	All commands must be lower case and all star names must be quoted.
	
5)Explanations for any Checkstyle errors your code has (hopefully none)
	I don't think I have and checkstyle errors.

DESIGN QUESTIONS:
1) Suppose that in addition to "neighbors" and "radius" you wanted to support 10+ more commands. How would you change your code - particularly your repl parsing - to do this? Don't worry about algorithmic details with the k-d tree, we're interested in the design.
	Due to my design I think it would be relatively simple. I would just need to add a new class for the command that implemented the command interface and then I would add that command to my StarCommandControl class.

2) What are some problems you would run into if you wanted to use your k-d tree to find points that are close to each other on the earth's surface? You do not need to explain how to solve these problems.
	One possibility is that there would be too many points and the tree would take a long time to construct. Additionally, my tree has not been tested for more or less than 3 dimensions so im not sure it would work for 2d points. Another potential problem could be that if there were enough infinitely close points then there would be infinitely many nearest neighbors or points within a radius.
	
3) Your k-d tree supports most of the methods required by the Collection interface. What would you have to add/change to make code like Collection<Star> db = new KDTree<Star>() compile and work properly?
	My KDTree class would need to be able to take in a Collection<anything that extends Node> and create a KD-Tree from it. It would also need to implement all of the methods in the Collection interface 



