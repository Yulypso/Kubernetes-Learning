# Kubernetes-Learning

## Author

[Thierry Khamphousone](https://www.linkedin.com/in/tkhamphousone/)

<br/>

## For Docker

> ```Docker run -p 8000:3000 yulypso/node-app```

<br/>

## For Kubernetes

### Docker
1. Create server app listening at port XXXX
2. Add Dockerfile config for Docker
3. Build Docker container and specify tag
    ```bash
    $ docker build -t yulypso/node-app:v0.0.1 .
    ```
4. Push Docker image on DockerHub
    ```bash 
    $ docker push yulypso/node-app #get latest by default 
    ```

### Kubernetes
1. Create pod yaml file
2. Create pod on the Kubernetes cluster
    ```bash
    $ kubectl create -f Pods/pod-1.yml
    ```
3. Expose pod to create a service 
    ```bash
    $ kubectl expose pod www.my-node-app.com --port=3000 --name=frontend --type=LoadBalancer
    ```
4. Access exposed service at **localhost:3000** from browser

**Info:** Kubernetes needs DockerHub images to work
**Info:** Kubernetes exposed pod port must be at the same image defined port.

---

<br/>

### Useful command

- Attach to the running process (get some logs if exists)
```
$ kubectl attach www.my-node-app.com
```

- Execute commands within a container
```bash
$ kubectl exec www.my-node-app.com -- ls
```

- Execute a shell, this creates a new pod with a new container
```bash
kubectl run -i --tty node-app-sh --image=yulypso/node-app --restart=Never -- sh
```