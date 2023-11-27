---
title: '[AWS]부하 분산'
author: juye-ops
date: 2023-11-26 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*


# ELB(Elastic Load balancing)
AWS에서 제공하는 로드밸런싱 기술
- 로드밸런서: 서버의 상태를 파악하고 데이터를 분산하여 전달하는 접점 역할을 수행
  - 리스너: 서비스 하는 대상을 정의
    - 프로토콜 및 포트를 사용하여 연결 요청을 확인하는 프로세스
    - 로드 밸런서에서 서비스하고자 하는 프로토콜과 포트를 지정하는 규칙을 생성
  - 대상 그룹: 부하 분산 대상을 정의
    - 하나 이상의 대상을 라우팅하여 부하 분산을 하는 데 사용
    - 속한 대상에 대해 주기적으로 확인하는 프로세스(Keepalive)를 통해 상태 확인(Health Check)을 수행
    - 정상적인 상태의 대상에게 데이터를 전달


<img src="/static/img/Study/Infra/aws-load-balancer-service.png">
_로드 밸런서를 통한 서비스 제공 환경_

## 종류
### 1. ALB(Application Load Balancer)
HTTP나 HTTPS와 같이 웹 애플리케이션에 대한 분산 처리를 제공하는 로드밸런서

### 2. NLB(Network Load Balancer)
TCP나 UDP 프로토콜에 대한 포트 정보를 정의하여 네트워크 기반의 분산 처리를 제공하는 로드밸런서

### 3. CLB(Classic Load Balancer)
VPC의 예전 버전인 EC2-Classic에 대해서도 분산 처리를 제공할 수 있는 이전 세대의 로드밸런서

|구분|ALB|NLB|CLB|
|:-:|:-:|:-:|:-:|
|프로토콜|HTTP, HTTPS|TCP, UDP, TLS|TCP, TLS, HTTP, HTTPS|
|처리 속도|느림|빠름|중간|
|플랫폼|VPC|VPC|VPC, EC2-Classic|
|OSI 계층|7계층|4계층|-|
|다수의 포트 전달|지원|지원|미지원|
|IP를 통한 관리|미지원|지원|미지원|
|프라이빗 링크|미지원|지원|미지원|
|경로 기반 라우팅|지원|미지원|미지원|
|호스트 기반 라우팅|지원|미지원|미지원|

## ALB vs NLB
### ALB
- URL 경로 기반 라우팅, 호스트 기반 라우팅, HTTP 헤더 기반 라우팅 등 다양한 규칙을 생성하여 포워드, 리다이렉션, 지정 HTTP 응답 등의 작업을 수행 가능
- Lambda 함수를 호출하여 HTTP(S) 요청 처리 가능

### NLB
- 고정 IP나 탄력적 IP를 보유 가능
- VPC 엔드포인트 서비스로 연결하여 프라이빗 링크 구성 가능

## ELB 통신 방식
### 인터넷 연결(INternet Facing Load Balancer)
퍼블릭 주소를 가지고 있어 인터넷을 통해 요청을 로드밸런서에 등록된 EC2 인스턴스로 라우팅

### 내부(INternal Load Balancer)
프라이빗 주소만 가지고 있어 로드 밸런서를 위한 VPC 내부에 액세스하여 등록된 EC2 인스턴스 등 컴퓨팅 자원으로 라우팅

<img src="/static/img/Study/Infra/aws-lb-communicate-method.png">
_로드밸런서의 통신 방식(인터넷 연결/내부 연결)_

## 특징
### 고가용성
ELB로 인입되는 트래픽을 다수의 대상으로 분산하여 고가용성을 유지
### 상태 확인
대상 그룹에 대한 Keepalive를 통해 주기적으로 상태 확인
### 보안 기능
보안 그룹(Security Group)을 적용하여 보안 옵션을 부여
- NLB는 보안 그룹이 적용되지 않음

### 4계층/7계층 로드밸런싱
HTTP/HTTPS과 같은 7계층의 의 애플리케이션을 로드밸런싱 하거나 TCP/UDP의 4계층 로드밸런싱을 사용 가능

### 운영 모니터링
ELB 애플리케이션 성능을 실시간으로 모니터링 가능

 