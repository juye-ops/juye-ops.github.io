---
title: '[AWS]네트워크 연결 옵션 - Direct Connection'
author: juye-ops
date: 2023-11-29 02:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# Direct Connect
데이터 센터, 본사 사무실 또는 코로케이션(Co-Location) 환경과 같은 장소에서 AWS와의 전용 네트워크 연결을 제공하는 전용선 서비스
- VPN 같은 경우에는 인터넷을 통해 VPN 터널을 구성하기 때문에 인터넷 환경에 따라 연결 품질이 좌우
- AWS Direct Connect는 실제 전용선으로 AWS와 연결하기 때문에 더욱 일관성 있는 서비스 품질을 보장

<img src="/static/img/Study/Infra/aws-direct-connect.png">
_AWS Direct Connect 기본 구성도_

## 특징
### AWS Direct Connect 로케이션
실제 AWS 백본 네트워크와 연결되는 엣지 라우터가 위치하여 온프레미스와 전용 연결 구성 가능
- 서울 리전에는 가산과 평촌 두 곳이 존재

### Dedicated Connection
AWS 엣지 라우터와 직접 연결되는 Direct Connect는 1Gbps 또는 10Gbps의 대역폭을 제공
- Direct Connect 로케이션에 고객의 네트워크 장치가 위치
- Direct Connect 로케이션을 제공하는 곳의 임대 장비로도 구성 가능

### Hosted Connection
Direct Connect 파트너를 통해 Hosted Connection 구성 가능
- 최소 50Mbps부터 최대 10Gbps 연결을 제공

### 가상 인터페이스
- Direct Connect 연결에 대한 가상 인터페이스 생성 필요
- 용도에 따라 프라이빗, 퍼블릭, 전송 유형으로 생성 가능
- 프라이빗 가상 인터페이스: AWS VPC
- 퍼블릭 가상 인터페이스: AWS 백본 네트워크와 직접 연결하여 S3와 같은 퍼블릭 서비스로 연결 가능
- 전송 가상 인터페이스는 라우팅 서비스를 제공하는 AWS 전송 게이트웨이와 연결하는 가상 인터페이스

## 기능
- BGP 라우팅 프로토콜로 연결
  - 네트워크 경로 교환
  - BGP 피어링을 통해 AWS Direct Connect와 연결

### Multiple Connections
여러 연결을 통해 복원력과 대역폭을 향상 가능
- 이중화 연결을 구성하여 두 연결을 모두 사용하거나 장애에 대한 백업으로 구성 가능
- AWS에서 종종 유지보수를 진행하여 해당 유지보수 시간에는 Direct Connect 사용이 불가할 수 있으므로 이중화 구성을 권장
- 방법
  - Direct Connect 로케이션을 한 곳으로 사용: 개발 및 테스트 환경에 권장
  - Direct Connect 로케이션을 이중화 구성: 실제 서비스가 동작하는 환경에 권장
  - Direct Connect 로케이션을 백업 VPN 구성: 실제 서비스가 동작하는 환경에 권장
  - Direct Connect 로케이션과 라우터 간 회선 이중화 구성: 최고의 고가용성을 제공하는 환경

### Link Aggregation Group(LAG)
Direct Connect는 표준 프로토콜인 LACP(Link Aggregation Control Protocol)를 지원하여, 단일 Direct Connect 로케이션에서 하나 또는 다수의 연결을 하나의 논리적인 연결로 구성 가능
- 다수의 동일한 대역폭 연결을 하나의 연결로 구성하여 더 높은 대역폭 및 장애에 대한 내결함성을 향상

<img src="/static/img/Study/Infra/aws-direct-connect-lag.png">

### Bidirectional Forwarding Detection(BFD)
지정된 임계치 이후에 빠르게 BGP 연결을 끊어 다음 경로로 라우팅 가능
- 두 라우터 간의 전달 경로 상에 장애가 발생하는 경우, BGP 프로토콜에서 지원하는 Peer Keepalive를 통한 장애를 감지하기엔 많은 시간을 요구
- 선택적으로 사용 가능하지만, 해당 기능이 지원하는 경우 사용을 권장

## 구성 및 순서
### 1. Direct Connect Connection 요청
AWS 웹 콘솔에서 Dedicated Connection 생성 요청 가능
- 생성 단계에서 구성하고자 하는 Direct Connect 로케이션을 선택하고 대역폭 선택
- Direct Connect 연결을 위한 Direct Connect 파트너 선택 가능

### 2. LOA-CFA(Letter of Authorization and Connecting Facility Assignment) 다운로드
연결을 요청한 후, 요청된 연결을 선택하여 세부 정보 보기를 선택하면 해당 연결에 대한 LOA-CFA 다운로드 가능
- 비활성화 되어있는 경우 추가 요청 정보에 대한 이메일이 왔는지 확인이 필요
- 72시간이 지나도 다운로드가 비활성화인 경우 AWS에 문의 필요

### 3. LOA-CFA 전달
다운로드한 LOA-CFA를 Direct Connect 파트너 또는 회선 사업자에게 전달
- LOA-CFA는 네트워크 연결에 필요한 정보가 포함되어 있어 Direct Connect 파트너나 회선 사업자가 해당 문서를 확인하여 연결 가능
- Hosted Connection의 경우, LOA-CFA와 관계없이 Direct Connect 파트너에서 제공하는 Hosted Connection을 콘솔에서 확인 가능

### 4. 가상 인터페이스 생성
연결 생성이 완료되면, 생성된 연결에 사용할 가상 인터페이스 생성 가능
- 용도에 맞는 가상 인터페이스 선택 가능
- BGP 피어링에 필요한 정보 입력 요구

### 5. 구성 다운로드
가상 인터페이스 설정 완료 후, 입력한 정보를 기반으로 네트워크 장치에설정할 설정값 다운로드
- 가상 인터페이스 세부 설정에서 네트워크 장치 유형에 맞는 설정 다운로드
- 다운로드 한 구성 값을 참고하여 온프레미스 네트워크 장치에서 설정을 진행

### 6. 가상 인터페이스 상태 확인
온프레미스 네트워크 장치에서 설정을 완료한 후, 콘솔에서 가상 인터페이스 상태를 식별
- 가상 인터페이스 세부 정보 페이지의 상태가 UP이 되면 사용 가능
- 상태가 Down인 경우 BGP 피어링이 정상적으로 맺어지지 않았기 때문에 온프레미스 네트워크 장치에서 확인을 필요

## Direct Connect Gateway
Direct Connect 연결을 여러 VPC와 제공
- 글로벌 리소스로써, 다른 리전이나 타 계정의 VPC/Direct Connect에 대해서도 연결이 가능

# AWS Direct Gateway 기능 및 제약
## 기능
### VPC 연결
동일 계정 및 다른 계정의 VPC와 연결을 제공

### 글로벌 리소스
Direct Connect는 리전 리소스로써, 생성된 리전에서만 사용 가능
- Direct Connect Gateway를 사용하면 다른 리전에서 생성된 리소스를 Direct Connect Gateway와 연결된 모든 리전에서 사용 가능

### 전송 게이트웨이(Transit Gateway) 연결
- 전송 게이트웨이와 연결하여 사용 가능
- Direct Connect Gateway 소유자가 다른 계정에 공유하여 다른 계정의 전송 게이트웨이와도 연결이 가능

## 제약사항
- VPC 최대 연결 가능 수량은 동일 계정의 VPC나 다른 계정의 VPC 여부와 관계 없이 10개
- 추가 할당이 불가능하므로 더 필요한 경우 추가 Direct Connect Gateway 생성