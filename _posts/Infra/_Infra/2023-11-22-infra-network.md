---
title: '[Infra]Network'
author: juye-ops
date: 2022-11-22 00:00:00 +0900
categories: ['Infra', '_Infra']
tags: ['Infra', 'Cloud']
render_with_liquid: false
---
# OSI 7계층 모델
복잡한 네트워크 동작 과정을 7개의 계층으로 나누어 네트워크 통신 흐름을 한눈에 알아보고 이해하도록 장려
- 국제 표준화 기구(ISO; International Organization for Standardization)에서 개발
- 계층별로 하위 계층의 기능을 이용하고 상위 계층으로 기능을 제공하는 상하 관계

## 설명
<img src="/static/img/Study/Infra/network-osi7layer.png">
_OSI 7 레이어와 TCP/IP 프로토콜 간 계층별 비교_

### 1 Layer - 물리 계층
네트워크의 하드웨어 전송 기술
- 물리적인 링크의 연결, 유지, 해제 등을 담당

### 2 Layer - 데이터 링크 계층
Physical 계층에서 송수신되는 정보의 오류와 흐름을 관리하여 데이터 전달을 수행
- TCP/IP 프로토콜 상 Network Interface 계층으로 분류
- Ethernet, Wi-Fi, 물리적인 케이블 등

### 3 Layer - 네트워크 계층
데이터를 목적지까지 빠르고 안전하게 전달(라우팅)
- 여러 노드를 거칠때마다 최적의 경로를 탐색
- TCP/IP 프로토콜 상 Internet 계층으로 분류
- IP, ARP, ICMP 등

### 4 Layer - 전송 계층
종단의 사용자 간 데이터 통신을 다루는 최상위 계층
- 데이터 전달의 유효성과 효율성을 보장
- TCP/IP 프로토콜 상 Transport 계층으로 분류
- TCP, UDP 등

### 5 Layer - 세션 계층
종단 사용자 간의 응용 프로세스 통신을 관리하기 위한 방법 제공
- 데이터 통신을 위한 논리적인 연결

### 6 Layer - 표현 계층
데이터의 형식상 차이에 대해 송/수신자 간 이해할 수 있는 형태로 데이터를 표현
- 데이터 암호화 및 압축 등 수행

### 7 Layer - 응용 계층
응용 프로세스와 직접 연계하여 실제 응용 프로그램을 사용하게 하는 계층
- OSI 5-7 계층은 TCP/IP 프로토콜 상 Application 계층으로 분류
- HTTP, SSH, FTP, DHCP 등


# IP와 서브넷 마스크
## IP(Internet Protocol)
인터넷 상의 네트워크 자원들을 구분하는 고유한 주소
- OSI 모델에서 3계층에 해당

|구분|IPv4|IPv6|
|-:|:-:|:-:|
|주소 길이|32bit|128bit|
|표기 방법|8비트씩 4개의 파트로 10진수 표현|16비트씩 8개의 파트로 16진수 표현|
|예시|39.118.188.233|2002:0221:ABCD:CDEF:0000:0000:FFFF:1234|
|주소 개수|약 43억 개|약 43억\*43억\*43억\*43억|

### 퍼블릭 IP(공인 IP)
인터넷 구간의 통신 대상을 식별하기 위해 ISP에서 제공하는 전 세계에서 유일한 IP 주소

### 프라이빗 IP
일반 가정이나 회사 등의 독립된 네트워크에서 사용하는 내부 IP 주소
- 프라이빗 네트워크 관리자에 의해 할당
- 독립된 네트워크 상에서 유일한 주소 보유
- 프라이빗 IP 주소를 통해 외부 인터넷 구간과 통신 불가능
- 3가지 대역으로 고정
  - ClassA: 10.0.0.0 ~ 10.255.255.255
  - ClassB: 172.16.0.0 ~ 172.31.255.255
  - ClassC: 192.168.0.0 ~ 192.168.255.255


## 서브넷 마스크
IP 주소에 네트워크 ID와 호스트 ID를 구분하는 기준 값
- 네트워크 ID: 서브넷 식별 영역으로, 1로 표현
- 호스트 ID: 서브넷에서 대상을 식별로, 0으로 표현
- 예시(아래 셋은 모두 동일한 서브넷 마스크)
  - 11111111.11111111.11111111.00000000
  - 255.255.255.0
  - /24 (IP CIDR 표기법)

# TCP/UDP 및 포트 번호
## TCP/UDP

|구분|TCP|UDP|
|-:|:-:|:-:|
|OSI 모델|4계층(전송 계층)|4계층(전송 계층)|
|연결|연결 지향성|비연결 지향성|
|신뢰성|신뢰성 보장|신뢰성 보장하지 않음|
|순서|데이터 순서 보장|데이터 순서 보장하지 않음|
|제어|혼잡 제어, 흐름 제어 제공|혼잡 제어 및 흐름제어 미제공|
|속도|상대적으로 느림|상대적으로 빠름|
|서비스|HTTP, SSH, FTP 등|DNS, DHCP 등|

## 포트
서비스를 구분하기 위한 번호
- Well-known Port: 0 ~ 1023
  - HTTP 80
  - DNS 53
- Registerd Port: 1024 ~ 49151
- Dynamic Port: 49152 ~ 65535

# DHCP(Dynamic Host Configuration Protocol)
동적으로 IPv4 주소를 일정 기간 임대하는 프로토콜
- 임대 시간이 존재하며, 만료되면 반환하거나 갱신을 수행
- UDP 프로토콜
- 67, 68 포트

## DHCP 절차
중앙 집중형 서버/클라이언트 방식으로 동작
- DHCP Discover: DHCP 클라이언트에서 DHCP 서버를 찾기 위한 메시지
- DHCP Offer: DHCP 서버에서 할당할 IP 주소와 임대 시간을 알림
- DHCP Request: DHCP 클라이언트에서 DHCP 서버로 할당받은 IP를 요청
- DHCP Ack: DHCP 서버에서 최종적으로 할당 IP를 승인하여 알림

<img src="/static/img/Study/Infra/network-dhcp-sequence.png">
_DHCP 동작 절차_

# DNS(Domain Name System)
복잡한 IP 주소 체계를 해소하기 위한 문자 형태의 도메인 네임을 제공하기 위한 기술
- 아이피로 구성된 웹 서버를 "google.com" 등으로 이용
- UDP 프로토콜
- 53 포트

# 라우팅(Routing)
복잡하게 연결된 네트워크 망에서 최적의 경로를 잡아 통신
- 네트워크 경로를 잡아주는 OSI 모델에서 3계층인 Network 계층의 핵심적인 기능을 수행
- 최적의 라우팅을 통해 안정적이고 빠른 통신 지향

## 라우터와 라우팅 테이블
- 라우터: 라우팅을 수행하는 장비
- 라우팅 테이블을 통해 경로를 파악하고 원하는 목적지 대상으로 데이터를 전달

<img src="/static/img/Study/Infra/network-router_routingtable.png">
_라우터와 라우팅 테이블_