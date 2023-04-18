---
title: '[K8S] 쿠버네티스 기초'
author: juye-ops
date: 2023-01-24 10:00:00 +0900
categories: [Infra, Kubernetes]
tags: ['K8S']
render_with_liquid: false
---

# 컨테이너
## Scale Up/Out
- Scale Up
  - 수직적 계층에 따른 App 확장
  - 실제 OS 내부에 가상환경 OS를 구성하는 작업 등
- Scale out
  - 수평적 계층에 따른 App 확장
  - 서버 트래픽을 고려하여 같은 서버를 여러 개 실행하는 작업 등

## 가상머신 vs 컨테이너
### 가상머신
App들에 각각 컴퓨팅 환경을 부여
- Host에서 Hypervisor 이용
   - 가상머신 환경 구성에 최적화
- 높은 비용
  - 100MB의 app을 실행하더라도 OS를 제공

### 컨테이너
App들을 각각 컨테이너로 관리하여 제공
- Host OS + Docker
- 낮은 비용
  - 소스코드와 베이스 환경만 구성돼있으므로, App 자체의 용량만 차지
- 주 목적: 배포

## 멀티호스트 도커 플랫폼
시스템 한 개에 여러 개의 도커를 구성
- 다수의 도커에 같은 서버를 수행하여 확장
  - 하나의 도커가 다운 되더라도 다른 도커가 여전히 운영 중
  - 엔지니어가 컨테이너를 모두 관리하는 데에 높은 비용 요구

## 컨테이너 오케스트레이션
Control plane의 지휘에 따른 Node Docker를 구성
- 다양한 도커(Node)를 관리하기 위한 방법
- Control plane이 App을 Node에 분산하는 최적화된 방법을 도출
- 한쪽 Node에서 수행되는 App이 다운되면 타 Node로 옮기는 등의 자동화 제공

# K8S[K 8자(ubernete) S]
## K8S 특징
- 워크로드 분리
  - 워크로드: Node(Container)
- 전이에 용이
  - 온프레미스의 환경을 퍼블릭클라우드(AKS, EKS, GKE 등)로 전이하기에 용이
- 선언적 API 제공
  - ex. 웹 서버 3개 실행을 요청하면 Node에 분배는 Control plane이 처리
  - 특정 노드가 다운되더라도 선언문에 따라 다른 노드에 재배치

## CNI(Container Network Interface)
컨테이너간의 통신을 위한 네트워크 인터페이스
- Container 간 통신을 지원하는 VxLAN. Pod Network라고도 부름
- 다양한 종류의 플로그인이 존재
- 필수적 요소

## 쿠버네티스 클러스터 구성
- Control plane(Master Node)
  - 워커 노드들의 상태를 관리하고 제어
  - Single master
  - Multi master(3, 5개의 Master nodes)
- Worker node
  - 도커 플랫폼을 통해 컨테이너를 동작하며 실제 서비스 제공

<!-- # keywords

<table>
  <th>
    <td>용어</td>
    <td>설명</td>
  </th>
  <tr>
    <td></td>
    <td></td>
  </tr>
</table> -->