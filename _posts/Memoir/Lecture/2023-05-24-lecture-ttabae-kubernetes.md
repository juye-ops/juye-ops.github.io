---
title: '[회고] 따배쿠: 따라하면서 배우는 쿠버네티스'
author: juye-ops
date: 2023-05-24 00:00:00 +0900
categories: [Memoir, Lecture]
tags: ['TTABAE', 'K8S']
render_with_liquid: false
---

# 학습 목적
Infra, Cloud 엔지니어링에서 서비스 운용에 우수한 컨테이너 오케스트레이션 학습

# 학습 내용
- Kubernetes 기초
  - 용어
  - 아키텍처
  - 환경 설정
- Pod
  - Edit
  - Liveness probe
  - Multi-pod
  - Namespace
  - Init container
  - Infra(Pause) container
  - Static pod
  - resources
  - 환경 변수 설정
  - 실행 패턴
- Controller
  - Replication controller
  - ReplicaSet
  - Deployment
  - DaemonSet
  - StatefulSet
  - Job controller
- Service
  - Headless service
  - kube proxy
- Ingress

# 회고
> 컨테이너라는 개념을 처음 다룰 땐 어려웠지만, 신기하고 재미있었다.
> 당시에는 Infra라는 개념을 구체적으로 알지 못해 단순히 '지금을 위해 배우는 것이다..' 라고 생각했었는데,
> 하다보니 재미있어서 단순히 Backend 기술로만 취급했다.  
> 
> 시간이 흘러 Infra 라는 개념을 알고, 다양한 기술스택을 분석하면서 Kubernetes를 적극적으로 다루고자 하였다.
> 따라서, 이성미 강사님의 [따배](https://www.youtube.com/@ttabae-learn4274) Youtube 강의를 통해 Kubernetes를 학습하였다.
> 
> AWS 학습도 고려했지만, Kubernetes 학습을 먼저 선택한 이유는
> 먼저 현대 서비스가 최소한 어떻게 구축되는지가 더욱 중요했다고 생각했기 때문이다.  
> 'AWS 또한 이러한 Kubernetes 아키텍처로 이루어져 있지 않을까?'  
> 혹은  
> '고 가용성, 질 높은 시스템을 위해서 이에 대한 아키텍처는 어떻게 구성이 될까?'  
> 라는 개념이 더 중요했다.  
> 뿐만 아니라 Container라는 개념이 매우 흥미로웠다.
> 그 과정에서 Kubernetes는 꼭 배우고 싶은 기술 중 하나였다.
> 
> 아직은 이를 어떻게 활용해야 할 지 모르겠다.
> 단순히 트래픽 조정을 위한 것인지, 아니면 MSA 같은 서비스 분배를 수행해도 되는 것인지 헷갈린다.
> '실제 프로젝트 예시가 있으면 좋겠다' 라는 생각이 들었다.
> 현재 진행하는 [Cotton Candy](/posts/project-cotton_candy/) 프로젝트를 통해 이를 적용해보고자 한다.  
> 아직은 Docker 레벨에서도 아키텍처 설계가 막혔지만, 최종적으로 쿠버네티스도 지원할 수 있도록 최선을 다 할 것이다.