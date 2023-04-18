---
title: '[Kubernetes] 환경 구성'
author: juye-ops
date: 2023-04-18 00:00:00 +0900
categories: [Development, Container]
tags: [Docker, Installation]
render_with_liquid: false
---

[Kubernetes docs: Creating a cluster with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)

- 전처리
  - Swap Disable (필수)
    ```bash
    su
    swapoff -a && sed -i '/swap/s/^/#/' /etc/fstab
    exit
    ```


# Control Plane(Master Node) 설정
## 런타임 설정: 도커 엔진
- [cri-dockerd](https://github.com/Mirantis/cri-dockerd) 설치

```bash
# Default: Containerd 런타임
sudo kubeadm init

# 도커엔진 런타임
sudo kubeadm init --cri-socket /var/run/cri-dockerd.sock
```

<img src="/static/img/Kube/init.png">

- 하단의 Token 및 CertKey 저장
```bash
cat > token.txt
  ...
  ^C
```

- 상단의 regular user의 명령어 실행
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

- kubectl을 통해 nodes 확인
  - Status: NotReady 식별 -> CNI 설정
```bash
kubectl get nodes
```

<img src="/static/img/Kube/get-nodes.png">

## Container Network Interface(CNI) 설정
### [WeaveNet](https://www.weave.works/)
```bash
kubectl apply -f https://github.com/weaveworks/weave/releases/download/v2.8.1/weave-daemonset-k8s.yaml
```

- Status Ready로 변경 식별
```bash
kubectl get nodes
```


# Worker Node 설정
- Master node의 token.txt를 통해 토큰 및 certkey추출

```bash
# Default: Containerd 런타임
kubeadm join [ip:6443] --token [token]\
  --discovery-token-ca-cert-bash sha256:[hash]

# 도커엔진 런타임
kubeadm join [ip:6443] --token [token]\
  --discovery-token-ca-cert-bash sha256:[hash]  
```

# 완료 확인
- Get Nodes 시 Status: Ready 및 환경 설정이 제대로 이루어졌는지 확인

```bash
kubectl get nodes -o wide
```