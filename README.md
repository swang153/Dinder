# cs0320 Term Project 2020

**Team Members:** Jinwoo Choi, Brandon Lee, Miranda Mo, Sarah Wang

## How to build and run the program

**Note:** Ensure that there is both `users.sqlite3` and `production.sqlite3` in the data directory in the backend directory. `users.sqlite3` is a database used for unit and system testing and is not connected when directly interacting with our REPL and GUI. Otherwise, creating new users may cause existing tests to fail. This is why `production.sqlite3` is used instead.

**To run the backend REPL only from the terminal, follow these steps:**
1. Ensure that a .sqlite3 file that contains all of Dinder users exist in backend/data. Creating a new user profile also append directly to this file.
2. Go into the the backend directory: `cd backend` and build program: `mvn package`
3. Run program: `./run`
4. Begin by setting the program to the desired database. For the default option, run `dinder data/production.sqlite3`
5. Then, run `match <user@email.com>` to get the top three matches of the input profile. These three people will be reflected in the Main Page of the GUI when we run the frontend.
6. You can also run `vegetarian <user@email.com>` to get the top three matches of the input profile assuming the given user is vegetarian. If not, an error message will be printed instead.

**To run the entire program (frontend + backend) from the terminal, follow these steps (We tested our GUI in Google Chrome):**
1. Check if you have Node.js: `node -v`. If you don't, download it from https://nodejs.org/en/download/.
2. Confirm you have the latest npm: `npm -v`. If the version is less than 6.12.1, run `npm install npm@latest -g`.
- If you get an error `Missing write access to /usr/local/lib/node_modules`, run `sudo chown -R $USER /usr/local/lib/node_modules` to fix it. 
3. Ensure there is a node_modules folder in the frontend directory. If not, `cd frontend/dinder` and run `npm install`. There should also be a bootstrap and @popperjs folder inside the node_modules folder. If not, run `npm install bootstrap` and `npm install popper.js --save`
3. Go into the backend directory: `cd backend` and build program: `mvn package`
4. Run `./run api` in the backend directory
- If you get errors such as a `ClassNotFoundException`, try re-cloning the repository.
5. Open a new terminal and go into the dinder project in the frontend directory: `cd frontend/dinder`
4. Run `npm start` in the dinder directory
5. You should be taken to http://localhost:3000/, which displays a login screen. If you don't have an account, make one by clicking "Create an Account".
6. Once you have logged in, you will be at http://localhost:3000/pals. This will display your top three pals today. To edit your profile information, you can navigate to the settings page by using the Sidebar. 

## How to run tests

1. Navigate to the backend directory
2. Build program and run JUnit tests: `mvn package`
3. Run our system tests: `./cs32-test tests/student/*`

## Known Bugs

No known bugs. 

## Design Details

### Front-end:
We separated our code into different packages according to their functionality and page-specific components. For the default files, we left them in the main directory. App.jsx uses Switch case statements to decide which children Route page to render. It has two components: the Sidebar.jsx and User.jsx React Context API. The Sidebar allows the user to switch between MainPage, or Pal Page, and Settings. The User Context allows data to be passed without props at each level. The assets folder contains all fonts and static images throughout the project. 

Moreover, we have four main pages. The Login package contains Login.jsx, which contains the WelcomePane.jsx as a component and catches error messages if the input email and passwords are invalid. 

The Survey package contains Survey.jsx that integrates the four components - three profile creation pages and the ProgressBar.jsx. It handles error checking on the profile creation pages and redirects to the Pals Page once the user completes the information input. 

The MainPage package contains MainPage.jsx, which renders the Pal.jsx component that receives the data passed from the User.jsx Context. When the user presses the match paw button under each card, it launches a modal, whose logic is also handled by the Pal component. 

Lastly, the Setting package contains Setting.jsx, which displays the user's information. By clicking the buttons on this page, the user is redirected to the survey profile creation pages to edit their information. 

### Back-end: 
The backend code is divided into four packages. 

The api package contains classes to implement the REST API that connects the frontend to the backend using HTTP requests to GET and PUT relevant data.

In the main package, we have a Main class which kickstarts the program as well as a generic REPL class which processes inputs from the command line. 

The commands package includes a CommandControl class which maps string commands to their respective callback function and sets up or calls the functions. DinderCommands holds the implementations for all functions (setting up the SQL file, creating the KDTree, finding matches) of the program.

The objects package includes a Student class which keeps track of all the data of a student (i.e. concentration, class year, survey respones). We have a Node interface and Student implements Node. The matching alogrithm in KDTree can be used on any Node. This is to mantain genericness, so that different types of users with different sets of data can also run Dinder's matching algorithm in the future. In the package, there is also a Query and QAHash class which queries and updates the database for needed information and hashes it for future retrieval. The package also contains comparators and a distance calculator for KDTree functionality.

## Runtime/Space Optimization

For the back-end, we decided to use a KDTree to find the best matches for students. Much in the same way the nearest neighbors method in Stars worked, the matchNames method in Dinder finds students who are "closest in distance" to other users. To create the numeric coordinates for this, the survey responses have corresponding numeric weights. For example, Thayer restaurants have a weight of 1 for Asian cuisine, a weight of 2 for Mexican, etc.

Each time the "match" command (CmdMatch) is called, we create a KDTree and query the database to create Student nodes for all profiles in the database. Each attribute of a student is hashed into a map for future retrieval and display in the frontend. The reason we built a new KDTree each time match is called is because between match calls, profiles may be updated, added, or deleted and the data structure must reflect these changes before finding matches.

Since string survey responses need to be converted into numeric weights, we made a dynamic SQL query that retrieves the respective weight given a table name and an attribute variable. This is to avoid having to write multiple SQL queries to find a weight for each attribute separately.


## Testing

We tested the back-end extensively with JUnit and system tests. We created a NaiveStudent class so that we can easily test the NodeComparator and DistanceComparator without having to upload the 18-dimension coordinate list that goes into an actual Student.

* KDTreeTest: tests that tree is made properly, tests getMatches method
* DistanceCalculatorTest: tests that distance is caculated correctly
* DistanceComparatorTest: tests that distance is properly compared between two Nodes
* NodeComparatorTest: tests that Nodes are compared correctly on a given dimension
* QAConverterTest: tests that the weights are being correctly queried for a string attribute variable
* QueryTest: tests that SQL queries are retrieving the desired information
* CommandControlTest: tests that hash map of string-to-commands is properly created
* DinderCommandsTest: tests that student node matches are returned for use in frontend

The system tests test that the correct matches are returned (matches have the most similar responses to the survey) for a given student id. They also test if it works for students who only want vegetarian matches. 

They also test that the program errors gracefully for:
* invalid file names
* an id that doesn't exist in the database
* empty file names and student ids
* calling for matches before "dinder" to set up the database
* calling vegetarian matches on a student who is not vegetarian 
