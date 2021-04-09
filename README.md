# Kubernetes-Learning

## Author

[Thierry Khamphousone](https://www.linkedin.com/in/tkhamphousone/)

<br/>

## For Docker

```bash
$ Docker run -p 8000:3000 yulypso/node-app
```

<br/>

## For Kubernetes

### Docker - create image + push DockerHub: Dockerfile
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

### Kubernetes - create pod/service: Pods/ Services/
1. Create pod yml file
2. Create pod on the Kubernetes cluster
    ```bash
    $ kubectl create -f Pods/pod-1.yml
    ```
3. Create service 
   1. LoadBalancer
       - Expose pod through command line
       ```bash
       $ kubectl expose pod www.my-node-app.com --port=3000 --name=node-app-service --type=LoadBalancer
       ```
       - Create service yml file
       ```bash
       $ kubectl create -f Services/service-1.yml # type: LoadBalancer
       ```
    2. NodePort
       - Expose pod through command line
       ```bash
       $ kubectl expose pod www.my-node-app.com --port=3000 --name=node-app-service --type=NodePort
       ```
       - Create service yml file
       ```bash
       $ kubectl create -f Services/service-1.yml # type: NodePort
       ```
4. Access exposed service 
   1. LoadBalancer
        > **localhost:\<port\>** from the browser //current port: 3000
   2. NodePort
        ```bash
        $ kubectl port-forward service/node-app-service 5000:3000
        ```
        > **localhost:\<port\>** from the browser //current port: 5000

**Info:** Kubernetes needs DockerHub images to work
**Info:** Kubernetes exposed pod port must be at the same image defined port.

<br/>

### Kubernetes - create ReplicationController: Controllers/

Horizontal scaling **Only for Stateless app** 

```bash
# Create
$ kubectl create -f Controllers/controller-1.yml 

# Rescale to 4 pods
$ kubectl scale --replicas=4 -f Controllers/controller-1.yml
$ kubectl scale --replicas=4 rc/node-app-controller
```

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

### Get information

```bash
$ kubectl get {pod|po}
$ kubectl get {deployment|deploy}
$ kubectl get {service|svc}
$ kubectl get {replicationcontroller|rc}
```