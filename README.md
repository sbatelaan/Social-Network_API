## 18 NoSQL: Social Network API

# User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data



# Acceptance Criteria

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

# Screenshots



![Screenshot (54)](https://github.com/sbatelaan/Social-Network_API/assets/119352363/6bfb925a-c420-4322-982f-e9d969c2253c)
![Screenshot (53)](https://github.com/sbatelaan/Social-Network_API/assets/119352363/48193a9d-1cce-4dc0-861d-249ec4f0374c)
![Screenshot (52)](https://github.com/sbatelaan/Social-Network_API/assets/119352363/9f9c75af-88e0-46c8-8b23-48e70f4c4950)
![Screenshot (55)](https://github.com/sbatelaan/Social-Network_API/assets/119352363/2bc1da6a-e46d-4fa2-ae27-20889e99f1c7)


# Installation
---
To install this project: 
1. Start by forking this repository on Github. 
2. Clone this project to your machine by using the "git clone + URL" command. 
3. Open the project with your favorite text editor, like VS Code (in your terminal, first type "cd foldername" then "code ."). 
4. Install Node.js from their website, if you have not already. Here are some additional [instructions](https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs).
5. Install MongoDB from their website, if you have not already. Here are some additional [instructions](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb).
6. Install [Nodemon](https://www.npmjs.com/package/nodemon).
7. Install [Insomnia](https://insomnia.rest/download). 
8. This project includes a package.json file that specifies dependencies for this project, so be sure to run "npm install". This will install the packages specified in the next section.


After following the instructions in installation: 
1. Open the "index.js" file in your integrated terminal.
2. Run command "npm run seed" to seed users into your database.
3. Run command "npm run start" 
4. Open insomnia and type in "localhost:3001/api/_" in the address bar. Check out the following routes: 
User + Friends 
- `/api/users` to get all users or create user
- `/api/users/:userId` to get one user, update and delete user
- `/api/users/:userId/friends/:friendId` to add or delete a friend 
Thought + Reactions 
- `/api/thoughts` to get all thoughts or create thought
- `/api/thoughts/:thoughtId` to get one thought, update or delete. 
- `/api/thoughts/:thoughtId/reactions` to create reaction 
- `/api/thoughts/:thoughtId/reactions/:reactionId` to delete reaction 
5. When finished, run CTRL-C in terminal to end stop nodemon, and trash the session. 
