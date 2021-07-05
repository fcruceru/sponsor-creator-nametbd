# sponsor-creator-nametbd
TODO: simple introduction on the goals and ways of the project

## Design Basics
Since we're aiming to get out a prototype as soon as possible, the project has been set up in such a way as to expedite this. 

The plan is to use a MySQL (or similar) instance later on, but for now we'll make do with a simple sqlite implementation. We can transition the codebase quite easily to a cloud-based or otherwise self-hosted database service. Both the backend API and frontend website are using `node.js` for the development environment, with `npm` facilitating easy access to a myriad of libraries.

`Vue.js` in combination with `Bootstrap` are used to design and implement the actual frontend content, while `express.js` serves the necessary content to the users via REST requests, acting as the monolithic server. For authentication, [JWT](https://jwt.io/introduction) tokens are used to properly authenticate users and prevent malicious requests from accessing secure information.

## Requirements
* [node.js](https://nodejs.org/en/) LTS recommended, not tested with latest current version (i.e. >14.17)
* [Visual Studio Code](https://code.visualstudio.com/) (so far)

## Setup
The solution has been divided into 2 npm projects with their own respective folders: `backend` and `frontend`. You'll need to `cd` into both of these and run `npm install` to download and initialize the needed dependencies for each of the projects. After that, for running the `frontend`, you need to do `npm run serve` to start a local server hosting the website at `localhost:8080`.
The backend is ran by clicking on the `Run and debug` button in the top left corner in VSCode.

![Run backend](https://i.imgur.com/m5Cibwd.png)

>This will start the server hosting the API as well as attach the debugger to the correct process.

TODO: Environment variables