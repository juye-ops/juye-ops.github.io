---
title: '[Kubernetes] Controller: Deployment'
author: juye-ops
date: 2023-05-09 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---


# Deployment
ReplicaSet을 제어하는 부모 역할
- 목적: Rolling update
- Pod 이름은 [deploy_name]-[replicaset_id]-[pod_id]로 생성

## Rolling update/back
파드 인스턴스를 점진적으로 새로운 것으로 업데이트하여, deployment의 업데이트가 서비스 중단 없이 이루어질 수 있도록 지원

- command

```bash
# record를 통해 이전 업데이트 기록 식별 가능
kubectl set image deployment DEPLOY_NAME CONTAINER_NAME=NEW_VERSION_IMAGE --record

# 업데이트 히스토리 식별
kubectl rollout history deploy DEPLOY_NAME

# 업데이트 상태 및 로그 식별(업데이트 중)
kubectl rollout status deployment DEPLOY_NAME

# 업데이트 중지 및 재개(업데이트 중)
kubectl rollout pause deployment DEPLOY_NAME
kubectl rollout resume deployment DEPLOY_NAME

# 업데이트 Rollback (to-revision 시 N의 history로 롤백)
# history는 N이 없어지고 최종 revision으로 등록
kubectl rollout undo deployment DEPLOY_NAME [--to-revision=N]
```

- yaml 수정

```bash
# 기존 deploy1.yaml -> deploy2.yaml
kubectl apply -f deploy2.yaml
```

### 과정
3개의 nginx:1.14 pod를 nginx:1.15로 업데이트
1. 새로운 ReplicaSet을 생성
2. nginx:1.15 파드 한 개씩 생성하면서 생성 완료되면 nginx:1.14를 한 개씩 제거
  - 해당 과정을 순차적으로 진행
3. 기존 ReplicaSet 제거

## Definition
ReplicaSet에서 kind만 Deployment로 변경

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deploy
spec:
  ### defaults
  progressDeadlineSeconds: 600  # Default: 600초 동안 업데이트 실패 시 업데이트 취소
  revisionHistoryLimit: 10  # Default: History 10개로 제한
  strategy:
    rollingUpdate:    # Update 시 running Pod의 수 제한
      maxSurge: 25%   # if replicas == 3: floor[3*25%] = 1 -> 1개씩 순차 업데이트 진행
      maxUnavailable: 25%
    type: RollingUpdate 
  ######
  selector:
    matchLabels:
      app: webui
  replicas: 3
  template:
    metadata:
      labels:
        app: webui
    spec:
      containers:
      - image: nginx:1.14
        name: web
        ports:
        - containerPort: 80
```

## Example
nginx:1.14에서 nginx:1.15로 업데이트

1. Deployment 생성
```bash
kubectl create -f deployment1.yaml --record
```
```
master@k8s-master:~$ kubectl get pods -o wide
NAME                         READY   STATUS    RESTARTS   AGE     IP          NODE        NOMINATED NODE   READINESS GATES
app-deploy-c95d6f7d4-fnpnh   1/1     Running   0          2m32s   10.46.0.1   k8s-node1   <none>           <none>
app-deploy-c95d6f7d4-hbvt2   1/1     Running   0          2m32s   10.46.0.2   k8s-node1   <none>           <none>
app-deploy-c95d6f7d4-p72bn   1/1     Running   0          2m32s   10.40.0.3   k8s-node2   <none>           <none>
```

2. Rolling update
```bash
kubectl set image deploy app-deploy web=nginx:1.15 --record
```

3. 업데이트 내역 식별
```bash
kubectl rollout history deploy app-deploy
```