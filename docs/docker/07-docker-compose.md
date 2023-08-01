---
title: 7. Docker Compose
---

## Docker Compose: from terminal to config file

Workflow with Docker

- Development
- Continuous Integration / Delivery
- Deployment

It's important to see how docker actually integrate in all those steps.

This is a simple workflow of docker in real development processing

Basically we have the url look like this

let's see how that all work

## download docker images

```bash
docker pull mongo
docker pull mongo-express
```

## create docker network

```bash
$ docker network create mongo-network
7fryfreby2347637829312jncfvbye66237e2e32
```

## start mongodb

```bash
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb \
--net mongo-network \
mongo
```

## start mongo-express

```bash
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
--name mongo-express \
--net mongo-network \
mongo-express
```

When there are a bunch of docker run, you may don't want to execute these run commands on the terminal all the time, especially  if you have a bunch of docker containers, you may just want to run automatically or pull  with configuration much easier.

So basically, docker compose is just a structure way to contain very normal common docker commands and of course it's going to be easier to for you to edit the file if you want to change port and add  some new options to the run command.

You may notice that there is no network config in the docker compose.

Docker compose takes care of creating a common Network

```bash
docker-compose -f mongo.yaml up
```
