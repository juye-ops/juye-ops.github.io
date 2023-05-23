---
title: '[Kubernetes] Kube Proxy'
author: juye-ops
date: 2023-05-22 01:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---

# Kube Proxy
Cluster IP 접근 시 노드로 접근하도록 유도
- Kubernetes Service의 backend 구현
- endpoint 연결을 위한 iptables 구성
- nodePort로의 접근과 Pod 연결을 구현

## kube-proxy mode
- userspace
  - 클라이언트의 서비스 요청을 iptables를 거쳐 kube-proxy가 받아서 연결
- iptables
  - 현재 default kubernetes network mode
  - kube-proxy는 service API 요청 시 iptables rule이 생성
  - 클라이언트 연결은 kube-proxy가 받아서 iptables 룰을 통해 연결
- IPVS
  - 리눅스 커널이 지원하는 L4 로드밸런싱 기술을 이용
  - 별도의 ipvs 지원 모듈을 설정한 후 적용 가능
  - 지원 알고리즘
    - rr(roud-robin)
    - lc(least connection)
    - dh(destination hashing)
    - sh(source hashing)
    - sed(shortest expected delay)
    - nc(never queue)