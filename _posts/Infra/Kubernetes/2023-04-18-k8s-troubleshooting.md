---
title: '[Kubernetes]Trouble Shooting'
author: juye-ops
date: 2023-04-18 02:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# kubeadm
## init / join 오류
```
[preflight] Running pre-flight checks
        [WARNING Swap]: swap is enabled; production deployments should disable swap unless testing the NodeSwap feature gate of the kubelet
error execution phase preflight: [preflight] Some fatal errors occurred:
        [ERROR CRI]: container runtime is not running: output: time="2023-04-18T16:54:14+09:00" level=fatal msg="validate service connection: CRI v1 runtime API is not implemented for endpoint \"unix:///var/run/containerd/containerd.sock\": rpc error: code = Unimplemented desc = unknown service runtime.v1.RuntimeService"
, error: exit status 1
[preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`
To see the stack trace of this error execute with --v=5 or higher
```
- [WARNING Swap]
  - Swap 종료
```bash
swapoff -a && sed -i '/swap/s/^/#/' /etc/fstab
```

- [ERROR CRI]
```bash
sudo rm /etc/containerd/config.toml
sudo systemctl restart containerd
sudo kubeadm init
```