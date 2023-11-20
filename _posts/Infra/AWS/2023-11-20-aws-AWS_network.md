---
title: '[AWS]AWS Network 소개'
author: juye-ops
date: 2023-11-20 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

<img src="/static/img/Study/Infra/aws-network_services.png">
_AWS Network 주요 서비스_

# AWS VPC - 리소스 격리
VPC(Virtual Private Cloud)는 AWS 클라우드 내 논리적으로 독립된 섹션을 제공하여 사용자가 정의한 가상 네트워크상에서 다양한 AWS 리소스를 실행할 수 있도록 지원
- 독립된 가상의 클라우드 네트워크

# AWS VPN - 가상 사설망
VPN은 공용 인터넷을 통해 가상의 사설 네트워크를 구성하여 프라이빗 통신을 제공
- 데이터 암호화, 전용 연결 등 여러 보안 요구사항들을 충족 가능
- AWS에서 제공하는 관리형 VPN 서비스에는 Site-to-Site VPN과 클라이언트 VPN을 제공

<img src="/static/img/Study/Infra/aws-network_site-to-site.png">
_AWS VPN 서비스 도식화_

# ELB(Elastic Load Balancing) - 로드 밸런서
AWS에서 제공하는 로드 밸런싱 기술
- 서비스 대상 시스템(인스턴스 등)에 데이터를 분산하여 전달하는 역할을 수행

# AWS PrivateLink - 프라이빗 연결
퍼블릭 인터넷에 데이터가 노출되지 않도록 장려하고, 내부 네트워크를 통해 AWS 서비스와 온프레미스 간에 안전한 비공개 연결을 제공

# Route 53 - 도메인 네임 시스템
AWS에서 제공하는 관리형 DNS 서비스
- 도메인 이름 구매를 대행하고, 구매한 도메인 주소에 대한 호스팅 영역 설정을 통해 도메인 질의에 대한 응답을 처리
- Route 53 Resolver 기능을 통하여 하이브리드 클라우드 환경에서 온프레미스와 AWS 간 도메인 질의를 지원

# AWS 전송 게이트웨이 - 네트워크 확장
VPC나 온프레미스 등의 네트워크를 단일 지점으로 연결할 수 있는 라우팅 서비스

<img src="/static/img/Study/Infra/aws-network_gateway.png">
_AWS 전송 게이트웨이 도식화_

# AWS Direct Connect - AWS 전용 연결
데이터 센터, 본사 사무실 또는 코로케이션(Co-Location) 환경과 같은 장소에서 AWS와의 전용 네트워크 연결을 제공하는 전용선 서비스

<img src="/static/img/Study/Infra/aws-network_direct-connect.png">
_AWS Direct Connect 도식화_

# AWS Cloud Front - CDN(콘텐츠 전송/캐시)
AWS에서 제공하는 CDN 서비스
- 수백개의 엣지 POP을 두고 AWS 글로벌 네트워크를 통하여 콘텐츠를 캐싱

# AWS Global Accelerator - 글로벌 전송
로컬 또는 글로벌 사용자를 대상으로 애플리케이션의 가용성과 성능을 개선할 수 있는 서비스

# 네트워크 보안
AWS의 네트워크 기반의 보안 기능으로 보안 그룹, 네트워크 ACL, 웹 방화벽이 존재