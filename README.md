# ReactNodeProject
A project running a React.js frontend, Node.js backend and MongoDB database, with a fully functioning authentication system.

## Requirements
- npm
- MongoDB
    - https://www.mongodb.com/try/download/community

## Getting started

### Clone repository

```shell
git clone https://github.com/leesean5150/ReactNodeProject.git
```

### Install dependencies

```shell
npm install
```

### Setting Up Configuration
Create a new .env file for the server folder using the .env.sample as a tempalte. For email reset link, navigate to Google Account settings, search for app passwords and create a new app. The password is the password to be put into the .env file.

### Run Client

```shell
cd client
npm start
```

### Run Server

```shell
cd server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view frontend in the browser.


## Acknowledgements

 - [Mastering Authentication By Code With Yousaf](https://www.youtube.com/watch?v=a0OteSViYpg&t=5s)

## Developments
- Refactored UX logic
- Added configuration good practices
- Randomised token for authentication (WIP)
