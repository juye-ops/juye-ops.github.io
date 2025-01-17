---
title: '[Infra]RestAPI'
author: juye-ops
date: 2023-01-11 10:00:00 +0900
categories: ['Infra', '_Infra']
tags: ['Infra', 'RestAPI', 'Backend']
render_with_liquid: false
---

---
# 서버
## 모놀리식 아키텍처(Monolithic Architecture)
하나의 큰 서버로서, 모든 기능을 모두 하나에서 처리하는 경우에 사용

## 마이크로서비스 아키텍처(Microservice Architecture; MSA)
각각의 기능을 개별 서버로 구성하여 통신하도록 하는 경우에 사용

---
# RestAPI(Representational State Transfer)
정보를 주고 받을 때 널리 사용되는 형식

## Rest API
- 각 요청이 어떤 동작이나 정보를 위한 것을 요청 모습 자체로 추론하는 통신 방법
- 기본적인 데이터 처리(CRUD) 제공
- Resource, Method, Representation of Resource로 구성
- 클라이언트: 요청을 하는 플랫폼으로써 브라우저 같은 웹, 앱 등

## URI/URL
### URI(Uniform Resource Identifier)
인터넷 상의 자원을 식별하기 위한 문자열의 구성

### URL(Uniform Resource Locator)
인터넷 상 자원의 위치로써 URI의 하위 개념

## HTTP
- 정보를 주고 받을 때 지켜야 하는 통신 프로토콜

### HTTP Method
- GET: 정보를 요청하기 위해 사용(Read)
- POST: 정보를 입력하기 위해 사용(Create)
- PUT: 정보를 업데이트하기 위해 사용(Update)
- PATCH: 정보를 업데이트하기 위해 사용(Update)
- Delete: 정보를 삭제하기 위해 사용(Delete)

### Get vs Post

|처리방식|GET|POST|
|:-:|:-:|:-:|
|**URL에 데이터 노출 여부**|O|X|
|**URL 예시**|http://localhost:8080/login?id=kjyeops|http://localhost:8080/login|
|**데이터의 위치**|Header|Body|
|**캐싱 가능 여부**|O|X|

### Header, Body
HTTP 통신은 Request/Response 시 정보를 패킷에 저장하며, 해당 패킷의 구조가 Header/Body로 구성
- Header: 보내는 주소, 받는 주소, 시간
- Body: 실제 전달하려는 내용

### Status code
클라이언트 요청에 따른 서버의 반응
- 1xx(정보): 요청을 받았고, 프로세스를 계속 진행
- 2xx(성공): 요청을 성공적으로 받고 실행
- 3xx(Redirection): 요청 완료를 위한 추가 작업 요구
- 4xx(클라이언트 오류): 요청 문법 등의 문제로 인해 요청 처리 불가
- 5xx(서버 오류) 서버가 요청에 대해 실패

### 동기 vs 비동기(Sync vs ASync)
- 동기: 서버에서 요청을 보냈을 때, 응답이 돌아온 뒤 다음 동작 수행
  - A작업이 완료되기 까지 B 작업은 대기
  - 프린터나 Line-by-Line 코드와 비슷한 맥락
- 비동기: 요청을 보낼 때 응답 상태와 상관없이 다음 동작을 수행
  - A작업과 B작업을 동시에 수행

## IP(Internet Protocol)
네트워크에 연결된 특정 PC의 주소를 나타내는 체계
- IPv4: 8비트의 이진수를 4자리로 구성한 IP 주소 체계
  - 각 자리마다 0~255로 표현하며, 2^32 = 43억 개의 표현 가능
  - 개인 PC 보급으로 누구나 PC를 사용해 IPv4로 할당할 수 있는 한계점을 보완하기 위한 IPv6 구성
- localhost(127.0.0.1): 현재 사용 중인 Local PC
- 0.0.0.0, 255.255.255.255: broadcast adress로써 로컬 네트워크에 접속된 모든 장치와 소통하는 주소

### Port
- PC에 접속할 수 있는 통로
- 사용 중인 포트 중복 불가
- 범위: 0 ~ 65535
- 통신 규약: 0 ~ 1024
  - SSH: 22
  - HTTP: 80
  - HTTPS: 443

# Router Parameter
## Path Parameter
```/user/402```
- 라우터에 직접 변수를 적용하는 방법
- ```402```의 유저가 없는 경우 404 Error code 반환
- 주로 Resource를 식별해야 하는 경우 사용

## Query Parameter(Query string)
```/users?id=402```
- API 뒤에 입력 데이터를 함께 제공하는 방식으로 사용
- Query string은 ```?Key=Value``` 쌍으로 이루어지며 &를 이용해 여러 데이터를 전달 가능
  - ```https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=fastapi```
- ```402```의 유저가 없는 경우 빈 리스트가 나오며, 추가로 Error handling 요구
- 주로 데이터 정렬이나 필터링 시 적용