---
title: '[AWS]Global Accelerator'
author: juye-ops
date: 2023-11-27 02:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# Global Accelerator
로컬 또는 글로벌 사용자를 대상으로 애플리케이션 가용성과 성능을 개선하는 서비스
- AWS의 글로벌 네트워크를 통해 사용자에서 애플리케이션으로 이어진 경로를 최적화하여 트래픽의 성능을 개선하는 기술
- 서울 리전의 AWS에 접근 시 국내 ISP의 네트워크 망 대역폭과 지연 상태가 원활하여 Global Accelerator를 사용하더라도 큰 체감을 할 순 없음

<img src="/static/img/Study/Infra/aws-ga-comparison.png">
_Global Accelerator 미적용/적용 차이점_

## 구성요소
Global Accelerator의 핵심은 Anycast IP를 제공하여 사용자 입장에서 가장 인접된 대상으로 접근하며, AWS 글로벌 네트워크를 경유하여 안정적이고 빠른 서비스 가능

<img src="/static/img/Study/Infra/aws-ga-architecture.png">
_Global Accelerator 아키텍처_

1. 엔드포인트 그룹: Global Accelerator 대상 애플리케이션이 배포되는 AWS 리전을 정의
   - 다수의 엔드포인트 그룹이 존재할 경우 Traffic Dial 값을 통해 비중 조정 가능
2. 엔드포인트: 엔드포인트 그룹에 속한 Global Accelerator 연결 대상으로 EC2 인스턴스, 탄력적 IP, ALB, NLB 등
   - 다수의 엔드포인트가 존재할 시 Weight 값을 통해 비중 조정 가능
3. 리스너: 프로토콜과 포트를 기반에 Global Accelerator로 인바운드 연결을 처리하는 객체
4. 애니캐스트 IP: Global Accelerator의 진입점 역할을 하는 고정 IP로, 애니캐스트(Anycast) 통신 방식을 사용
   - 같은 서비스를 하는 여러 개의 대상이 같은 애니캐스트의 주소를 가질 수 있으며, 사용자가 애니캐스트 주소로 서비스 요청을 하면 가장 효율적으로 서비스 할 수 있는 또는 가장 근접한 서버가 서비스를 제공
5. 엣지 로케이션: 다수의 엣지 로케이션에서 알리는 애니캐스트 IP 주소를 통해 사용자에게 가장 가까운 엣지 로케이션으로 트래픽 전송
6. 글로벌 네트워크: Global Accelerator를 통해 라우팅 되는 트래픽은 공용 인터넷이 아니라 AWS 글로벌 네트워크를 따라 통신
   - 가장 가까운 정상 상태의 엔드포인트 그룹을 선택하여 서비스

## 주요기능
### 고정 애니캐스트 IP
Global Accelerator의 진입점 역할을 하는 2개의 고정 IP 주소를 제공하며, 해당 고정 IP는 엣지 로케이션의 애니캐스트로 여러 엣지 로케이션에서 동시에 공개
- Global Accelerator로 연결되는 엔드포인트의 프론트엔드 인터페이스 역할

### 트래픽 제어
Traffic Dial 값과 Weight 값을 조정하여 다수의 엔드포인트 그룹과 엔드포인트에 대한 비중을 부여하여 트래픽 제어 가능

### 엔드포인트 상태 확인
Global Accelerator를 활용하면 엔드포인트 상태를 확인하는 상태 확인(Health Check) 동작으로 정상 상태 엔드포인트로 라우팅이 가능하며, 그로 인한 Failover 환경 구성이 가능

### 클라이언트 IP 보존
사용자가 최종 엔드포인트로 접근 시 사용자의 IP를 보존하여 주소를 확인 가능
- 만약 클라이언트 IP를 보존하지 않으면 Global Accelerator 고정 IP 대역으로 표기

### 모니터링
TCP, HTTP(S) 상태를 확인하여 엔드포인트 상태를 지속해서 모니터링
- 엔드포인트 상태 또는 구성의 변화에 즉각적으로 대응하여 사용자에게 최고의 성능과 가용성을 제공