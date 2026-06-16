---
index: 1
title: "Kubernetes 멀티 클러스터 관리 시스템"
organization: "연구소 GPU 워크로드 팀"
due: "2025.03 ~ 2026.01"
description: "3개 클러스터를 아크로스 클러스터 관리를 위해 Istio + ArgoCD를 도입하여 배포/모니터링을 통합한 시스템 구축"
skills: [Kubernetes, React, Spring, ArgoCD, Istio]
images: 
  - "/images/portfolio/k8s-cluster-1.png"
  - "/images/portfolio/k8s-cluster-2.png"
  - "/images/portfolio/k8s-cluster-3.png"
---

## 프로젝트 개요

Kubernetes 3개 클러스터(각각 50노드 규모)의 GPU 워크로드 관리를 위해 다음과 같은 솔루션 도입:

### 도입 기술 스택
- **Istio Service Mesh**: 멀티 클러스터 트래픽 관리
- **ArgoCD**: GitOps 기반 배포 자동화
- **Prometheus + Grafana**: 중앙화된 모니터링
- **Helm Chart**: 표준화된 배포 패키징

## 주요 성과
- 배포 시간 70% 단축 (수동 → GitOps)
- 클러스터 간 서비스 디스커버리 자동화
- 중앙 대시보드에서 모든 클러스터 실시간 모니터링 가능
