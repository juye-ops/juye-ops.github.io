---
title: '[Kubernetes]Pod: 기초 문법'
author: juye-ops
date: 2023-04-19 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# 생성
## Pod
- 명령행을 통한 생성

```bash
# kubectl run [pod name] --image=[image] [-n|--name-space default]
kubectl run myweb --image=nginx:1.14
kubectl run myweb --image=nginx:1.14 -n product
```

- 파일 기반 생성

```bash
kubectl run myweb --image=nginx:1.14 -n product --dry-run -o yaml > myweb-pod.yaml

cat myweb-pod.yaml      # namespace 등 수정 가능
# apiVersion: v1
# ...

kubectl create -f myweb-pod.yaml
kubectl create -f myweb-pod.yaml -n product # namespace=product
```

## namespace
```bash
kubectl create namespace produc
```

# 제거
## Pod
```bash
kubectl delete pod myweb
```

## namesapce
```bash
kubectl delete namespace product
```