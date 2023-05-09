---
title: '[Kubernetes] Controller: ReplicaSet'
author: juye-ops
date: 2023-05-08 02:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---

# ReplicaSet
Replication Controller와 같은 역할을 하는 컨트롤러
- Replication Controller 보다 풍부한 selector

```yaml
selector:
  matchLabels:
    component: redis
  matchExpressions:
    - {key: tier, operator: In, values: [cache]}
    - {key: environment, operator: NotIn, values: [dev]}
```

- matchExpressions 연산자
  - In: key와 values를 지정하여 해당 key의 values가 일치하는 Pod만 연결
  - NotIn: key의 values는 일치하지 않는 Pod에 연결
  - Exists: key가 존재하는 pod에 연결
  - DoesNotExist: key가 존재하지 않는 pod에 연결

## Definition

```yaml
# Replication controller
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-nginx
spec:
  replicas: 3
  selector:
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


```yaml
# ReplicaSet
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: rs-nginx
spec:
  replicas: 3
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

## Selector
- In

```yaml
...
spec:
  replicas: 3
  selector:
    matchExpressions:
    - {key: ver, operator: In, value: ["1.14"]}
    template:
    ...
```

- Exists

```yaml
...
spec:
  replicas: 3
  selector:
    matchExpressions:
    - {key: ver, operator: Exists}
    template:
    ...
```

## CRUD
```bash
# Create
kubectl create -f rs-nginx.yaml

# Read
kubectl get replicaset
kubectl get rs

kubectl get pod --show-labels

# Update
kubectl scale rs rs-nginx --replicas=2

# Delete
kubectl delete rs rs-nginx
```

# 유의사항
1. 2개의 RS 실행 중 동일한 label의 RC 3개를 실행
   - RS에서 생성한 Pod 2개 실행 되는 그대로 RC Pod만 1개 추가
   - RS와 RC간 이미지가 다를 경우 기능이 달라지므로, Unique한 값의 label을 선정