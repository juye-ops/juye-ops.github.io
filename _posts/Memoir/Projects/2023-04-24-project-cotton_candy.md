---
title: 'Cotton Candy (진행 중)'
author: juye-ops
date: 2023-04-24 10:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['Cloud', 'Docker', 'Kubernetes']
render_with_liquid: false
---

# 📘 상세 설명
---
## 프로젝트 소개
- ***Cloud**: 모두가 같은 구름을 본다는 의미에서 명명*
- ***Cotton candy(솜사탕)**: 자신에게 구름(클라우드)처럼 보이는 솜사탕을 의미*

Host PC를 Private CSP로 지정하여 웹 기반 클라우드 개발 환경(IDE)을 구축합니다.  
클라이언트는 Host의 IP 혹은 도메인을 바탕으로 외부에서 접근한 후, IaaS, PaaS 컨테이너를 생성하여 개발을 진행할 수 있습니다.  
나아가, Host PC를 Control plane으로 지정하여 쿠버네티스 환경을 구축하거나 모니터링 기능도 제공합니다.

## 개발 동기
- 컨테이너 학습
  - `Docker`, `Kubernetes`를 이용한 클라우드 IDE 제공
  - 컨테이너 내부 네트워크 및 보안 구축
- 웹 기반 클라우드 서비스 제공
  - 웹 기반 GUI를 통한 Easy to use 개발 환경 구축
  - 대다수가 익숙한 Visual sutdio code의 웹 IDE인 `Code-server`로 IDE를 제공

## 연구 방법

<img src="/static/img/Projects/Cotton_architecture.png">
_프로젝트 요약도_

- `Docker-compose` 환경 구성
  - frontend: 클라이언트가 접근할 `React` 기반 웹 페이지로, 포트 개방 요구
  - backend: 클라이언트가 웹에서 요청한 Request를 처리하는 `Python`의 `FastAPI` 기반 WAS
  - docker: Backend와 연결된 SSL 기반 Docker in docker
- 웹 서버 Proxy 설정

### Host
- `Docker` 환경
  1. `docker compose up`
     - 클라이언트가 이용할 ID, Password를 인자로 입력

- `Kubernetes` 환경
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
- 팀장
  - 아이디어 고안
  - Github Repo 관리 및 운용
- 인프라 설계 및 구축
  - `Docker` & `Kubernetes` 기반 템플릿 작성
- WAS 설계 및 구현
  - `FastAPI`를 이용한 비즈니스 로직 제공
  - SSL로 `Docker`를 접근하기 위한 `Docker-py` 오픈소스 활용
- WS Proxy 설정

# 💡 개발 경험 및 후기
---
## Docker-py
DInD(Docker in docker)를 `Docker-py`로 활용하기 위해 많은 시행착오를 거쳤다.  

DInD를 하기 위해 2가지 방법을 시도하였는데, 첫 번째는 **Ubuntu Image에 직접 Docker를 설치**하는 것이고, 두 번째는 **Docker Image를 바로 이용**하는 것이었다.

첫 번째 방법의 경우, 설치까지는 이상이 없으나, systemctl 명령어를 직접 이용할 수 없는 한계가 있었다.
이 점을 해결하기 위해 Host의 systemctl 파일을 복사하는 방법이 있었지만, 프로젝트에서 Host의 어떤 권한도 요구하지 않고 구현하고 싶었다.  
따라서 두 번째 방법을 채택하였다.  
두 번째 방법은, 이미지를 실행하면 바로 통신을 대기하고 있었다.
Docker hub에서 설명서를 읽었지만, 원활하게 통신이 되지 않았다.
설명서를 꼼꼼이 읽어 TLS라는 것을 요구한다는 것까지 이해했는데, 이 점을 구체적으로 알지 못했다.
TLS라는 키워드를 알지 못해 `Docker-py`의 설명서에서 TLS라는 개념을 적용할 생각조차 못했다.  
**현재는 SSL와 TLS는 HTTP와 HTTPS의 차이에 비유하여 이해하고 있다.**  
추후 TLS가 보안 키를 요구한다는 것을 이해하였지만, 설명서에 지쳐 `Docker-py`에서 TLS를 찾을 생각을 못했던 것 같다.
따라서, Docker image에서 SSL 설정법을 찾았고, 이를 적용하게 되었다.

또한, 클라이언트가 컨테이너를 생성할 때, 원하는 컨테이너들을 `Docker-compose`로 제공하고자 하였으나, `Docker-py`는 `Docker-compose`를 지원하지 않았다.  
이러한 점이 많이 아쉬워 API 개발도 고려하였지만, 시간과 프로젝트의 본연을 고려해 Dockerfile을 작성하는 기능을 제작하여 하나의 이미지로 관리하는 것에 더욱 집중하였다.

**API의 설명서를 통해서 많은 기능을 안정적으로 개발**할 수 있었다.
항상, 특히 이번 프로젝트에서 누구나 쉽게 사용할 수 있도록 **우수한 README를 작성**하고자 한 욕심이 있었는데, 이에 많은 동기 부여가 되었던 것 같다.



## React Proxy
Client가 Container의 IDE 페이지에 접근하기 위해서 포트포워딩을 진행하는 것이 아니라, `React`의 서버를 빌려 Proxy를 진행하였다.  
이를 해결하기 위해 매우 많은 시간을 소요하였다.  
프록시 문제를 해결하기 위해 3가지 방법을 사용했다.

1. `Backend`가 직접 `Code-server`의 HTML 태그를 반환
2. `React`의 proxy를 진행
3. iframe 추가

`/code`를 `localhost:5000/`으로 프록시 설정을 하면, 당연히 `localhost:5000/` 인 루트 라우터로 요청하는 것으로 이해했다.  
결과적으로, 많은 시행착오를 거쳐 `localhost:5000/code`로 요청하는 것을 이해할 수 있었다.  
하지만 단순히 GET을 하거나, Redirect를 하면 `Code-server`의 Body를 불러오지 않는 현상이 있었다.  
최종적으로 Proxy에 iframe을 연결하여 성공적으로 IDE를 표출할 수 있었다.

확실히 별 다른 패스워드가 걸려있진 않지만, 사용자만 접근할 수 있다는 점에서 **보안이 강화**되었다고 생각하였고, **이론상 무한 개의 포트를 이용할 수 있도록 구현**하였다.  
비록 오래 걸리긴 했지만, **더욱 안정적인 시스템을 구축**하였다는 보람과 그 성취감은 이루 말할 수 없다.

# 🔗 관련 링크
[Github Repo (Private)](https://github.com/juye-ops/cotton-candy)

---