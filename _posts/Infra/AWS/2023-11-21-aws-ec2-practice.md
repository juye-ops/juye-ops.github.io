---
title: '[AWS]EC2 인스턴스 실습'
author: juye-ops
date: 2023-11-21 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# 인스턴스 생성
"인스턴스 시작" 버튼을 통한 생성

## 이름 및 태그
인스턴스 이름 지정
- 작성한 이름은 곧 ("Name", 이름)의 형태로 태그가 저장

## AMI(Amazon Machine Image) 선택
실습을 위한 "프리 티어 사용 가능" 이미지 선택

## 인스턴스 유형
실습을 위한 "프리 티어 사용 가능"의 t2.micro 선택
- vCPU: 1
- Memory: 1GiB

## 키 페어
인스턴스 연결을 위한 액세스 키
- 사전 생성 혹은 "새 키 페어 생성"을 통한 키 페어 지정
- Putty 접근 시 ppk 파일로, 외의 SSH는 pem 파일로 생성

## 네트워크 설정
방화벽(보안 그룹)을 통한 네트워크 접근 제어
- Allow SSH trafic from: SSH 접근 위치 지정
- HTTPS 및 HTTP 트래픽 허용: 모든 IP에 대한 접근 허용 여부

## 스토리지 구성
디스크 용량 구성


# 인스턴스 정보
인스턴스 대시보드를 통해 생성된 인스턴스에 대한 정보 식별 가능
- 퍼블릭 IPv4 DNS
- 퍼블릭 IPv4

<img src="/static/img/Study/Infra/aws-ec2_dashboard.png">

# Putty 접근
[키 페어](#키-페어) 생성 당시 pem키로 만든 후 Putty로 접근
1. PuttyGen를 통해 private키로 변환
   - Load 후 Private key로 저장
2. Putty 접근 시 ppk 파일 연결
   - 좌측 카테고리에서 Connection>SSH>Auth>Credentials 접근
   - "Private key file for authentication"에 해당 ppk 파일 연결
   - Session에 IPv4 연결 후 실행
3. 사용자 이름
   - "ec2-user"로 접속

# 웹 서비스 설치
## 웹 페이지 생성
```bash
[ec2-user@ip-172-31-32-79 ~]$ sudo su

[root@ip-172-31-32-79 ec2-user]# yum install httpd -y

[root@ip-172-31-32-79 ec2-user]# systemctl start httpd

[root@ip-172-31-32-79 ec2-user]# echo "<h1>Test Web Server</h1>" > /var/www/html/index.html

[root@ip-172-31-32-79 ec2-user]# curl localhost
<h1>Test Web Server</h1>
```

## 웹 페이지 접근
퍼블릭 IPv4 및 DNS를 통해 접속