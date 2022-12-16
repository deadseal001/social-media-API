# social-media-API

## Table of Content 

* [Description](#description)
* [Technlogies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors)
* [Demos](#Demos)

<a name="description"></a>
## Description
This is a back-end application for a Social-Media website The API can be used to add user, get user info, update user info, delete user and add/remove friends to/from a user. It can also add thought of a user, get thoughts, update/delete thoughts and add/remove a thought reaction.

<a name="technologies"></a>
## Technologies used 
- JavaScript
- node.js
- Express.js
- MongoDB
- Mongoose
- Mongoose validator
- Moment.js


## Installation 
1. Git clone this repository onto your local machine to your desired folder and in the terminal use `cd social-media-API` to get into the folder. 

2. Run `npm install` to install all needed npm packages.

3. Run: `npm run start` to start the server.

<a name="usage"></a>
## Usage 


- GET/ POST routes: `http://localhost:3001/api/users` to get all users or add a new uesr.<br>
- GET/PUT/DELETE routes: `http://localhost:3001/api/users/:userId` to get single user info, change user info or delete a user.<br>
- POST/ DELETE routes: `http://localhost:3001/api/users/:userId/friends/:friendId` to add a friend to a user or delete a friend.<br>

- GET routes: `http://localhost:3001/api/thoughts` to get info of all the posts.<br>
- POST routes: `http://localhost:3001/api/thoughts/:userId` to add a thought to a user.<br>
- GET/PUT/DELETE routes: `http://localhost:3001/api/thoughts/:userId/:thoughtId` to get info of a post, to update the info of a thought or delete a thought. <br>
- POST routes: `http://localhost:3001/api/thoughts/:thoughtId/reactions` to add a reaction to a thought.<br>
- PUT/DELETE routes: `http://localhost:3001/api/thoughts/:thoughtId/reactions/reactionsId` to update or remove a reaction <br>


<a name="contributors"></a>
## Contributors

Wenbo Li, GitHub: https://github.com/deadseal001

<a name="Demos"></a>
## Demos

Screenshot:

Demo video: https://watch.screencastify.com/v/VQ4DuD0V2fdCDiAP9f0t