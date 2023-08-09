---
title: '[Kubernetes] Service 개념'
author: juye-ops
date: 2023-05-21 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# Service
동일한 서비스를 제공하는 Pod 그룹의 단일 진입점을 제공
- 동일한 서비스를 제공하는 여러 Pod를 접근하기 위한 하나의 Virtual IP 진입점을 생성

## Definition

```yaml
apiVersion: v1
kind: Service
metadata:
  name: webui-svc
spec:
  clusterIP: 10.96.100.100
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

# Service Type
- 기본 환경의 deploy
```yaml
# deploy
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webui
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




## ClusterIP (default)
- Pod 그룹의 단일 진입점(Virtual IP) 생성
- client가 cluster IP를 접근한다면 이를 적당히 분배하는 Load balancer 역할

### 예시
10.100.100.100:80 접근 시 `app:webui` label을 가진 pod에 랜덤으로 접근

```yaml
apiVersion: v1
kind: Service
metadata:
  name: clusterip-service
spec:
  type: ClusterIP
  clusterIP: 10.100.100.100
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

```
master@k8s-master:~/kubernetes/7$ curl 10.100.100.100
<!DOCTYPE html>
<html>
<head>
  ...
</head>
<body>
  ...
</body>
</html>
```


## NodePort
- ClusterIP 생성 후, 모든 Worker Node에 외부에서 접속 가능한 포트 개방

### 예시
nodeIP:30200 접근 시 `app:webui`의 레이블을 보유한 pod의 10.100.100.200의 80포트로 접근

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nodeport-service
spec:
  type: NodePort
  clusterIP: 10.100.100.200
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    nodePort: 30200
```


## LoadBalancer
- 클라우드 인프라스트럭처(AWS, Azure, GCP 등)나 오픈스택 클라우드에 적용
- LoadBalancer를 자동으로 프로 비전하는 기능 지원
- 클라이언트가 Load balancer로 접근할 시 Pod로 Forwarding


### 예시


```yaml
apiVersion: v1
kind: Service
metadata:
  name: loadbalancer-service
spec:
  type: LoadBalancer
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

## ExternalName
- 클러스터 안에서 외부에 접속 시 사용할 도메인을 등록해서 사용
- 클러스터 도메인이 실제 외부 도메인으로 치환되어 동작

### 예시

externalname-svc.default.svc.cluster.local
- *.default.svc.cluster.local 이라는 쿠버네티스의 기본 도메인 네임스페이스

```yaml
apiVersion: v1
kind: Service
metadata:
  name: externalname-svc
spec:
  type: ExternalName
  externalName: google.com
