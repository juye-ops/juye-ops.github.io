---
title: '[Kubernetes] Controller: StatefulSet'
author: juye-ops
date: 2023-05-10 00:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---

# StatefulSet
Pod의 상태(이름, 볼륨 등)를 유지해주는 컨트롤러
- 상태만 보장하므로, 노드 배치는 랜덤
- scale up 시 pod 이름 증가, down 시 pod 이름 감소

## Definition

```yaml
# statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: sf-nginx
spec:
  replicas: 3
  serviceName: sf-nginx-service
  podManagementPolicy: Parallel # Default: OrderedReady
  selector:
    matchLabels:
      app: webui
  template:
    metadata:
      name: nginx-pod
      labels:
        app: webui
  spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
```

## Example

- 생성

```
master@k8s-master:~$ kubectl create -f statefulset.yaml
statefulset.apps/sf-nginx created

master@k8s-master:~$ kubectl get pods
NAME         READY   STATUS    RESTARTS   AGE
sf-nginx-0   1/1     Running   0          5s
sf-nginx-1   1/1     Running   0          5s
sf-nginx-2   1/1     Running   0          5s
```

- Scale up

```
master@k8s-master:~$ kubectl scale statefulset sf-nginx --replicas=4
statefulset.apps/sf-nginx scaled
master@k8s-master:~$ kubectl get pods
NAME         READY   STATUS    RESTARTS   AGE
sf-nginx-0   1/1     Running   0          10m
sf-nginx-1   1/1     Running   0          10m
sf-nginx-2   1/1     Running   0          10m
sf-nginx-3   1/1     Running   0          5s
```

- Scale down

```
master@k8s-master:~$ kubectl scale statefulset sf-nginx --replicas=2
statefulset.apps/sf-nginx scaled
master@k8s-master:~$ kubectl get pods
NAME         READY   STATUS    RESTARTS   AGE
sf-nginx-0   1/1     Running   0          11m
sf-nginx-1   1/1     Running   0          11m
```