---
title: '[Kubernetes] Controller: Replication controller'
author: juye-ops
date: 2023-05-08 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---


# Replication controller
Contoller 중 가장 Basic한 구조
- 요구하는 Pod의 개수를 보장하며 파드 집합의 실행을 항상 안정적으로 유지하는 것을 목표
  - 요구하는 Pod의 개수가 부족하면 template을 이용해 pod를 추가
  - 요구하는 Pod의 수보다 많으면 최근에 생성된 Pod를 제거
- 기본 구성
  - selector: \<key, value\> 형태의 label selector를 지정
  - replicas: 배포 개수를 설정
  - template

```bash
# label = {app:webui}인 nginx이미지 3개 생성
## Controller가 app:webui Pod를 3개 보장
kubectl create rc-nginx --image=nginx --replicas=3 --selector=app=webui
```

> app:webui라는 label의 nginx 이미지 레플리카 3개를 만들고,  
> app:webui라는 label은 전적으로 rc-nginx가 담당한다.  

## Definition
- 일반적인 Pod definition

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: webui
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
```

- Replication controller definition

```yaml
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

## CRUD
```bash
# Create
kubectl create -f rc-nginx.yaml

# Read
kubectl get replicationcontroller rc-nginx
kubectl get rc rc-nginx

kubectl get pod --show-labels

# Update
kubectl scale rc rc-nginx --replicas=2

# Delete
kubectl delete rc rc-nginx
```

# 유의사항
1. app:webui 레이블 3개의 레플리카를 생성 후 추가적으로 app:webui를 따로 run할 시
   - 컨트롤러는 app:webui라는 label이 3개만 생성되도록 제어중이므로 생성되자마자 제거 처리
2. nginx:1.14를 실행한 후 nginx:1.15로 편집(edit) 시
   - 현재 실행중인 replica pods는 그대로 1.14
   - pod를 삭제한 후 자동으로 생성되는 pod가 1.15로 변경