---
title: What is Docker
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/docker-cover.png' alt='docker-cover'/>

## What's the concept of a container?

A container is a way to **package** application with everything they need inside of the package, including **all** the **necessary** **dependencies** and **configuration**.

<Img w="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/package-with-dependencies-and-configuration.png' alt='package with dependencies and configuration'/>

The package is **portable**, just like any other artifact is. That package can be easily shared and moved around between a development team or development and operations team.

<Img w="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/package-can-be-easily-shared.png' alt='package can be easily shared'/>

## What problems does it solve?

That portability of containers plus everything packaged in one isolated environment gives it some of the advantages that makes **development** and **deployment** process more efficient.

## Where do containers live?

As mentioned before, containers are portable, so there must be some kind of storage for those containers so that you can share them and move them around.

Container repository is where containers live in. This is a special type of storage for containers.

- **Private repository**: Many companies have their own private repositories.
- **Public repository**: There is also a public repository for Docker containers where you can browse and probably find any application container that you want. Let's head over to browser: https://hub.docker.com and see how that looks like.
<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/aaEmMj.png' alt='aaEmMj'/>

## How containers improved application development?

Now let's see how containers improved the development process by specific examples.

### Before containers

How did we develop applications before the containers? Usually when you have a team of developers working on some applications, you would have to install most of the services on your operating system directly.

For example, you're developing some JavaScript applications, and you need PostgresSQL and Redis for messaging.

1. **Install process different on each operating system environment**  
Every developer in the team would have to go and install the binaries of those services, configure them and run them on their local development environment depending on which operating system they're using. The installation process will look actually different.

<Img w="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zQsHrz.png' alt='container improved application development'/>

1. **Many steps where something could go wrong**  
Most common, you have multiple steps of installation. So you have a couple of commands that you have to execute. And the chances of something going wrong and error happening is actually high because of the number of steps required to install each service. At the same time, this approach or this process of setting up a new environment can actually be pretty tedious, depending on how complex your application is. For example, if you have 10 services that your application is using, then you would have to do that 10 times on each OS environment.

### After containers

Now let's see how containers solve some of these problems with containers.

1. **Own isolated environment**  
With containers, you actually do not have to install any of the services directly on your operating system because the container is its own isolated operating system layer with Linux based image.
1. **Packaged with all needed configuration**  
As we saw in the previous, you have everything packaged in one isolated environment. So you have the PostgresSQL with the specific version packaged with a configuration in the start script inside of one container.
<Img w="360" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2022-08-06_15-05-27.png'/>
As the developer, you have to go and look for the binaries to download on your machine, but rather you just go ahead and check out the container repository to find that specific container and download on your local machine.
1. **One command to install the app**  
The download step is just one docker command which fetches the container and starts it at the same time.
  ```bash
  $ docker run postgres
  ```
  Regardless of which operating system you're on, the docker command for starting the container will not be different. It will be exactly the same. So we have 10 applications that your JavaScript application uses and depends on. You would just have to run 10 docker commands for each container and that will be it. Which makes the setting up your local development environment actually much easier and much more efficient than the previous version.
1. **Run same app with 2 different versions**  
  Also, as we saw before, you can actually have different versions of the same application running on your local environment without having any conflict.

## How containers improved application deployment?

### Before containers

A traditional deployment process will look like this:

<Img w="720" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Qb9r3B.png'/>

Development team will produce artifacts together with a set of instructions of how to actually install and configure those artifacts on the server. So you would have a jar file or something similar for your application. In addition, you would have some kind of database service or some other service also with a set of instructions of how to configure and set it up on the server. So development team would give those artifacts over to the operations team and the operations team will handle setting up the environment to deploy those applications. 

Now, the problem with this kind of approach is that:

1. **Configuration on the server needed**  
First of all, you need to configure everything and install everything directly on the operating system which we saw in the previous example that could actually lead to conflicts with dependency version and multiple services running on the same host.
1. **Textual guide of deployment**   
In other problems that could arise from this kind of process is when there is misunderstanding between the development team and operations because everything is in a textual guide as instructions.

So there could be cases where developers forget to mention some important point about configuration or maybe when operations team misinterpreted some of those instructions and when that fails, the operations team has to go back to the developers and ask for more details. And this could lead to some back and forth communication until the application is successfully deployed on the server.

### After containers

With containers, this process is actually simplified:

<Img w="720" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2022-08-06_21-09-45.png' />

1. **Developer and operations work together to package the application in a container**  
Now you have the developers and operations working in one team to package the whole configuration, dependencies inside the application just as we saw previously.
1. **No environment configuration needed on server except Docker runtime**  
Since it's already encapsulated in one single environment, you don't have to configure any of this directly on the server. The only thing you need to do 
is run a docker command that pulls the container image from somewhere you've stored. This makes exactly the problem that we saw on the traditional process much easier. No environment configuration needed on the server. The only thing, of course, you need to do is you have to install and set up the Docker runtime on the server before you will be able to run containers there, but that's just one time effort.

## References

1. [Docker Tutorial for Beginners (FULL COURSE in 3 Hours)](https://www.youtube.com/watch?v=3c-iBn73dDE)
2. [Wikipedia: Docker (software)](https://en.wikipedia.org/wiki/Docker_(software))
3. [Geeksforgeeks: Why Should You Use Docker – 7 Major Reasons!](https://www.geeksforgeeks.org/why-should-you-use-docker-7-major-reasons/)
