---
title: '[Kubernetes] Pod: Infra(Pause) Container'
author: juye-ops
date: 2023-04-20 01:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---

# Infra(Pause) Container
어떤 Pod를 만들 때 가장 기본적인 인프라의 Pod를 함께 생성
- IP, Port 등의 인프라 제공을 목적
- 겉으로 보이진 않지만, Pod가 아닌 Worker Node의 Docker ps로 존재