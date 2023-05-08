---
title: '[Kubernetes] 아키텍처'
author: juye-ops
date: 2023-04-19 00:00:00 +0900
categories: [Infra, Kubernetes]
tags: [K8S]
render_with_liquid: false
---
# Components
- 마스터 컴포넌트
  - etcd: 워커 노드들에 대한 상태 정보를 key-value 타입으로 저장
    - HW 리소스
    - Container 동작 상태
    - 다운로드 받은 Image 종류
  - kube-apiserver: k8s API를 사용하도록 요청받고, 요청이 유효한지 검사
  - kube-scheduler: Pod를 실행 할 노드 선택
  - kube-controller-manager: Pod를 관찰하며 개수를 보장
- 워커 노드 컴포넌트
  - kubelet: 모든 노드에서 실행되는 k8s 에이전트로, 데몬 형태로 동작
    - cAdvisor: 설정 초기에 등록되는 컨테이너 모니터링 툴
  - kube-proxy: k8s의 network 동작을 관리하며, iptables rule을 구성
  - 컨테이너 런타임: 컨테이너를 실행하는 엔진
    - docker, containerd, runc 등
 
# Architecture
1. 쿠버네티스 명령어를 통해 Control plane에 요청
   - image를 지정하여 kubectl 명령어 생성
2. Control Plane은 API 서버를 통해 kubectl 요청을 수신
   - API가 요청이 유효(문법, 권한 등)한지 검토
2. etcd의 정보를 바탕으로 Scheduler에게 워커 노드 선별 요청
3. Scheduler에서 선정된 워커 노드에 접속
4. 해당 워커 노드의 kubelet이 Docker에 컨테이너 생성 요청
5. Docker는 Image hub에서 Image를 받아온 후 동작
6. Controller는 죽은 워커 노드를 식별하여 Control plane API에 재 요청