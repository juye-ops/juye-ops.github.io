---
title: '[AWS]네트워크 연결 옵션 - VPC 피어링'
author: juye-ops
date: 2023-11-28 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*


# VPC 피어링
서로 다른 두 VPC 간 연결을 구성하여 프라이빗 IP 주소를 통해 통신을 할 수 있는 기능을 제공
- VPC 피어링을 통해 마치 동일한 네트워크 내에 있는 것처럼 서로 통신 가능

<img src="/static/img/Study/Infra/aws-vpc-peering.png">
_VPC 피어링 기본 구성도_

## 기능
### 1. 고속 네트워크, 트래픽 암호화 및 비용 절감
VPC 피어링을 사용하면 발생하는 트래픽이 AWS 백본 네트워크를 경유함으로써 고속 통신을 지원
- 암호화 및 전송 비용 절감의 이점 확보

### 2. 리전 간 VPC 피어링 지원
중국 리전을 제외하고 리전 간 VPC 피어링을 지원

### 3. 타 계정 간 VPC 피어링 지원
타 계쩡 간 VPC 피어링을 지원
- 리소스 중복 사용을 최소화하여 비용 절감 등의 효과를 확보

## 제약조건
### 1. 서로 다른 VPC CIDR(네트워크 대역) 사용 필요
구성하는 각 VPC에 할당된 IP CIDR은 동일하거나 겹치지 않아야 함

<img src="/static/img/Study/Infra/aws-vpc-peering-restriction1.png">
_VPC 간 동일 IP CIDR을 사용할 경우_

### 2. Transit Routing 미지원
- VPC 피어링 연결 구성 시, 상대방 VPC의 IP CIDR 대역 외에 다른 대역과 통신 불가
- 또한, 상대방 VPC에 구성된 인터넷 게이트웨이, NAT 게이트웨이뿐만 아니라 VPN과 Direct Connect로 연결되는 온프레미스와 통신 불가

<img src="/static/img/Study/Infra/aws-vpc-peering-restriction2.png">
_Transit Routing 환경 미지원_

### 3. VPC 피어링 최대 연결 제한
동일한 VPC 간의 연결은 하나의 연결만 지원
- VPC 당 연결 가능한 VPC 피어링 연결 한도는 기본적으로 50개이며, 추가 요청하여 최대 125개까지 연결 가능