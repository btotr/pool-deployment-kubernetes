create a replicaSet which act as pool of pods (those pods are directly accessible by a client)
add a label inactive which will be selected by a service (LB makes sure it is routed correctly)
on a connection change the pod label to active
replicacontroller will create a new pod with label inactive
when a session is closed set the state label to dangling
cronJob will remove dangling pods using the kubernetes api (See cronJob.yml).

Creating an init [1] container which change the pod (via json patch replace operator [3]) label [4] state value to active. It uses the pod name exposes via an environment variable exposed via the Downward API [2].

app-engine implementation notes:
- uses base image dorowu/ubuntu-desktop-lxde-vnc
- vnc.html added patch label on load and unload (therefore page should be unloaded to remove the pod)
- from lightop add pod name argument to vnc.html

- [1] https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
- [2] https://docs.openshift.org/latest/dev_guide/downward_api.html
- [3] https://tools.ietf.org/html/rfc6902#section-4.3
- [4] https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/