---
title: 'On Premiser'
author: juye-ops
date: 2023-04-24 10:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['Cloud', 'Docker', 'Kubernetes']
render_with_liquid: false
---

|**분류**|팀 프로젝트|
|**참여 인원**|2명|
|**소속**|Haemu|
|**개발 기간**|2023.04. ~ 2023.09.|
|**비고**||

# 📘 **상세 설명**
---
## **프로젝트 소개**
Host PC를 Private CSP로 지정하여 웹 기반 클라우드 개발 환경(IDE)을 구축합니다.  
누구나 쉽게 이용할 수 있도록 Easy-to-build 시스템을 지향합니다.  
클라이언트는 Host의 IP 혹은 도메인을 바탕으로 외부에서 접근한 후, IaaS, PaaS 컨테이너를 생성하여 개발을 진행할 수 있습니다.  
<!-- 나아가, Host PC를 Control plane으로 지정하여 쿠버네티스 환경을 구축하거나 모니터링 기능도 제공합니다.   -->

<img src="/static/img/Projects/Premiser/systemflow.svg">
_프로젝트 구조도_

## **개발 환경 & 아키텍처**
- Infra: `Docker`
- Backend: `Python` `FastAPI`
- Database:`MySQL`
- Load balancer: `Nginx`
- Open source: `Docker-py` `Code-server`
- Frontend: `React`

# 📜 **개발 방법**
---
## **Infra**
- `Docker-compose` 환경 구성
  - load balancer: 웹 뷰 (frontend 및 IDE) 식별을 위한 `Nginx` 기반 웹 서버
  - frontend: 클라이언트가 접근할 `React` 기반 웹 대시보드
  - backend: 클라이언트가 웹에서 요청한 Request를 처리하는 `Python`의 `FastAPI` 기반 WAS
  - container: 클라이언트가 생성한 컨테이너를 관리하기 위한 Docker in docker 및 `Nginx` Proxying을 통한 `Code-server` IDE 제공
  - database: 지원하는 앱 버전, 클라이언트가 생성한 사용자/프로젝트/개발 컨테이너 정보 등을 관리

<img src="/static/img/Projects/Premiser/premiser-network-architecture.svg">

## **Load balancer**
- `Nginx` 기반 Frontend 및 IDE 페이지로 Proxying
- IDE 페이지에서 80포트에 대한 WS만 취급하는 문제점 해결

## **Backend**
- `FastAPI` 기반 라우터 구축
  - 추후 `Kubernetes` 기반 MSA 확장 고려
- `Docker-py`를 통한 DinD 관리
- `MySQL` 기반 DAO 제작
  - Decorator 문법을 통한 가독성 향상

## **Container**
- IDE 컨테이너 생성
  - 각각의 IDE는 container 내부 도커(DinD)에서 `Code-server`로 구성
- `FastAPI`를 통한 IDE Proxy 관리
- `Nginx` 기반 웹 서버 Proxy 설정
  - Client의 권한으로 IDE에 접근하는게 아닌, Client가 Host에게 IDE를 호출하도록 유도
    - ex. `http://{웹 페이지}/ide/{container_name}/` 로 접근 시, Host만 읽을 수 있는 `http://container/{container_name}` 페이지를 반환
    - 직접적인 `http://container/{container_name}`은 식별 불가

## **Database**
- `MySQL` 스키마 제작
  - MySQL Workbench를 통한 모델링

<img src="/static/img/Projects/Premiser/premiser-erd.png">

## **Frontend**
- 로그인
- 대시보드
  - 프로젝트, 컨테이너 등을 관리할 수 있는 대시보드 구현

# 👪 **역할 및 개발 내용**
---
- 팀장
  - 아이디어 고안
  - Github Repo 관리 및 운용
- 인프라 설계 및 구축
  - `Docker` 기반 템플릿 작성
  - 아키텍처 설계
- 로드밸런서 구축
  - `Nginx` 기반 로드 밸런서 구축
  - Frontend 및 IDE 뷰 Proxying
- Backend 구현
  - 프로젝트 템플릿 설계
  - `FastAPI`를 이용한 비즈니스 로직 제공
  - 원격으로 `Docker`를 접근하기 위한 `Docker-py` 오픈소스 활용
