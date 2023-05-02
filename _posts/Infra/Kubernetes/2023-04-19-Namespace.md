---
title: '[Kubernetes] Namespace'
author: juye-ops
date: 2023-04-19 03:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---

# Namespace(ns)
컨테이너를 논리적으로 나누어서 관리하는 기법
- 기본적으로 ns를 지정하지 않으면 default라는 namespace에 저장
- Pod를 서비스 별로 관리하기에 용이

```bash
# NS_NAME 이라는 Namespace에 Pod 생성
kubectl create -f container.yaml [--namespace|-n] NS_NAME
kubectl run CONTAINER --image=IMAGE [--namespace|-n] NS_NAME

# Namespace 확인
kubectl get ns
kubectl get namespace
kubectl get namespaces

# Namespace별 등록된 Pod 확인
kubectl get pods [--namespace|-n] NS_NAME
```

## Default NameSpace 교체
기본적으로 ns를 지정하지 않으면 default라는 namespace에 저장
- Context: 쿠버네티스 Config에서 namespace를 등록하는 공간

1. 현재 context 상태 확인
```bash
# 아래 명령어를 통해 contexts 확인
kubectl config view
```
2. context 추가
```bash
kubectl config set-context NS_NAME --cluster=kubernetes --user=kubernetes-admin --namespace=NS_NAME
kubectl config set-context NS_NAME@kubernetes --cluster=kubernetes --user=kubernetes-admin --namespace=NS_NAME
```
3. context 변경
```bash
kubectl config use-context NS_NAME@kubernetes
```
4. 현재 context 확인
```bash
# NS_NAME의 Namespace를 확인 가능
kubectl config current-context
``` 

## Namespace 제거
```bash
kubectl delete namespaces NS_NAME
```