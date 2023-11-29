---
title: '[AWS]네트워크 연결 옵션 - Transit Gateway'
author: juye-ops
date: 2023-11-29 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# 전송 게이트웨이(Transit Gateway)
VPC나 온프레미스 등의 네트워크를 단일 지점으로 연결할 수 잇는 라우팅 서비스
- 연결된 네트워크는 다른 네트워크에 연결할 필요 없이 AWS 전송 게이트웨이만 연결하면 되므로 관리를 최소화하고 운영 비용을 크게 감소

<img src="/static/img/Study/Infra/aws-transit-gateway.png">
_AWS 전송 게이트웨이 기본 구성도_

## 주요 기능
### 라우팅
전송 게이트웨이는 동적 라우팅과 정적 라우팅 모두 지원

### 엣지 연결
VPN을 사용하여 AWS 전송 게이트웨이와 온프레미스 장비 간에 VPN 연결 생성 가능

### VPC 가능 상호 운용성
VPC에 있는 인스턴스가 AWS 전송 게이트웨이에 연결된 다른 AWS VPC에 있는 NAT 게이트웨이, NLB, AWS 엔드포인트 서비스 및 Amazon EFS 등에 액세스 가능

### 모니터링
AWS 전송 게이트웨이는 AWS CloudWatch 및 AWS VPC 플로우 로그와 같은 서비스에서 사용하는 통계와 로그를 제공

### 리전 간 VPC 피어링
AWS 전송 게이트웨이 리전 간 VPC 피어링은 AWS 글로벌 네트워크를 사용하여 AWS 리전을 통해 트래픽 라우팅을 지원

### 멀티캐스트
고객이 클라우드에서 멀티캐스트 애플리케이션을 쉽게 구축하고 모니터링, 관리 및 확장할 수 있도록 지원

### 보안
AWS 전송 게이트웨이는 IAM과 통합되므로, AWS 전송 게이트웨이에 대한 액세스를 안전하게 관리할 수 있음

### 지표
성능과 송수신된 바이트, 패킷, 폐기된 패킷을 비롯한 트래픽 지표를 통해 글로벌 네트워크를 모니터링

## 미사용 vs 사용 비교
다수의 VPC나 VPN, Direct Connect Gateway를 사용하는 환경에서도 중앙 집중형 연결 환경 생성

<img src="/static/img/Study/Infra/aws-transit-gateway-use-vs-unuse.png">
_전송 게이트웨이 미사용과 사용의 차이_

## 전송 게이트웨이 관련 용어
### 전송 게이트웨이(Transit Gateway, TGW)
연결의 접점이 되는 중앙 집중형 단일 게이트웨이로, 허브&스포크 환경에서 허브 역할

### 전송 게이트웨이 연결(Transit Gateway Attachment)
전송 게이트웨이에 연결되는 방식으로 현재 3가지 방식을 지원
1. VPC 연결(VPC Attachment): 전송 게이트웨이와 동일 리전의 VPC를 직접적으로 연결
2. VPN 연결(VPN Attachment): 전송 게이트웨이와 Site-to-Site VPN을 연결
3. 전송 게이트웨이 피어링(Transit Gateway Peering): 전송 게이트웨이와 다른 리전의 전송 게이트웨이를 연결

### 전송 게이트웨이 라우팅 테이블(Transit Gateway Routing Table)
전송 게이트웨이에서 관리하는 라우팅 테이블

### 전송 게이트웨이 공유(Transit Gateway Sahring)
전송 게이트웨이를 공유하여 다른 AWS 계정에 전달하여 연결 가능(AWS Resource Access Manager 활용)

### 전송 게이트웨이 멀티캐스트(Transit Gateway Multicast)
전송 게이트웨이를 통해 멀티캐스트 트래픽 전달 가능

### 전송 게이트웨이 네트워크 매니저(Transit Gateway Network Manager)
논리적 다이어그램 또는 지리적 맵과 중앙 대시보드에서 글로벌 네트워크를 시각화

