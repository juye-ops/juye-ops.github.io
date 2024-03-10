---
title: 'AWS - VM 간에 OpenVPN 연결'
author: juye-ops
date: 2024-03-04 00:00:00 +0900
categories: [Infra, VPN]
tags: ["VPN", "AWS", "Hyper-V"]
render_with_liquid: false
---

VPN은 기본적으로 Server-client 형태로 운영된다.
두 대의 컴퓨터가 있으면 한 대는 Server, 나머지 한 대는 Client인 것이다.

# VPN Server (AWS-Ubuntu)
- 서버 단에서는 아래의 오픈소스를 통해서 받을 것이다.
  - [OpenVPN Install](https://github.com/Nyr/openvpn-install)

```bash
curl -O https://raw.githubusercontent.com/Nyr/openvpn-install/master/openvpn-install.sh

sudo bash openvpn-install.sh
```

아래의 옵션을 입력하고 생긴 파일을 복사

1. (if) 사용할 내부 아이피 선택
2. (if) IPv4 address/hostname: 외부 아이피 입력
3. Protocol: UDP 선택
4. Port: 기본 1194
5. DNS Server: 1) Current system resolvers
6. first client name: 관리할 첫 conf 파일의 이름
7. IP address: 외부 아이피 입력
   1. curl ifconfig.me
   2. AWS인 경우 EIP 입력

# VPN Client (Hyper-v)
클라이언트에서는 apt로 openvpn 설치

```bash
sudo apt install openvpn
```

서버에서 생성한 ovpn 파일 복사 및 아래 내용 추가
- 아래 내용을 입력해서 클라이언트도 외부 인터넷 접속을 허용
```
push "route 10.8.0.0 255.255.255.0"
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"
```

```bash
sudo openvpn --config client.ovpn
```