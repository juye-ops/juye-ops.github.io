---
title: '[Kubernetes] Pod: 실행 패턴'
author: juye-ops
date: 2023-05-07 01:00:00 +0900
categories: ['Study', 'Infra']
tags: ['K8S']
render_with_liquid: false
---

# Pod 실행 패턴
Pod를 구성하고 실행하는 패턴
- Multi-container pod로 구성

> 앱 컨테이너: 앱의 실질적인 개발

## Sidecar
App container와 Log를 분석하기 위한 Sidecar를 배치
- Sidecar: 앱 개발의 로그를 분석

## Adapter
System 상태에 대한 Monitor 정보를 Adaptor가 받은 후 앱 컨테이너에 전달
- Adaptor: 모니터링 데이터를 수신, 앱 컨테이너에 전달을 담당

## Ambassador
앱 컨테이너가 만든 데이터를 내부 데이터베이스 등으로 전달하는 역할
- Ambassador: 데이터베이스 프록시