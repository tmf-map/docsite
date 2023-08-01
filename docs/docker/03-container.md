---
title: 3. Container
---

## Container: start server

Now to this point, if you want to run the image

```bash
docker run redis:4.0 # it combines docker pull and docker start, that means if there is no image on the local, it will pull from remote automatically
docker ps # list the running container
# there will be a continuous output log, and you need to press ctrl c to stop the container
```

```bash
$ docker run -d redis # detach mode, that will give the id of the container, so you will be able to use terminal again
83486dgyrev7372436879283093ufhr7g56274938bakjxnow32
# there will be no terminal output log, and you can use docker stop id to stop the container
```

docker run = starts new container with a command

If you want to restart the container, you would need the docker container id

```bash
docker stop 83486dgyrev73
docker start 83486dgyrev73 # start is used to start the stopped container
```

If you want to see the docker running history that might help you continue yesterday's work, you can use below command:

```bash
docker ps -a # list running and stopped container
```

## host port vs container port

You can bind same port on the container as long as you bind them to two different ports from your host machine.

- **Multiple containers** can run on your host machine(so you can use same port for different containers)
- Your laptop has only certain ports available
- **Conflict when same port** on host machine

```bash
docker run -p<host_port>:<container_port> <image_name_version> <-d>
```

For example, redis uses 6379 as default port, so you can bind your local host port 6000 to the redis container port 6379, here you can run:

```bash
docker run -p6000:6379 redis -d
```

### Debugging Containers

- docker logs
- docker exec -it

If something wrong with the container, you may want to see the logs or just want to get inside to the container

Ideally, you would want to see what logs redis container is producing. The way to do that is very easy, you just see:

```bash
docker logs <container_id> # or container_name, you can retrieve the id from the docker ps
```

specify the version

you can use the name with another docker option

```bash
docker run -d -p6001:6379 --name redis-older redis:4.0
docker run -d -p6000:6379 --name redis-latest redis

```

Another very useful command in debugging is `docker exec`

```bash
docker exec -it <container_id> /bin/bash # or use the container name and -it which stands for the internal terminal
```

With this command, you will get inside to the container's terminal.

You can get inside to print all the envs to see whether they're set correctly.

If you want to get out of the internal terminal, you can just run `exit`

:::note

docker run: start a new container
docker start: restart a stopped container

:::

## References

1. [Docker Tutorial for Beginners (FULL COURSE in 3 Hours)](https://www.youtube.com/watch?v=3c-iBn73dDE)
