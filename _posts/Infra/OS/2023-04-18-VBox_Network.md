---
title: '[VBox] 설정'
author: juye-ops
date: 2022-11-21 10:00:00 +0900
categories: [Infra, OS]
tags: [Develop, Terminal]
render_with_liquid: false
---

# 네트워크
## 도구 \ 네트워크 설정
### Host-Only Network
- 가상 환경 네트워크 설정 시 'NAT'에 해당
- Host Windows(사용 OS)에 실제로 네트워크 형성
- Host - Virtual 연결 간 사용

### NAT Network
- 가상 환경 네트워크 설정 시 'NAT네트워크'에 해당
- Virtual(A) - Virtual(B) 연결 간 사용
- 가상 환경 간 내부 망을 구성


## Host - Virtual 연결
Host에서 Virtual Box의 IP에 접근하면 가상환경의 IP로 우회하여 접근하는 포트포워딩 진행

### 단독 가상환경에 진입
- 네트워크 도구에서 Host-Only Network 생성 (192.168.22.1)
- 가상 환경의 네트워크 어댑터를 NAT로 설정
- Advanced의 포트포워딩 진행
  - HostIP: HostOS에서 접근 할 IP (192.168.22.1)
  - Host포트: HostOS에서 IP와 함께 접근할 포트
  - GuestIP: 가상환경의 타겟 IP (10.0.2.15)
  - Guest포트: 가상환경의 타겟 포트

### 내부 망을 구성한 가상환경에 진입
- 네트워크 도구에서 Host-Only Network 생성 (192.168.22.1)
- 네트워크 도구에서 NAT Network 생성 (10.0.2.0/24)
- 가상 환경의 네트워크 어댑터를 생성한 NAT 네트워크로 설정
- 네트워크 도구의 NAT Networks에서 포트포워딩 진행
  - HostIP: Host-Only Network에서 생성한 접근 IP (192.168.22.1)
  - Host포트: HostOS에서 IP와 함께 접근할 포트
  - GuestIP: 가상환경의 타겟 IP (10.0.2.1)
  - Guest포트: 가상환경의 타겟 포트