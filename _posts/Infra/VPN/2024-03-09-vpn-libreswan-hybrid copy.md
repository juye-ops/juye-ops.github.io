---
title: 'AWS - VM 간에 Site-to-Site 연결'
author: juye-ops
date: 2024-03-04 00:00:00 +0900
categories: [Infra, VPN]
tags: ["VPN", "AWS", "Hyper-V", "Libreswan"]
render_with_liquid: false
---

# VPC
## VPC 생성
- 생성할 리소스: 'VPC만'
- 이름: VPC-Hybrid
- CIDR(수동입력): 172.32.0.0/16
- IPv6 CIDR 블록: 없음

## 서브넷 생성
- VPC ID: 'VPC-Hybrid' 선택
- 서브넷 이름: Private-SN-Hybrid
- 가용 영역: Default or 임의의 AZ 선택
- IPv4 VPC CIDR 블록: 기본값(172.32.0.0/16)
- IPv4 서브넷 CIDR 블록: 172.32.1.0/24

> VPC에 등록되는 네트워크는 172.32.\*.\* 대역을 모두 사용가능  
> 해당 서브넷에 등록하게 되면 172.32.1.\* 대역인 256개를 사용

## 인터넷 게이트웨이 생성
- 이름: IGW-Hybrid

### VPC에 연결
1. IGW-Hybrid 선택 후 작업 클릭
2. VPC에 연결: 'VPC-Hybrid' 선택

## Routing Table 생성
- 이름: RT-Hybrid
- VPC: 'VPC-Hybrid' 선택

### 라우팅 편집
1. RT-Hybrid 선택 후 하단 대시보드의 라우팅 편집 클릭
2. '라우팅 추가' 클릭
3. 대상1: 0.0.0.0/0
4. 대상2: 인터넷 게이트웨이 및 생성한 'IGW-Hybrid'의 ID 선택 후 저장

### 서브넷 연결
1. RT-Hybrid 선택 후 하단 대시보드의 '서브넷 연결' 클릭
2. '명시적 서브넷 연결'에서 서브넷 연결 편집 클릭
3. 172.32.1.0/24의 서브넷 체크 후 저장

## 최종 VPC 상태
1. VPC 페이지 진입
2. 'VPC-Hybrid' 클릭
3. 하단 대시보드의 리소스맵 클릭 후 아래와 비교

<img src="/static/img/Study/Infra/hybrid-vpc-resourcemap.png">
_최종 VPC 리소스맵_

# Site-to-Site VPN 설정
## 고객 게이트웨이 생성
VPN 연결 시 On-Premise가 AWS에 접근 할 게이트웨이
- 이름: CGW-Hybrid
- BGP ASN: 기본 값(65000)
- IP 주소: VPN과 연결 할 On-Premise 외부 아이피(https://ifconfig.me)
- 인증서 ARN: 선택 X

## 가상 프라이빗 게이트웨이 생성
VPN 연결 시 On-Premise와 연결 할 VPC의 가상 게이트웨이
- 이름: VGW-Hybrid
- ASN: Amazon 기본 ASN

### VGW 연결
1. 'VGW-Hybrid' 선택 후 작업 클릭
2. VPC에 연결 클릭
3. 'VPC-Hybrid' VPC 선택 후 연결

## Routing table에 VGW 전파
1. 라우팅 테이블 페이지 접속
2. 'RT-Hybrid' 선택 후 하단의 '라우팅 전파' 클릭
3. '라우팅 전파 편집' 클릭 후 vgw 활성화 체크 및 저장
4. 라우팅 테이블에 vgw(172.24.0.0/24) 추가 식별

## VPN 연결 생성
- 이름: VPN-Hybrid
- 대상 게이트웨이 유형: '가상 프라이빗 게이트웨이' 체크 후 'VGW-Hybrid' 선택
- 고객 게이트웨이: '기존' 선택 후 'CGW-Hybrid' 선택
- 라우팅 옵션: '정적' 선택
- 고정 IP 접두사: On-Premise의 내부 IP (192.168.0.0/24)
  - 주의: 추가를 위한 클릭 요구
- 나머지: 설정 X


# Site-to-Site 연결
실험은 192.168.0.2에서 진행한다고 가정

## VPN 구성 다운로드
1. AWS의 'VPN-Hybrid' 클릭
2. '구성 다운로드' 클릭 후 Openswan으로 다운로드

## (On-Premise) Libreswan 설치
On-Premise에 Libreswan을 설치해서 IPSec VPN 연결 시도
- 우분투에서 진행
- 다운로드 받은 구성의 순서대로 진행

### libreswan 설치

```bash
sudo apt install libreswan -y
```

## libreswan 설정

```bash
vi /etc/sysctl.conf

# 아래 행 추가
net.ipv4.ip_forward = 1
net.ipv4.conf.default.rp_filter = 0
net.ipv4.conf.default.accept_source_route = 0
```

```bash
sudo sysctl -p
```

## conf 및 secrets 파일 설정

```conf
# /etc/ipsec.d/aws.conf 생성
# 구성 파일에서 아래 conn 영역 복사
conn Tunnel1
	authby=secret
	auto=start
	left=%defaultroute
	leftid= #기본: On-Premise 외부 IP
	right= #기본: AWS VPN 터널 1
	type=tunnel
	ikelifetime=8h
	keylife=1h
  #### 영역 제거 ####
	# phase2alg=aes128-sha1;modp1024
	# ike=aes128-sha1;modp1024
	# auth=esp

	keyingtries=%forever
	keyexchange=ike
	leftsubnet= # On-Premise CIDR(192.168.0.0/24)
	rightsubnet= # AWS VPC CIDR(172.32.0.0/16 or 172.32.1.0/24)
	dpddelay=10
	dpdtimeout=30
	dpdaction=restart_by_peer

```

```conf
# /etc/ipsec.d/aws.secrets 생성
# 구성파일에서 아래 PSK 영역 복사
<기본: On-Premise 외부 IP> <기본: AWS VPN 터널 1 IP>: PSK "PSK KEY"
```

## libreswan restart
``` bash
# status에 loaded1, active1이 표시되면 성공
sudo ipsec restart
sudo ipsec verify
sudo ipsec status
```

## VPN 연결 확인
### Ping@On-Premise
```bash
# On-Premise 환경(192.168.0.2)에서 VPC 내부 인스턴스(172.32.1.171)로 ping
ping 172.32.1.171
```

### Ping@AWS-VPC
```bash
# VPC 내부 인스턴스(172.32.1.171)에서 On-Premise(192.168.0.2)로 ping
ping 192.168.0.2
```

# On-Premise의 서브넷 내에 다른 PC에서 VPN 이용
상황: A(192.168.0.2)와 172.32.1.171(VPC)가 IPSec VPN으로 연결돼 있을 때, B(192.168.0.3) PC가 해당 VPN을 이용하여 VPC 인스턴스와 통신
- B는 ipsec vpn 설정 및 설치 필요 없음

## 라우팅 테이블 관리
B에서 172.32.1.171로 접근할 때, A를 빌리는 라우팅 테이블 추가 작업 진행

```bash
# gw에 소속 게이트웨이가 아닌 A의 내부 IP를 작성하는 것에 유의

sudo route add -net 172.32.1.0/24 gw 192.168.0.2
```