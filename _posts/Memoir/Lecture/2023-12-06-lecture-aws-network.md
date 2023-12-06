---
title: '[회고]따라하며 배우는 AWS 네트워크 입문'
author: juye-ops
date: 2023-12-06 00:00:00 +0900
categories: [Memoir, Lecture]
tags: ['TTABAE', 'K8S']
render_with_liquid: false
---

<img src="/static/img/Study/Infra/aws-network-book.jpg">
_따라하며 배우는 AWS 네트워크 입문 표지_

# 학습 목적
AWS 클라우드 네트워크에 대한 지식을 실습을 통해 최대한 빠르고 쉽게 습득하도록 도모
- 이론적인 내용을 눈으로 확인하고 도식화된 그림과 기술 동작 절차에 대한 설명으로 보다 쉽게 이해


# 학습 내용
1. AWS 인프라
   - AWS 소개
   - EC2 배포 및 사용
   - CloudFormation 스택 생성 및 삭제
2. VPC 기초
   - VPC(Virtual Private Cloud)
   - 네트워크 개념
   - VPC 리소스
   - 퍼블릭/프라이빗 서브넷 VPC 구성
3. VPC 고급
   - VPC 엔드포인트
   - 배치 그룹(Placement Group)
   - 메타데이터
4. 인터넷 연결
   - AWS의 인터넷 연결
5. 부하 분산
   - ELB
   - Route 53
   - CloudFront
   - Global Accelerator
6. 네트워크 연결 옵션
   - VPC 피어링
   - AWS 제공 VPN
   - 전송 게이트웨이
   - Route 53 DNS 해석기
   - Direct Connect
7. 네트워크 보안
   - 보안 그룹과 네트워크 ACL
   - VPC 플로우 로그
   - VPC 트래픽 미러링
   - AWS WAF
   - IAM

# 회고
> 인프라를 넘어 클라우드 엔지니어로서의 꿈을 위해 AWS를 실습하고자 책을 구매했다.
> 네트워크에 대한 관심과 흥미가 사전에도 있었지만, 이를 바탕으로 정말 재밌게 배울 수 있었던 것 같다.
>
> 이 책을 조금 더 일찍 접했으면 어땠을까하는 아쉬움이 많이 남아있다.
> 특히, AWS에 대한 내용보다도 네트워크에 대한 지식이 매우 많았다.
> 서버리스 등 클라우드 기술에 대해 더 배우고 싶다는 생각으로 책을 샀지만, 오히려 더 필요하다고 느끼게 되었다.
>
> 아직은 모든 개념을 이해하진 못한 것 같다.
> 특히 게이트웨이 이름이 너무 많았다. TGW, IGW, VGW ... 등
>
> 그리고, 본 과정을 학습하기 직전에 클라우드 엔지니어 면접을 보고왔는데,
> 기존에는 Client VPN만 존재하는 줄 알았기 때문에 Site-to-Site VPN에 대한 질문을 대답하지 못한 아쉬움이 있다.
>
> 본 학습을 바탕으로 AWS, K8S 등을 적용한 프로젝트를 수행하고자 한다.
> 또한, 나아가 타인의 사설 프로젝트에 대해서 Solution Architect를 수행하고 싶다.