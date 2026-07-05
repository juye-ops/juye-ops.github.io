---
title: '[Kubernetes]용어'
domain: Infra
category: Kubernetes
date: 2023-04-15
thumbnail: ""
description: ""
featured: false
---

# Node
- PC를 일컫는 표현
- Master Node(Control plane), Worker Node로 분류

# Pod
- Node에서 띄우는 컨테이너 단위
- Control plane에서 생성을 요청하면 스케쥴러에 따른 워커 노드에 배치

# Namespace
- 컨테이너를 논리적으로 나누어서 관리
- 인자: `--namespace`, `-n`

## Context
- 쿠버네티스 Config에서 namespace를 등록하는 공간