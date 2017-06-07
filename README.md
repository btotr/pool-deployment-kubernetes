# serve unique pods on kubernetes

This project is meant as POC to demonstrate the creation of unique pods per session using kubernetes. It creates a VNC connection to an ubuntu desktop environment and serve this to a web browser (noVNC). each client gets another session which lives in their own pod. 

## this is how it works

- it create a replicaSet which act as pool of pods (those pods are directly accessible by a client. See deploy.yml)
- add a label inactive which will be selected by a service (LB makes sure it is routed correctly. See service.yml)
- on a connection change the pod label to active using the app-engine-controller container
- replicacontroller will create a new pod with label inactive 
- when a session is closed set the state label to dangling (in theory the pod could remove itself). Also app-engine-controller container
- cronJob will remove dangling pods using the kubernetes api (See cronJob.yml).

## usage

### deploy

```
kubectl create -f deploy.yml -f service.yml -f cronJob.yml
```

### start load test:

```
watch kubectl get pod --show-labels --selector=app=app-engine --sort-by=.metadata.labels.state  
kubectl create -f loadTestJob.yml
```