---
title: '[Kubernetes] Pod: 환경 변수 설정'
author: juye-ops
date: 2023-05-07 00:00:00 +0900
categories: ['Study', 'Infra']
tags: ['K8S']
render_with_liquid: false
---

# 환경 변수
Pod 내의 컨테이너가 실행될 때 필요로 하는 변수
- Pod 실행 시 미리 정의된 컨테이너 환경 변수 변경 가능

## 기존 방법
Docker CRI 경우 ENV 명령행을 통해 Dockerfile 작성

```yaml
# pod-nginx-env.yaml
...
spec:
  containers:
    - name: ngin-xcontainer
      image: nginx:1.14
      ports:
      - containerPort: 80
        protocol: TCP
      env:
      - name: MYVAR
        value: "testvalue"
      - name: NJS_VERSION
        value: 1.19

```