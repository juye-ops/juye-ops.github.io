---
title: '[Kubernetes] Controller: Replication Controller 실습'
author: juye-ops
date: 2023-05-08 01:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---


# 1번 예제
다음의 조건으로 ReplicationController를 사용하는 rc-lab.yaml 파일을 생성하고 동작
- 아래 설정의 Pod 2개 운영
  - labels: {name: apache, app: main, rel: stable}
  - rc name: rc-mainui
  - container: httpd:2.2
- 현재 디렉토리에 rc-lab.yaml을 생성하며, 파일을 이용해 실행

```yaml
# rc-lab.yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: rc-mainui
spec:
  replicas: 2
  selector:
    name: apache
    app: main
    rel: stable
  template:
    metadata:
      name: nginx-pod
      labels:
        name: apache
        app: main
        rel: stable
    spec:
      containers:
      - image: httpd:2.2
        name: rc-mainui
```

# 2번 예제
위의 동작되는 `httpd:2.2` 버전의 컨테이너를 3개로 확장하는 명령어를 적고 실행

```bash
kubectl scale rc rc-mainui --replicas=3
```