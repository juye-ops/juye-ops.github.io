---
title: '[Kubernetes] Pod: Resources 할당'
author: juye-ops
date: 2023-05-05 00:00:00 +0900
categories: ['Study', 'Infra']
tags: ['K8S']
render_with_liquid: false
---

# Resources
limits 혹은 request 등의 방법을 통해 Pod의 자원 량을 제한하거나 여유 공간이 존재하는 노드를 확보

- Resource requests(Node Level)
  - Pod를 실행하기 위한 최소 리소스 양을 요청하여 해당 리소스를 보유한 노드에 생성
- Resource limits (Pod Level)
  - Pod가 사용할 수 있는 최대 리소스 양을 제한
  - Memory limit을 초과해서 사용되는 파드는 종료(OOM Kill)되며, 다시 스케쥴링을 진행
  - Limits만 걸어도 Requests는 자동으로 함께 할당

## Example
```yaml
# Node2 - /etc/kubernetes/manifests/pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod-resource
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    ports:
    - containerPort: 80
      protocol: TCP
    resources:
      # requests
      requests:
        cpu: 200m # 200밀리코어(1/5 코어)
        memory: 250Mi
      # limits
      limits:
        cpu: 1  # 1코어(1)
        memory: 1Gi
```

## 유의사항
- 2코어 CPU에 2코어 할당 시
  - 이미 OS나 kubelet 등 한 개의 코어가 작업중이므로 Pending(스케쥴링 대기) 상태로 전이
  - CPU 4개의 Node를 추가할 시 즉시 해당 노드로 실행

