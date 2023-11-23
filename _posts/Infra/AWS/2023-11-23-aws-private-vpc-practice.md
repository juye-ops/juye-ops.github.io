---
title: '[AWS]실습 - 프라이빗 서브넷 VPC 구성'
author: juye-ops
date: 2023-11-23 01:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*


<img src="/static/img/Study/Infra/aws-vpc_practice2.png">
_퍼블릭 및 프라이빗 서브넷 VPC 실습의 목표 구성도

본 실습은 [Public 서브넷 VPC 실습](/posts/aws-public-vpc-practice) 이후에 진행되었습니다.

# 프라이빗 서브넷
## 생성
서비스 > VPC > VPC > 서브넷 > 서브넷 생성
- VPC ID 입력
- 서브넷 이름: "test-Private-SN"
- 가용 영역: ap-northeast-2c
- IPv4 CIDR 블록: "10.0.1.0/24"

<img src="/static/img/Study/Infra/aws-private-subnet_architecture.png">
_프라이빗 서브넷 생성 도식화_

# NAT 게이트웨이
프라이빗 서브넷을 외부 인터넷 구간과 통신하게 해주는 역할이지만, 위치 상으로는 퍼블릭 서브넷에 배치
## 생성
서비스 > VPC > NAT 게이트웨이 > NAT 게이트웨이 생성
- 이름 태그: "test-NAT"
- 서브넷: 이전에 만들었던 ***Public Subnet*** 지정
- 연결유형: 퍼블릭
- 탄력적 IP 할당 ID: "탄력적 IP 할당" 클릭

<img src="/static/img/Study/Infra/aws-nat_architecture.png">
_NAT 생성 후 도식화_

# 프라이빗 라우팅
## 생성
서비스 > VPC > VPC > 라우팅 테이블
- 이름 태그: "test-Private-RT"
- VPC: 생성한 VPC 선택

## 서브넷 연결
1. 서브넷 연결 탭 진입
2. 명시적 서브넷 연결의 "서브넷 연결 편집" 클릭
3. 생성한 "test-Private-SN" Subnet 체크 후 연결 저장

<img src="/static/img/Study/Infra/aws-private-rt_architecture.png">
_라우팅 테이블 생성 후 도식화_

## 프라이빗 라우팅 테이블 경로 추가
외부 인터넷 통신을 위한 라우팅 경로가 없으므로, 모든 네트워크가 인터넷 게이트웨이로 향하는 라우팅 경로 추가
1. 라우팅 탭 진입
2. "라우팅 편집" 클릭
3. "라우팅 추가" 클릭
   - 대상 1: "0.0.0.0/0"
   - 대상 2: "NAT 게이트웨이" 선택 후 생성한 NAT ID 선택

<img src="/static/img/Study/Infra/aws-private-rt-add_architecture.png">
_라우팅 테이블 인터넷 경로 추가 후 도식화_

# 검증
## EC2 인스턴스 생성
- 이름 및 태그: "Private-EC2"
- AMI: AmazonLinux 2 AMI (HVM), SSD Volume Type
- 인스턴스 유형: t2.micro
- 키 페어 입력
- 네트워크
  - VPC: 생성한 "VPC-test"
  - 서브넷: 생성한 "test-SN"
  - 나머지: 기본 값
- 스토리지 구성: 기본 값
- 고급 세부정보
  - 사용자 데이터 아래 text 입력

```
#!/bin/bash
(
echo "qwe123"
echo "qwe123"
) | passwd --stdin root
sed -i "s/^PasswordAuthentication no/PasswordAuthentication yes/g" /etc/ssh/sshd_config
sed -i "s/^#PermitRootLogin yes/PermitRootLogin yes/g" /etc/ssh/sshd_config
service sshd restart
```

## 검증
Public IP 주소 대신 Private IP 주소만 보유
- Public-EC2로 진입하여 Private-EC2와 통신 (pw: qwe123)

```
$ ssh root@10.0.1.205
The authenticity of host '10.0.1.205 (10.0.1.205)' can't be established.
ECDSA key fingerprint is SHA256:b9e5UowHwmMSNtEwp0W0YPRANnOqotu6G1+lvLaoqDM.
ECDSA key fingerprint is MD5:e3:c2:02:0d:23:46:ed:3d:e3:8e:96:4d:81:4c:7a:64.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.0.1.205' (ECDSA) to the list of known hosts.
root@10.0.1.205's password: 

...

# ping google.com
PING google.com (142.250.206.206) 56(84) bytes of data.
64 bytes from kix07s07-in-f14.1e100.net (142.250.206.206): icmp_seq=1 ttl=103 time=18.3 ms
```

<img src="/static/img/Study/Infra/aws-private-instance_architecture.png">
_인스턴스 생성 도식화_


# 퍼블릭과 프라이빗 서브넷 통신 흐름의 차이
## 퍼블릭 서브넷 통신 흐름
1. 퍼블릭 서브넷의 퍼블릭 EC2 인스턴스가 외부 인터넷 구간과 통신하기 위해 데이터를 가상 라우터로 전달
2. 가상 라우터는 퍼블릭 라우팅 테이블을 참고하여 인터넷 게이트웨이로 향하는 ㄱ라우팅 경로를 확인
3. 가상 라우터는 인터넷 게이트웨이로 데이터를 전달하고 인터넷 구간으로 전달
4. 인터넷 구간을 통해 최종적으로 사용자에게 전달

<img src="/static/img/Study/Infra/aws-public-subnet_flow.png">
_퍼블릭 서브넷에서 외부 인터넷 구간과 통신 흐름_

## 프라이빗 서브넷 통신 흐름
1. 프라이빗 서브넷의 프라이빗 EC2 인스턴스가 외부 인터넷 구간과 통신하기 위해 데이터를 가상 라우터로 전달
2. 가상 라우터는 프라이빗 라우팅 테이블을 참고하여 NAT 게이트웨이로 향하는 라우팅 경로를 확인
3. 가상 라우터는 NAT 게이트웨이로 데이터를 전달하고, NAT 게이트웨이에서 프라이빗 IP를 퍼블릭 IP로 전환
4. NAT 게이트웨이에서 인터넷 구간을 넘어가기 위해 인터넷 게이트웨이를 거쳐 사용자에게 전달(사용자는 퍼블릭 IP로 수신)

<img src="/static/img/Study/Infra/aws-private-subnet_flow.png">
_프라이빗 서브넷에서 외부 인터넷 구간과 통신 흐름_

## 요약

|출발지|목적지|통신 여부|
|:-:|:-:|:-:|
|퍼블릭 서브넷|외부 인터넷|가능|
|외부 인터넷|퍼블릭 인터넷|가능|
|프라이빗 서브넷|외부 인터넷|가능|
|외부 인터넷|프라이빗 서브넷|불가능|