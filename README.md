# ReactNodeProject
A project running a React.js frontend, dockerized Node.js backend and dockerized MongoDB database, with a fully functioning authentication system.

## Requirements
- Docker
- MongoDB
    - https://www.mongodb.com/try/download/community
- npm

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
#### First initialisation
```shell
cd server
docker compose up --build
```
#### Subsequent initialisation
```shell
cd server
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) to view frontend in the browser.

## Development TODOs
- Randomised token for authentication