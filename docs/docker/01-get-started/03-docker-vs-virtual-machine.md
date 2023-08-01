---
title: Docker vs Virtual Machine
---

In order to understand how Docker works on the operating system level, let's first look at how operating system is made up.

## How is OS made up?

The operating system has two layers:

- **OS kernel layer**: It's the part that communicates with the hardware components like CPU and memory, etc
- **Applications layer**: The applications run on the kernel layer. In other words, they are based on the kernel.

<Img w="520" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/JGJEcR.png' legend='Figure: The operating system has two layers' />

For example, you all know Linux operating system and there are lots of distributions of Linux out there.

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/6ABGuWC1.png' legend='Figure: Linux distributions' origin="https://larrymanickam.medium.com/what-is-kubernetes-distribution-5fd6fe7c3d34"/>

There's Ubuntu, Debian, centOS and Redhat, etc. There are hundreds of distributions. They all look different. So the graphical user interface is different. The file system is maybe different. So a lot of applications that you use are different because even though they use the same Linux kernel, they use different or they implement different applications on top of that kernel. As you know, Docker and virtual machine, they're both virtualization tools.

## What's the difference between Docker and VM?

Let's think about what parts of the operating system they virtualize?

<Img w="680" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xJv9Jg.png' legend='Figure: Docker vs VM'/>

- **Docker virtualize the application layer**  
  When you download a docker image, it actually contains the applications layer of the operating system and some other applications installed on top of it. It uses the kernel of the host because it doesn't have its own kernel.
- **VM virtualize complete operating system**  
  VM has the applications layer and its own kernel. So what it virtualize is the complete operating system, which means that when you download a virtual machine image on your host, it doesn't use your host kernel. It puts up its own.

So what is this difference between Docker and virtual machine actually mean?

1. **Size**: Docker image much smaller.
2. **Speed**: Docker containers start and run much fast.
3. **Compatibility**: VM of any OS can run on any OS host.

## Docker Desktop

Let's say you have a Windows operating system with a kernel and some applications and you want to run Linux based Docker image on that Windows host.

<Img w="480" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/T5uLsT.png' />

The problem here is that a Linux based Docker image might not be compatible with the Windows kernel, and this is actually true for the Windows versions below 10 and also for the older Mac versions, which if you have seen how to install Docker on different operating systems, you see that the first step is to check whether your hosts can actually run Docker natively, which basically means is the kernel compatible with the Docker images?

In this case, a workaround is that you install a technology called [Docker Toolbox](https://github.com/docker-archive/toolbox), which abstracts away the kernel to make it possible for your hosts to run different Docker images.

:::tip

The Docker Toolbox installs everything you need to get started with Docker on Mac OS X and Windows. It includes the Docker client, Compose, Machine, Kitematic, and VirtualBox. For now, please use [Docker Desktop](https://www.docker.com/products/docker-desktop/) instead where possible.

:::

## References

1. [Docker Tutorial for Beginners (FULL COURSE in 3 Hours)](https://www.youtube.com/watch?v=3c-iBn73dDE)
