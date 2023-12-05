---
title: '[AWS]WAF(Web Application Firewall)'
author: juye-ops
date: 2023-12-05 01:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# WAF(Web Application Firewall)
웹 애플리케이션 보안에 특화된 전용 방화벽
- 웹 서비스 취약점에 대한 공격을 탐지하고 차단하는 기능을 수행
  - SQL Injection 공격
  - XSS(Cross-Site Scripting)
  - CSRF(Cross-Site Request Forgery)
- 웹 접근 트래픽에 대한 페이로드 분석 및 패턴 기반의 필터링을 통해 공격을 탐지하고 차단
- 보안 규칙 및 사용자 정의의 특정 트래픽 패턴을 필터링하는 규칙을 생성하여 웹 애플리케이션에 트래픽 도달을 제어
  - CloudFront, ALB, API Gateway에 배포 가능

<img src="/static/img/Study/Infra/aws-waf-architecture.png">
_WAF 도식화_

<img src="/static/img/Study/Infra/aws-waf-sequence.png">
_WAF 동작 도식화(정상/비정상 흐름)_

## 주요 기능
### 웹 트래픽 필터링
웹 취약점 공격을 차단하는 규칙을 손쉽게 생성하여 웹 트래픽을 필터링하도록 규칙을 생성
- 여러 웹 사이트에 배포할 수 있도록 중앙에서 관리하는 웹 트래픽 필터링 규칙의 집합 생성

### 자동화 및 유지 관리
API를 통해 규칙을 자동으로 생성 및 유지 관리하고, 개발 및 설계 프로세스에 규칙을 통합 가능
- AWS CloudFormation 템플릿을 사용하여 자동 배포 및 프로비저닝 가능

### 가시성 보장
CloudWatch와 완전히 통합되어 다양한 지표를 제공
- 임계값이 초과하거나 특정 공격이 발생하는 경우 손쉽게 지정 경보를 하거나 가시성 보장

### AWS Firewall Manager와 통합
AWS Firewall Manager를 사용하여 AWS WAF 배포를 중앙에서 구성 및 관리 가능
- AWS Firewall Manager는 정책 위반 여부를 자동으로 감사하고 이를 보고하여 즉각 대처 및 조치 가능

# AWS WAF 구성
Web ACL -> Rule -> Statement -> Inspect, Match Condition, Transformation, Action
## Web ACL
AWS WAF의 최상위 컴포넌트로 하위 컴포넌트인 Rule을 추가하여 AWS 리소스를 보호
- Web ACL을 통해 CloudFront 배포, API Gateway REST API 또는 ALB가 응답하는 웹 요청을 세부적으로 제어 가능
- Web ACL 내에 포함되는 Rule은 최대 100개까지 생성이 가능하며, Rule은 사전 정의된 규칙이나 사용자 정의 규칙을 선택하여 생성 가능

## Rule
Web ACL의 하위 컴포넌트로 검사 기준을 정의하고 기준을 충족할 경우 수행 작업(Match Action)을 포함
- Rule을 사용하여 일치 대상에 대해 요청을 차단하거나 요청을 허용 가능
- Rule의 하위 컴포넌트로 Statement가 있으며, 최대 5개의 Statement를 설정 가능
- 각 Statement에 대한 Match Action 수행 가능

## Statement
웹 필터링의 상세 조건을 정의하는 컴포넌트로, 상세 조건은 Inspect, Match Condition, Transformation, Action으로 구분 가능
- Inspect: Inspection 대상읠 정의하는 조건
- Match Condition: Inspection 대상에 대한 분류 방법을 정의
- Transformation(Optional): Match Condition의 추가적인 옵션을 부여
- Action: 필터링 동작 방식을 정의하는 것으로 허용, 거부, 카운트 중 선택

# AWS WAF 특장점
### 민첩한 보안
빠른 규칙 전파 및 업데이트가 수행되며, 서비스 영향 없이 유연한 구성으로 민첩한 보안 서비스를 제공

### 동적 확장
AWS WAF로 트래픽이 급증 시 대역폭을 자동으로 확장하여 서비스에 문제 없도록 작동

### 효율적인 비용
AWS WAF 초기 구축에 대한 높은 투자 비용이 없으며, 사용한 만큼만 비용을 지불

### 손쉬운 배포 및 유지 관리
손쉬운 구성 및 배포를 할 수 있으며, AWS Firewall Manager를 통해 규칙을 중앙에서 정의 및 관리하여 유지 관리의 편의성을 제공

### API를 통한 자동화
AWS WAF의 모든 기능은 API 또는 AWS Management Console을 사용해 구성
- 이를 통해 DevOps에서 애플리케이션을 개발하면서 웹 보안을 강화하는 애플리케이션 별 규칙을 정의 가능