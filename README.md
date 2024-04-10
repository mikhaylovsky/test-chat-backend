<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Live chat backend app based on Node.js, typescript and socket.io library.

## Technologies used
- Nest.js v10 (Node.js based framework for backend)
- socket.io (Websockets library for chat integration)
- Postgres (Relational database for data storage)
- railway.app (Cloud app for deployment and hosting)

## Installation

**NOTE**: You must have node environment not lower than 18 version or higher.

First, clone this repository to your local machine. Then, follow these steps:
1. Enter the cloned repository, and run the installation command:

```bash
$ yarn install
```
***you can obviously use **npm** if this is your favourite package manager*

2. Set up the environment variables. There is a **.env.example** file with all needed variables, you can just simply copy/paste it and rename it to **.env**. Then, you can update some variables, such as **DATABASE_PORT**, **DATABASE_USER**, etc to that you prefer. Please note, that there are no migrations set up within the project, but there is a **TypeORM** package installed, which provides a syncronization functiolaity and can update the database on the fly. To that purpose, there is a **DATABASE_SYNCHRONIZE** variable, which is set to **enable** by default. I recommend to perform a first start of the app with no changes, to allow the project automatically create needed database tables. Then, you can set this variable to **false** to prevent any changes at the database.

3. Set up the docker container for the database:
```bash
$ docker-compose up -d --build
```

4. When the container is up and runnning, there is a time to run the app:
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

5. In case everything goes well, there should a plenty of messages inside your console, and the last one should look like **LOG [NestApplication] Nest application successfully started** - that means that backend is ready to work.
