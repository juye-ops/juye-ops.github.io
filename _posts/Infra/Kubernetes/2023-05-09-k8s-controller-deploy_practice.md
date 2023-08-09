---
title: '[Kubernetes] Controller: Deployment 실습'
author: juye-ops
date: 2023-05-09 01:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# 1번 예제
다음의 조건으로 Deployment를 사용하는 dep-lab.yaml 파일을 생성하고 apply 명령으로 동작
- 아래 설정의 Pod 2개 운영
  - labels: {name: apache, app: main, rel: stable}
  - container: httpd:2.2
  - 히스토리 기록
- annotations( kubernetes.io/change-cause: version 2.2) 추가로 설정
  - deployment name: dep-mainui
  - container: httpd:2.2

```yaml
# dep-lab.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dep-mainui
  annotations:
    kubernetes.io/change-cause: version 2.2
spec:
  replicas: 2
  selector:
    matchLabels:
      name: apache
      app: main
      rel: stable
  template:
    metadata:
      labels:
        name: apache
        app: main
        rel: stable
    spec:
      containers:
      - name: deplab
        image: httpd:2.2
```

```bash
kubectl create -f dep-lab.yaml --record
```

# 2번 예제
위의 동작되는 dep-lab.yaml의 이미지를 `httpd:2.4` 버전으로 Rolling update
- apply 명령을 통해 진행

```yaml
# [modified] dep-lab.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dep-mainui
  annotations:
    kubernetes.io/change-cause: version 2.2
spec:
  replicas: 2
  selector:
    matchLabels:
      name: apache
      app: main
      rel: stable
  template:
    metadata:
      labels:
        name: apache
        app: main
        rel: stable
    spec:
      containers:
      - name: deplab
        image: httpd:2.4
```

```bash
kubectl apply -f dep-lab.yaml --record
```

# 3번 예제
현재의 dep-mainui 히스토리(history)를 확인하고 rollback

```bash
kubectl rollout history deploy dep-mainui
kubectl rollout undo
```

# 4번 예제
현재 동작중인 Pod의 httpd 이미지 버전 확인

```bash
kubectl describe deploy dep-mainui
kubectl describe pod dep-mainui-67b4cc7d99-7vnmm
```