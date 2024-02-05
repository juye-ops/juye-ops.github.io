---
title: '[Kubernetes]설치'
author: juye-ops
date: 2023-04-18 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

## [Kubernetes Docs](https://kubernetes.io/docs/home/)
- Set up a K8s cluster의 [Install the kubeadm setup tool](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- `Installing kubeadm, kubelet and kubectl` 단계부터 설치

## Docker Runtime 설치
[cri-dockerd](https://github.com/Mirantis/cri-dockerd) 설치

```bash
git clone https://github.com/Mirantis/cri-dockerd.git
```

### 1. gcc, make 패키지 설치

```bash
sudo apt install gcc make
```

### 2. go@linux 설치
[go installation](https://go.dev/doc/install)

### 3. cri-docker 가이드에 따른 설치
[cri-docker 설치 가이드 섹션](https://github.com/Mirantis/cri-dockerd#advanced-setup)

```bash
# 최초에 출력하는 git safe directory 설정 커맨드 입력 후 재시도
cd cri-dockerd
make cri-dockerd
```

```bash
mkdir -p /usr/local/bin
install -o root -g root -m 0755 cri-dockerd /usr/local/bin/cri-dockerd
install packaging/systemd/* /etc/systemd/system
sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
systemctl daemon-reload
systemctl enable --now cri-docker.socket
```