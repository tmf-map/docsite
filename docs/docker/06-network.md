---
title: 6. Network
---

port number

Docker by default has already provided network, we can use:

```bash
docker network ls
```

create your own network

```bash
$ docker network create mongo-network
7fryfreby2347637829312jncfvbye66237e2e32
```

Now if we want to make the mongo run on the network we just created, we need to run:

```bash
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb \
--net mongo-network \
mongo
```

and with those options, it should run the container

```bash
docker logs mongodb -f # stream the log
```

to the what happened inside.

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

And now let's check `localhost:8081` on your host, you will see the mongo express ui page:

We have to connect the nodejs to the database, the way

this is just for demostration

that's how it works and let's hand over to the url

## Developing with Containers
