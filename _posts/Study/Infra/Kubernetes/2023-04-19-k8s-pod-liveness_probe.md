---
title: '[Kubernetes] Pod: Self-healing(Liveness Probe)'
author: juye-ops
date: 2023-04-19 01:00:00 +0900
categories: ['Study', 'Infra']
tags: ['K8S']
render_with_liquid: false
---

# Liveness Probe
Pod가 계속 실행할 수 있음을 보장
- Pod의 spec에 정의

## 기본 구조

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    livenessProbe:
      httpGet:
        path: /
        port: 80
```

# Liveness Probe 매커니즘
## httpGet probe
지정한 IP주소, port, path에 HTTP GET 요청을 보내어 해당 컨테이너가 응답하는지를 확인
- 200이 아닌 코드를 반환하면 오류로 취급하여 컨테이너를 재실행

```yaml
...
    livenessProbe:
      httpGet:
        path: /
        port: 80
```

## tcpSocket probe
지정된 포트에 TCP 연결을 시도
- 연결 실패 시 컨테이너를 재실행

```yaml
...
    livenessProbe:
      tcpSocket:
        port: 22
```

## exec probe
exec 명령을 전달
- 명령의 종료코드가 0이 아니면 컨테이너를 재실행

```yaml
...
    livenessProbe:
      exec:
        command:
        - ls
        - /data/file
```

## Liveness Probe
- periodSeconds: health check 반복 실행 시간(초)
- initialDelaySeconds: Pod 실행 후 delay할 시간(초)
- timeoutSeconds: health check후 응답을 기다리는 시간(초)

```yaml
...
    livenessProbe:
      httpGet:
        path: /
        port: 80
      
      # Default parameter
      initialDelaySeconds: 15
      periodSeconds: 15
      timeoutSeconds: 1
      successThreshold: 1
      failureThreshold: 3
```

