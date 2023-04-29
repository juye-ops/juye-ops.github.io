---
title: 'Cotton candy (진행 중)'
author: juye-ops
date: 2022-04-24 10:00:00 +0900
categories: ['Retrospection', 'Projects']
tags: ['Cloud', 'Docker', 'Kubernetes']
render_with_liquid: false
---

# 📘 상세 설명
---
## 프로젝트 소개
Cotton candy(솜사탕): 모두가 같은 구름을 본다는 뜻의 클라우드와 같이 나만의 클라우드를 솜사탕으로 표현하여 명명

Host PC를 Private CSP로 지정하여 웹 기반 클라우드 개발 환경(IDE)을 구축합니다.  
클라이언트는 Host의 IP 혹은 도메인을 바탕으로 외부에서 접근한 후, IaaS, PaaS 컨테이너를 생성하여 개발을 진행할 수 있습니다.  
나아가, Host PC를 Control plane으로 지정하여 쿠버네티스 환경을 구축하거나 모니터링 기능도 제공합니다.

## 개발 동기
- 컨테이너 학습
  - Docker, Kubernetes를 이용한 클라우드 IDE 제공
  - 컨테이너 내부 네트워크 및 보안 구축
- 웹 기반 클라우드 서비스 제공
  - 웹 기반 GUI를 통한 Easy to use 개발 환경 구축
  - 대다수가 익숙한 Visual sutdio code의 웹 IDE인 Code-server로 IDE를 제공

## 연구 방법

<img src="/static/img/Projects/Cotton_architecture.png">
_프로젝트 요약도_

- Docker-compose 환경 구성
  - frontend: 클라이언트가 접근할 React 기반 웹 페이지로, 포트 개방 요구
  - backend: 클라이언트가 웹에서 요청한 Request를 처리하는 Python의 FastAPI 기반 WAS
  - docker: Backend와 연결된 SSL 기반 Docker in docker
- Frontend Proxy 설정

### Host
- Docker 환경
  1. `Docker compose up`
     - 클라이언트가 이용할 ID, Password를 인자로 입력

- Kubernetes 환경
  1. Host PC에 Kubernetes 설치
  2. Control plane 설정

### Client
- Container 관리
  1. Host에서 입력한 ID, Password로 로그인
  2. 컨테이너 생성 및 환경 구성
  3. 생성된 컨테이너에 접근
- Worker node 추가 및 관리
  1. Node에서 Control plane에 연결


# 👪 역할 및 개발 내용
---
- 인프라 설계 및 구축
- Frontend -> Backend 요청 시 Proxy 설정

# 💡 개발 경험 및 후기
---
## React Proxy
Client가 Container의 IDE 페이지에 접근하기 위해서 포트포워딩을 진행하는 것이 아니라, React의 서버를 빌려 Proxy를 진행하였다.  
이를 해결하기 위해 매우 많은 시간을 소요하였다.  
프록시 문제를 해결하기 위해 3가지 방법을 사용했다.

1. Backend가 직접 Code-server의 HTML 태그를 반환
2. Rreact의 proxy를 진행
3. iframe 추가

`/code`를 `localhost:5000/`으로 프록시 설정을 하면, 당연히 `localhost:5000/` 인 루트 라우터로 요청하는 것으로 이해했다.  
결과적으로, 많은 시행착오를 거쳐 `localhost:5000/code`로 요청하는 것을 이해할 수 있었다.  
하지만 단순히 GET을 하거나, Redirect를 하면 Code-server의 Body를 불러오지 않는 현상이 있었다.  
최종적으로 Proxy에 iframe을 연결하여 성공적으로 IDE를 표출할 수 있었다.

확실히 별 다른 패스워드가 걸려있진 않지만, 사용자만 접근할 수 있다는 점에서 보안이 강화되었다고 생각하였고, 이론상 무한 개의 포트를 이용할 수 있도록 구현하였다.  
비록 오래 걸리긴 했지만, 더욱 안정적인 시스템을 구축하였다는 보람과 그 성취감은 이루 말할 수 없다.

# 🔗 관련 링크
---