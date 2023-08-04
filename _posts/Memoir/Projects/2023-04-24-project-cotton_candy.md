---
title: 'Cotton Candy (진행 중)'
author: juye-ops
date: 2023-04-24 10:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['Cloud', 'Docker', 'Kubernetes']
render_with_liquid: false
---

|**분류**|팀 프로젝트|
|**참여 인원**|2명|
|**소속**|Haemu|
|**개발 기간**|2023.04. ~ |
|**비고**||

# 📘 **상세 설명**
---
## **프로젝트 소개**
- ***Cloud**: 모두가 같은 구름을 본다는 의미에서 명명*
- ***Cotton candy(솜사탕)**: 자신에게 구름(클라우드)처럼 보이는 솜사탕을 의미*

Host PC를 Private CSP로 지정하여 웹 기반 클라우드 개발 환경(IDE)을 구축합니다.  
누구나 쉽게 이용할 수 있도록 Easy-to-build 시스템을 지향합니다.  
클라이언트는 Host의 IP 혹은 도메인을 바탕으로 외부에서 접근한 후, IaaS, PaaS 컨테이너를 생성하여 개발을 진행할 수 있습니다.  
<!-- 나아가, Host PC를 Control plane으로 지정하여 쿠버네티스 환경을 구축하거나 모니터링 기능도 제공합니다.   -->

<img src="/static/img/Projects/Cotton/architecture.png">
_프로젝트 요약도_

## **개발 환경 & 아키텍처**
- Infra: `Docker`
- Backend: `Python` `FastAPI`
- Database:`MySQL`
- Proxy: `Nginx`
- Open source: `Docker-py` `Code-server`
- Frontend: `React`

# 📜 **개발 방법**
---
## **Infra 구축**
- `Docker-compose` 환경 구성
  - frontend: 클라이언트가 접근할 `React` 기반 웹 페이지로, 포트 개방 요구
  - backend: 클라이언트가 웹에서 요청한 Request를 처리하는 `Python`의 `FastAPI` 기반 WAS
  - container: Backend와 연결된 Docker in docker 및 `Code-server` IDE 제공
  - database: 지원하는 앱 버전, 클라이언트가 생성한 회원/프로젝트/개발 컨테이너 정보 등을 관리

## **Backend**
- 프로젝트 템플릿 설계
- `Docker-py`를 통한 DinD 관리
- `PyMySQL` 기반 DAO 제작

## **Container**
- `Nginx` 기반 웹 서버 Proxy 설정
  - 각각의 IDE는 container 도커 내부에서 `Code-server`로 구성
  - Client의 권한으로 IDE에 접근하는게 아닌, Client가 Host에게 IDE를 호출하도록 유도
    - ex. `http://frontend/ide/{container_name}/` 로 접근 시, Host만 읽을 수 있는 `http://container/{container_name}` 페이지를 반환

## **웹 개발**
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
- WAS 설계 및 구현
  - `FastAPI`를 이용한 비즈니스 로직 제공
  - SSL로 `Docker`를 접근하기 위한 `Docker-py` 오픈소스 활용
- 데이터베이스 스키마 설계 및 구현
  - `MySQL` 기반 스키마 설계
  - `PyMySQL` 기반 DAO 제작
- WS Proxy 설정

# 💡 **개발 경험 및 후기**
---
## Docker-py
DInD(Docker in docker)를 `Docker-py`로 활용하기 위해 많은 시행착오를 거쳤다.  

DInD를 하기 위해 2가지 방법을 시도하였는데, 첫 번째는 **Docker:dind Image를 바로 이용**하는 것이었고, 두 번째는 **Ubuntu Image에 직접 Docker를 설치**하는 것이었다.

첫 번째 방법은, Docker hub에서 설명서를 읽었지만, 원활하게 통신이 되지 않았다.
TLS라는 것을 요구한다는 것까지 이해했는데, 이 점을 구체적으로 알지 못했다.
**현재는 SSL와 TLS는 HTTP와 HTTPS의 차이에 비유하여 이해하고 있다.**

하지만, IDE를 제공하기 위한 Proxy를 구축해야 했다.
따라서, FastAPI 통신을 추가하기 위해 두 번째 방법인 Ubuntu로 Docker를 제공하였다.

또한, 클라이언트가 컨테이너를 생성할 때, 원하는 컨테이너들을 `Docker-compose`로 제공하고자 하였으나, `Docker-py`는 `Docker-compose`를 지원하지 않았다.  
이러한 점이 많이 아쉬워 API 개발도 고려하였지만, 시간과 프로젝트의 본연을 고려해 Dockerfile을 작성하는 기능을 제작하여 하나의 이미지로 관리하는 것에 더욱 집중하였다.  

**API의 설명서를 통해서 많은 기능을 안정적으로 개발**할 수 있었다.
항상, 특히 이번 프로젝트에서 누구나 쉽게 사용할 수 있도록 **우수한 README를 작성**하고자 한 욕심이 있었는데, 이에 많은 동기 부여가 되었던 것 같다.

## React Proxy
Client가 Container의 IDE 페이지에 접근하기 위해서 포트포워딩을 진행하는 것이 아니라, `React`의 서버를 빌려 Proxy를 진행하였다.  
프록시 문제를 해결하기 위해 3가지 방법을 사용했다.

1. `Backend`가 직접 `Code-server`의 HTML 태그를 반환
2. `React`의 proxy를 진행
3. iframe 추가

`/code`를 `localhost:5000/`으로 프록시 설정을 하면, 당연히 `localhost:5000/` 인 루트 라우터로 요청하는 것으로 이해했다.  
결과적으로, 많은 시행착오를 거쳐 `localhost:5000/code`로 요청하는 것을 이해할 수 있었다.  
하지만 단순히 GET을 하거나, Redirect를 하면 `Code-server`의 Body를 불러오지 않는 현상이 있었다.  
최종적으로 Proxy에 iframe을 연결하여 성공적으로 IDE를 표출할 수 있었다.

확실히 별 다른 패스워드가 걸려있진 않지만, 사용자만 접근할 수 있다는 점에서 **보안이 강화**되었다고 생각하였고, **이론상 무한 개의 포트를 이용할 수 있도록 구현**할 수 있었다.  
비록 오래 걸리긴 했지만, **더욱 안정적인 시스템을 구축**하였다는 보람과 그 성취감은 이루 말할 수 없다.

## 프로젝트 템플릿
백엔드 개발을 깊이있게 다뤄본 적이 없어 이전에 수행했던 프로젝트에서 사용했던 `COCO-Annotator`를 참고했다.  
특히, utils, database등을 나누면서 \_\_init\_\_.py를 처음 사용해보았는데, 덕분에 mysql, docker client 연결을 한 번에 수행할 수 있었다.  

이미 docker-py의 import명이 'docker' 였고, docker API를 개발하면서 파일 이름을 어떤 것으로 할 지 매우 많은 고민을 하였다.  
개발만큼 힘든 것이 명명 규칙인 것 같다.

# 🔗 관련 링크
---
[Github Repo](https://github.com/juye-ops/cotton-candy)
