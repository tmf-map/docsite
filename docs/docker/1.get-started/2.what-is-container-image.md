---
title: What is Container & Image
---

## What is Container?

Now that you know what a container concept is, let's look at what a container is technically.

- **Layers of images**  
  Technically container is made up of images. So we have layers of stacked images on top of each other.
- **Mostly Linux base image, because small in size**  
  At the base of most the containers you would have a Linux based image, which is either Alpine with a specific version or it could be some other Linux distribution. And it's important for those base images to be small. That's why most of them are actually Alpine, because that will make sure that the containers stay small in size, which is one of the advantages of using container.
- **Application image on top**  
  On top of the base image, you would have application image and below is a simplified diagram. Usually you would have these intermediate images that will lead up to the actual application image that is going to run in the container. And of course, on top of that, you will have all this configuration data.

  <Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/9rCrGa.png' />

 Let's dive into a practical example, first of all, let's head over to Docker Hub and search for postgres

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/MfAZA8.png' />

Open the terminal, you can use `docker pull` or `docker run` which can pull image automatically if it doesn't exist on your local machine.

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/frfjg3h.png' />

As mentioned before, the containers are made up of layers. What you see here are actually all those layers that are separately downloading from the Docker Hub.

The advantage of splitting those applications in layers is that actually, for example, if the image changes or you have to download a newer version of postgres, what happens is that the layers there are the same between those two versions of postgres will not be downloaded again, but only those layers that are different.

For example, now it's going to take around 10 or 15 minutes to download this one image because we don't
have any postgres locally. But if we were to download the next version, it will take a little bit less
time because some layers already exist on the local machine.

After downloaded it, you can run to get started:

```bash
$ docker run postgres:14.5
```

Then, you can actually see all the running containers:

```bash
$ docker ps
```

You can actually see all the running containers. So here you can see that postgres is running and it actually says image.

In addition, you can also start the postgres with different versions. When both of them running, there's no conflict between those two. Actually, you can run any number of applications with different versions maybe of the same
application with no problem at all.

## Image V.S Container

A lot of people may confuse those two terms. There is actually a very easy distinction between the two:

<Img w="750" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/nvfj54f.png' />

:::tip

If it's not running, basically it's an **image** and it's just an artifact that's lying around.  
If we started and actually run it on the machine, it is a **container**.

:::

## References

1. [Docker Tutorial for Beginners (FULL COURSE in 3 Hours)](https://www.youtube.com/watch?v=3c-iBn73dDE)
