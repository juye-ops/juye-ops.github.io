---
title: '[IP Masquerade]Gateway 서버 구축'
author: juye-ops
date: 2024-03-12 00:00:00 +0900
categories: [Infra, Network]
tags: ["VPN", "AWS", "Hyper-V", "Libreswan"]
render_with_liquid: false
---

[[CentOS 7] firewalld 설정을 통해 서버를 게이트웨이로 사용하기](https://bitgadak.tistory.com/2)


내부 네트워크(172.24.0.0/24)에서 172.24.0.1이 게이트웨이 뿐만 아니라 VPN 등 네트워크를 전적으로 관리하는 네트워크 장비를 구축

# 구성
## 윈도우
윈도우에서 내부 네트워크(172.24.0.0/24)를 한 개 생성해서 172.24.0.254의 IP를 저장
- 네트워크를 생성하면 VM 내부와 공유
- 172.24.0.1은 게이트웨이 VM 서버가 사용(중복 X)

## Gateway 서버
- 두 개의 NIC(랜카드) 장착
  - 외부와 연결된 네트워크(192.168.0.0/24)
  - 생성한 내부 네트워크(고정 아이피: 172.24.0.1)
- 가벼운 운영체제(CentOS) 이용
- 낮은 사양으로 구축
  - RAM: 1GB
  - CPU: 2Core
  - HDD: 8GB

## 내부 네트워크 현황

|VM|네트워크|게이트웨이|
|:-:|:-:|:-:|
|centos-gateway|172.24.0.1|-|
|ubuntu-main|172.24.0.2|172.24.0.1|
|ubuntu-sub1|172.24.0.3|172.24.0.1|

# IP Masquerade
내부 네트워크(Ex. 172.24.0.x)에서 들어오는 IP를 다른 네트워크(192.168.0.x)로 가면을 씌워서 처리
- 공인 IP 및 무작위 포트 번호를 통해 통신을 지원


## 네트워크 확인
- eth0: (외부)192.168.0.x/24
- eth1: (내부)172.24.0.x/24

## Masquerade(방화벽) 설정
### Firewalld 확인

```bash
firewall-cmd --get-active-zone

# public
#   interfaces: eth0 eth1
```

### Firewalld 수정
eth1의 데이터를 eth0으로 보내는 Masquerade 설정

```bash
sudo firewall-cmd --permanent --zone=external --change-interface=eth1
# The interface is under control of NetworkManager, setting zone to 'external'.
# success
```

```bash
firewall-cmd --get-active-zone
# external
#   interfaces: eth0
# public
#   interfaces: eth1
```

### 내부 네트워크 확인
ubuntu-main(172.24.0.2)에서 게이트웨이 동작 확인

```bash
curl https://www.example.com
# <html>
# <head>
#     (...)
```