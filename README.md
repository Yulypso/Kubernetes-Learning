# Kubernetes-Learning

## Author

[Thierry Khamphousone](https://www.linkedin.com/in/tkhamphousone/)

---

<br/>

## For Docker

```bash
$ docker build -t yulypso/node-app:v0.0.1 .
$ Docker run -p 8000:3000 yulypso/node-app
```

---

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
$ kubectl run -i --tty node-app-sh --image=yulypso/node-app --restart=Never -- sh
```

---

<br/>

### Kubernetes - Create ReplicationController: Controllers/

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

### Kubernetes - Create Deployments: Deployments/

```bash
# Create deployment
$ kubectl create -f Deployments/deployment-1.yml  

# Expose deployment
$ kubectl expose deployment node-app-deployment --type=LoadBalancer --port=3000 --name=node-app-deployment
```

Browser acces: http://localhost:3000
-> "Node Server"

```bash
# Run deployment with another version of image (version: v0.0.2)
$ kubectl set image deployment/node-app-deployment node-app=yulypso/node-app:v0.0.2

# Get deployment status after updating version
$ kubectl rollout status deployment/node-app-deployment
```

Browser acces: http://localhost:3000
-> "Node Server Version 2"

```bash
# Get rollout history
$ kubectl rollout history deployment/node-app-deployment

# Run deployment to the previous version 
$ kubectl rollout undo deployment/node-app-deployment

# Run deployment to a previous version n (number comes from rollout history)
$ kubectl rollout undo deployment/node-app-deployment --to-revision=n
```

Browser acces: http://localhost:3000/
-> "Node Server"

**Info:** Kubernetes version changes must be on DockerHub to work

---

<br/>

### Add Label to a Node

```bash
$ kubectl label nodes docker-desktop hardware=high-spec
```

---

<br/>

### {get, edit} information

```bash
$ kubectl {get, edit} {pod|po} [--show-labels] [--output=wide]
$ kubectl {get, edit} {deployment|deploy} 
$ kubectl {get, edit} {service|svc}
$ kubectl {get, edit} {replicationcontroller|rc}
$ kubectl {get, edit} {replicaset|rs}
$ kubectl {get, edit} {node|no} [--output=wide] [--show-labels]
$ kubectl {get, edit} {serviceaccount|sa}
$ kubectl {get, edit} {secrets}

# watch in real time pod status
$ watch -n1 kubectl get pod
```

---

<br/>

### Kubernetes Dashboard

```bash
$ kubectl proxy &
```
Browser acces: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/\#/service?namespace=default


---

<br/>

### Yml files

- **service-2.yml**: create a service type NodePort for a **pod-1.yml** created, browser acces at http://localhost:31001
- **deployment-2.yml**: create a deployment for a specific Node by specifying a label. Useful for cluster with multiple Nodes. 
- **deployment-3.yml**: create a deployment with health check to ensure the availability and resiliency of the app even if the pod and deployment are still alive.