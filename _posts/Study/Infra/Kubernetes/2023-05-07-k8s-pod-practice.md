---
title: '[Kubernetes] Pod: 실습'
author: juye-ops
date: 2023-05-07 02:00:00 +0900
categories: ['Study', 'Infra']
tags: ['K8S']
render_with_liquid: false
---

# 1번 예제
node1에 redis 이미지로 mydb라는 이름의 static pod 생성
1. node1의 Static pod 위치 식별

```
root@k8s-node1:~# cat /var/lib/kubelet/config.yaml | grep static
staticPodPath: /etc/kubernetes/manifests
```
2. master에서 yaml 파일 추출 후 node1에 저장

```
master@k8s-master:~$ kubectl run mydb --image=redis --dry-run -o yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: mydb
  name: mydb
spec:
  containers:
  - image: redis
    name: mydb
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

```yaml
# node1: /etc/kubernetes/manifest/mydb-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: mydb
  name: mydb
spec:
  containers:
  - image: redis
    name: mydb
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

# 2번 예제
다음과 같은 조건에 맞는 Pod 생성
- Pod name: myweb, image: nginx:1.14
- CPU 200m, Memory 500Mi 요구
- CPU 1core, Memory 1Gi 제한
- Application 동작에 필요한 환경변수 DB=mydb를 포함
- namespace product에서 동작

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myweb
  namespace: product
spec:
  containers:
  - image: nginx:1.14
    name: myweb
    resources:
      requests:
        cpu: 200m
        memory: 500Mi
      limits:
        cpu: 1
        memory: 1Gi
    env:
      - name: DB
        value: mydb

```