- 데이터베이스 스키마 설계 및 구현
  - `MySQL` 기반 스키마 설계
  - DAO 제작

# 💡 **개발 경험 및 후기**
---
## Docker-py
DinD(Docker in docker)를 `Docker-py`로 활용하기 위해 많은 시행착오를 거쳤다.  

DooD(Docker out of docker)은 클라이언트가 생성하는 컨테이너를 독립적으로 관리할 수 없기 때문에,  
즉 Host의 도커도 영향을 받기 때문에 DinD를 적용하였다.

DinD를 하기 위해 2가지 방법을 시도하였는데,  
첫 번째는 **Docker:dind Image를 바로 이용**하는 것이었고,  
두 번째는 **Ubuntu Image에 직접 Docker를 설치**하는 것이었다.

첫 번째 방법은, Docker hub에서 설명서를 읽었지만, 원활하게 통신이 되지 않았다.  
TLS를 요구한다는 것까지 이해했는데, 이 점을 구체적으로 적용하지 못했다.  

따라서, 두 번째 방법인 Ubuntu로 Docker를 제공하였다.  
하지만 해당 방법 역시 IDE를 제공하기 위한 추가적인 Proxy를 구축해야 했다.  
`Nginx`에 프록시를 추가하기 위해 `FastAPI` 통신을 제공하였다.  

또한, 클라이언트가 컨테이너를 생성할 때, 원하는 컨테이너들을 `Docker-compose`로 제공하고자 하였으나 `Docker-py`는 `Docker-compose`를 지원하지 않았다.  
이러한 점이 많이 아쉬워 API 개발도 고려하였지만, 시간과 프로젝트의 본연을 고려해 Dockerfile을 작성하는 기능을 제작하여 하나의 이미지로 관리하는 것에 더욱 집중하였다.  

**API의 설명서를 통해서 많은 기능을 안정적으로 개발**할 수 있었다.  
항상, 특히 이번 프로젝트에서 누구나 쉽게 사용할 수 있도록 **우수한 README를 작성**하고자 한 욕심이 있었는데, 이에 많은 동기 부여가 되었던 것 같다.  

## Load balancer
본 프로젝트에서 로드 밸런서를 적용한 이유는 IDE가 프론트엔드와 웹소켓을 요구하기 때문이었다.  
하지만, `React`는 개발용으로, 3000포트에서만 제공하는데, frontend:3000 -> IDE 페이지 로 접근 시 Websocket(1006) 에러가 발생하였다.  
여러가지 실험 결과 80포트의 웹 뷰를 사용할 시 웹 소켓도 허용한다는 점을 알았다.

본 문제를 해결하기 위해 **경험을 이용**했다.  
[Kubernetes 독학](http://localhost:4000/categories/kubernetes/)을 통해 로드 밸런서를 알 수 있었다.  
이를 통해 `Nginx`의 80포트로 모든 웹 뷰를 관리하였다.
따라서 다음과 같은 웹 접근이 가능하였다.  

> 대시보드) load_balancer:80 -> frontend:3000  
> IDE 페이지) load_balancer:80 -> container:80 -> IDE:80  

본 문제를 해결하기 위해 약 이틀 간의 시간을 소요했다.  
비록 Load balancer 임에도 불구하고 한 개씩의 서비스만 제공한다.  
하지만, 추후 `Kubernetes`로 확장하기 위해 Load_balancer를 쓰는 것이 필수적이라고 생각하게 되었다.  

## 프로젝트 템플릿
백엔드 개발을 깊이있게 다뤄본 적이 없어 이전에 수행했던 프로젝트에서 사용했던 `COCO-Annotator`를 참고했다.  
특히, utils, database등을 나누면서 \_\_init\_\_.py를 처음 사용해보았는데, 덕분에 mysql, docker client 연결을 한 번에 수행할 수 있었다.  

이미 docker-py의 import명이 'docker' 였고, docker API를 개발하면서 파일 이름을 어떤 것으로 할 지 매우 많은 고민을 하였다.  
개발만큼 힘든 것이 명명 규칙인 것 같다.

# 🔗 관련 링크
---
[Github Repo](https://github.com/juye-ops/on-premiser)
