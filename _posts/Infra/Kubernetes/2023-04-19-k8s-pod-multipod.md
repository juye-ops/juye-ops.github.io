---
title: '[Kubernetes]Pod: Multi-Pod'
author: juye-ops
date: 2023-04-19 02:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# Multi Pod
두 개 이상의 컨테이너(Pod)를 하나로 관리
- 여러 개의 Container를 명시
- 생성 시 한 Pod에서 2개의 Task를 식별 가능
- ip는 공유

```yaml
# pod-multi.yaml
apiVersion: v1
kind: Pod
metadata:
  name: multipod
spec:
  containers:
  - image: nginx:1.14
    name: webserver
    ports:
    - containerPort: 80
  - image: centos:7
    name: centos-container
    command:
    - sleep
    - "10000"
```

```
master@k8s-master:~/kubernetes$ kubectl get pods -o wide
NAME       READY   STATUS    RESTARTS   AGE   IP          NODE        NOMINATED NODE   READINESS GATES
multipod   2/2     Running   0          51m   10.32.0.2   k8s-node1   <none>           <none>
```

## Multi Pod의 특정 Container 언급
- Multi pod의 describe를 통해 각 Container의 이름 확인
- `-c` 인자를 통해 Container를 지정

```bash
# Nginx
## webserver(nginx)를 실행한 컨테이너의 Bash로 진입
kubectl exec multipod -c webserver -it -- /bin/bash
## webserver(nginx)의 log 확인
kubectl logs multipod -c webserver

# Centos
## centos-container에서 실행한 sleep 10000 식별
kubectl exec multipod -c centos-container -it -- ps -ef
## centos-container에서 nginx의 페이지를 localhost로 식별
kubectl exec multipod -c centos-container -it -- curl localhost
```