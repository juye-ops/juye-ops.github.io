---
title: '[Kubernetes] Controller: DaemonSet'
author: juye-ops
date: 2023-05-09 02:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---


# DaemonSet
각 노드에서 Pod가 한 개씩 실행되도록 보장
- 로그 수입기, 모니터링 에이전트와 같은 프로그램 실행 시 적용

## Definition

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: daemonset-nginx
spec:
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

## Rolling update/back
기존 deploy와 유사
- edit을 통해 roll update
- history undo를 통해 rollback