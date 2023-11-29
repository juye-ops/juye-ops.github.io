---
title: '[AWS]네트워크 연결 옵션 - Route 53 Resolver'
author: juye-ops
date: 2023-11-29 01:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# VPC DNS
## 프라이빗 호스팅 영역(Private Hosted Zones)
AWS VPC 서비스로 생성한 도메인과 그 하위 도메인에 대하여 AWS Route 53의 DNS 쿼리 응답 정보가 담긴 일종의 컨테이너

## VPC DNS 옵션
- DNS resolution(DNS 확인): AWS 제공 DNS 해석기를 사용하며, 비활성화 시 AWS 제공 DNS 해석기를 사용할 수 없음
- DNS hostnames(DNS 이름): AWS 제공 Public과 Private Hostname을 사용하며, 비활성화 시 AWS 제공 Hostname을 사용할 수 없음

<img src="/static/img/Study/Infra/aws-vpc-dns-option.png">

## VPC DHCP 옵션 세트(Option Sets)
도메인 네임과 도메인 네임 서버의 정보를 제공
- 사용자가 원하는 도메인 네임과 도메인 네임 서버의 정보를 지정한 DHCP 옵션 세트를 생성하여 VPC에 적용 가능

## 프라이빗 호스팅 영역 DNS 쿼리 과정
프라이빗 호스팅 영역이 존재 시, AWS 제공 DNS 해석기는 해당 영역에 DNS 쿼리 수행
<img src="/static/img/Study/Infra/aws-dns-query-sequence.png">

## 다수의 VPC가 1개의 프라이빗 호스팅 영역에 연결
프라이빗 호스팅 영역과 여러 VPC가 연결하여 DNS 쿼리를 수행
- 타 계쩡 VPC 연결은 AWS CLI, AWS SDK, Windows PowerShell, AWS Route 53 API를 통해서 가능

## 고려사항
- 퍼블릭 호스팅 영역 DNS 쿼리보다 프라이빗 호스팅 영역 DNS 쿼리를 우선
- EC2 인스턴스는 Route 53 해석기에 1초당 최대 1024개 요청을 보냄

# Route 53 Resolver(해석기)
Route 53 해석기와 전달 규칙을 이용하여 서로 간에 도메인 질의를 가능하도록 지원
- 하이브리드 환경에서 온프레미스와 AWS VPC 간 도메인 질의는 불가능
- VPC DNS 옵션인 DNS Hostname과 DNS Resolution을 활성화

<img src="/static/img/Study/Infra/aws-route53-resolver.png">
_AWS Route 53 Resolver(해석기) 기본 구성도_

## 용어
- Route 53 Resolver(Inbound/Outbound): Route 53 해석기
- Forward Rule: 전달 규칙, 다른 네트워크 환경에 도메인 쿼리를 하기 위한 정보
- Inbound Endpoint: AWS VPC에 DNS 쿼리를 받을 수 있는 네트워크 인터페이스(ENI)
- Outbound Endpoint: 전달 규칙을 다른 네트워크로 쿼리할 수 있는 네트워크 인터페이스

## 하이브리드 환경에서 Route 53 Resolver 동작
### 온프레미스에서 AWS로 DNS 쿼리를 할 경우
인바운드 엔드포인트를 생성하여 해당 엔드포인트로 DNS 쿼리가 가능

### AWS에서 온프레미스로 DNS 쿼리를 할 경우
아웃바운드 엔드포인트를 생성하여 해당 엔드포인트로 DNS 쿼리가 가능
- 아웃바운드 경우에는 반드시 전달 규칙을 생성하여 VPC를 연결
- 만약 다른 계정의 VPC인 경우에는 AWS RAM(Resource Access Manager)을 이용하여 연결이 가능

<img src="/static/img/Study/Infra/aws-hybrid-route53-resolver.png">
_하이브리드 환경에서 Route 53 해석기 동작_

## Route 53 해석기 규칙 유형
### 전달 규칙(Conditional forwarding rules)
특정 도메인에 대한 쿼리를 지정한 IP(DNS 서버)로 전달

### 시스템 규칙(System rules)
- 시스템 규칙의 종류
  - 프라이빗 호스팅 영역(Private DNS)
  - Auto defined VPC DNS(ap-northeast-2.compute.internal 등)
  - Amazon 제공 외부 DNS 서버
- 시스템 규칙은 전달 규칙보다 우선 순위

# Route 53 해석기 - Query Logs
Route 53 Resolver Query Logs 기능으로 VPC 내 모든 자원(EC2, Lambda, 컨테이너 등)에서 DNS 쿼리를 보내는 경우에 로깅이 가능
- 기존에는 퍼블릭 영역에 대한 DNS 쿼리에 대해서만 로깅이 가능
- Query Logs는 CloudWatch Logs, S3, Kinesis Data Firehose에 전송 가능

<img src="/static/img/Study/Infra/aws-route53-query-logs.png">
_Query Logs를 CloudWatch Logs Insights에서 확인_