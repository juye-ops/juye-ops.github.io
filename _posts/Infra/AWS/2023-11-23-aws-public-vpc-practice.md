---
title: '[AWS]실습 - 퍼블릭 서브넷 VPC 구성'
author: juye-ops
date: 2023-11-23 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

<img src="/static/img/Study/Infra/aws-vpc_practice1.png">
_퍼블릭 서브넷 VPC 실습 목표 구성도_

# VPC 생성
10.0.0.0/16 대역의 VPC를 생성
- 가상 라우터가 존재하며, 기본 라우팅 테이블을 활용

## 생성
서비스 > VPC > VPC > VPC 생성
- 이름 태그: "VPC-test"
- IPv4 CIDR 블록: "10.0.0.0/16"

<img src="/static/img/Study/Infra/aws-vpc_architecture.png">
_VPC 생성 후 도식화_

# 퍼블릭 서브넷 생성
생성한 VPC 내에 퍼블릭 서브넷 생성

## 생성
서비스 > VPC > 서브넷 > 서브넷 생성
- VPC ID: VPC-test 태그의 VPC 선택
- 서브넷 이름: "test-SN"
- 가용 영역: ap-northeast-2a
- IPv4 CIDR 블록: 10.0.0.0/24

<img src="/static/img/Study/Infra/aws-subnet_architecture.png">
_Subnet 생성 후 도식화_

# 인터넷 게이트웨이 생성 및 VPC 연결
외부 인터넷 구간과 통신을 하기 위한 인터넷 게이트웨이 생성 및 VPC 연결

## 생성
서비스 > VPC > 인터넷 게이트웨이 > 인터넷 게이트웨이 생성
- 이름 태그: "test-IGW"

## VPC 연결 접근
1. 가장 최초 IGW 상태에 "Detached" 식별
2. 우측 상단의 작업에서 "VPC에 연결" 클릭
3. 생성한 VPC 선택 후 "인터넷 게이트웨이 연결" 클릭
4. 상태 "Attached" 식별

<img src="/static/img/Study/Infra/aws-igw_architecture.png">
_IGW 생성 후 도식화_

# 퍼블릭 라우팅
생성한 VPC 내에 퍼블릭 라우팅 테이블을 생성하고, 퍼블릭 서브넷과 연결

## 생성
서비스 > VPC > VPC > 라우팅 테이블
- 이름 태그: "test-Public-RT"
- VPC: 생성한 VPC 선택

## 서브넷 연결
1. 서브넷 연결 탭 진입
2. 명시적 서브넷 연결의 "서브넷 연결 편집" 클릭
3. 생성한 "test-SN" Subnet 체크 후 연결 저장

<img src="/static/img/Study/Infra/aws-rt_architecture.png">
_라우팅 테이블 생성 후 도식화_

## 퍼블릭 라우팅 테이블 경로 추가
외부 인터넷 통신을 위한 라우팅 경로가 없으므로, 모든 네트워크가 인터넷 게이트웨이로 향하는 라우팅 경로 추가
1. 라우팅 탭 진입
2. "라우팅 편집" 클릭
3. "라우팅 추가" 클릭
   - 대상 1: "0.0.0.0/0"
   - 대상 2: "인터넷 게이트웨이" 선택 후 생성한 게이트웨이 ID 선택

<img src="/static/img/Study/Infra/aws-rt-add_architecture.png">
_라우팅 테이블 인터넷 경로 추가 후 도식화_


# 검증
## EC2 인스턴스 생성
서비스 > EC2 > 인스턴스 > 인스턴스 시작
- 이름: "Public-EC2"
- AMI: AmazonLinux 2 AMI (HVM), SSD Volume Type
- 인스턴스 유형: t2.micro
- 키 페어 입력
- 네트워크
  - VPC: 생성한 "VPC-test"
  - 서브넷: 생성한 "test-SN"
  - 퍼블릭 IP 자동 할당: 활성화
  - 나머지: 기본 값
- 스토리지 구성: 기본 값

## 검증
인스턴스에 접속
```
$ ping google.com
64 bytes from kix07s06-in-f14.1e100.net (142.250.76.142): icmp_seq=1 ttl=46 time=22.2 ms
```

<img src="/static/img/Study/Infra/aws-instance_architecture.png">
_인스턴스 생성 도식화_