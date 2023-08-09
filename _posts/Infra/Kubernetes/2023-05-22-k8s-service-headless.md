---
title: '[Kubernetes] Headless Service'
author: juye-ops
date: 2023-05-22 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# Headless Service
- ClusterIP가 없는 서비스로 단일 진입점이 필요 없을 때 사용
- Service와 연결된 Pod의 endpoint로 DNS 레코드가 생성
  - DNS resolving service 지원
- Pod의 DNS 주소: [pod-ip-addr].[namespace].pod.cluster.local
  - Ex. 10-36-0-1.default.pod.cluster.local

## Example
```yaml
apiVersion: v1
kind: Service
metadata:
  name: headless-service
spec:
  type: ClusterIP
  clusterIP: None
  selector:
    app: webui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```