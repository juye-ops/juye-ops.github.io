---
title: '[Kubernetes]Ingress'
author: juye-ops
date: 2023-05-23 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# Ingress
HTTP나 HTTPS를 통해 클러스터 내부의 서비스를 외부로 표출
- Service에 외부 URL을 제공
  - 라우터마다 다른 서비스를 제공하는 개념
- 트래픽 로드 밸런싱
- SSL 인증서 처리
- Virtual hosting을 지정

## 설치
[Docs: nginx controller](https://kubernetes.github.io/ingress-nginx/deploy/)
- Bare metal 버전 이용

 ```
 master@k8s-master:~$ kubectl get pods -n ingress-nginx
NAME                                       READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-g7zmd       0/1     Completed   0          50s
ingress-nginx-admission-patch-v4ffp        0/1     Completed   0          50s
ingress-nginx-controller-bd5bb9d6f-bvpq9   0/1     Running     0          50s

master@k8s-master:~$ kubectl get svc -n ingress-nginx
NAME                                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             NodePort    10.96.146.84    <none>        80:30910/TCP,443:31419/TCP   57s
ingress-nginx-controller-admission   ClusterIP   10.96.145.197   <none>        443/TCP                      57s
```
