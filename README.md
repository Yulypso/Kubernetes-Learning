# Kubernetes-Learning

## Author

[Thierry Khamphousone](https://www.linkedin.com/in/tkhamphousone/)

## Minikube

### Installation:

```bash
> brew install minikube
> minikube start
```

### Acces cluster (-- to dl appropriate ver of kubectl)

```bash
> minikube kubectl -- get po -A
> minikube dashboard
```

### Deploy application

```bash
> kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
kubectl expose deployment hello-minikube --type=NodePort --port=8080
```

### Show deployment

8080 : Application service port in Kubernetes
30089 : forwarded port to be accessed within the browser

``bash
> kubectl get services hello-minikube

NAME             TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
hello-minikube   NodePort   10.97.28.229   <none>        8080:30089/TCP   11m
```

### Acces deployed service

```bash
> minikube service hello-minikube

|-----------|----------------|-------------|---------------------------|
| NAMESPACE |      NAME      | TARGET PORT |            URL            |
|-----------|----------------|-------------|---------------------------|
| default   | hello-minikube |        8080 | http://192.168.64.2:30089 |
|-----------|----------------|-------------|---------------------------|
```

Or forward the port 8080 to 7080 and visit 127.0.0.1:7080 

```bash
> kubectl port-forward service/hello-minikube 7080:8080
``

### Load balancer deployment

```bash
> kubectl create deployment balanced --image=k8s.gcr.io/echoserver:1.4  
> kubectl expose deployment balanced --type=LoadBalancer --port=8080
```

in another window, start tunnel to create routable IP

```bash
> minikube tunnel
```

Then get the external-IP

```bash
> kubectl get services balanced
```

### Manage your cluster

Pause the cluster

```bash
> minikube pause
```

Stop the cluster

```bash
> minikube stop
```

Increase the default memory limit (requires a restart):

```bash
> minikube config set memory 16384
```

Browse the catalog of easily installed Kubernetes services:

```bash
minikube addons list
```

Create a second cluster running an older Kubernetes release:

```bash
minikube start -p aged --kubernetes-version=v1.16.1
```

Delete all of the minikube clusters:

```bash
minikube delete --all
```






