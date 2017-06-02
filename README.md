Creating an init [1] container which change the pod (via json patch replace operator [3]) label [4] state value to active. It uses the pod name exposes via an environment variable exposed via the Downward API [2].

implementation notes:
- vnc.html added patch label on load and unload (therefore page should be unloaded to remove the pod)
- from lightop add pod name argument to vnc.html

[1] https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
[2] https://docs.openshift.org/latest/dev_guide/downward_api.html
[3] https://tools.ietf.org/html/rfc6902#section-4.3
[4] https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/