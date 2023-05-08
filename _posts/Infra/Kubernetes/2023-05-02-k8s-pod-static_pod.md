---
title: '[Kubernetes] Pod: Static Pod'
author: juye-ops
date: 2023-05-02 00:00:00 +0900
categories: [Infra, Kubernetes]
tags: [Kubernetes]
render_with_liquid: false
---

# Static Pod
API 서버 없이 특정 노드의 kubelet daemon이 자동으로 수행하는 Pod
- 말 그대로 Node 사전/전역에 선언한 Pod
- 구동할 Worker Node에 내용을 작성

```bash
cat /var/lib/kubelet/config.yaml

...
staticPodPath: /etc/kubernetes/manifests # static pod로 수행할 yaml 파일의 디렉토리
...

```

## Example
1. 모든 Pod를 제거한 상태에서 진행
2. `/etc/kubernetes/manifests/pod.yaml`을 저장하는 순간의 pod 식별

```
master@k8s-master: kubectl get pods -o wide
# 파드 0개 출력
```

```yaml
# Node2 - /etc/kubernetes/manifests/pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx-container
    image: nginx:1.14
    ports:
    - containerPort: 80
      protocol: TCP
```

```
master@k8s-master: kubectl get pods -o wide

NAME               READY   STATUS    RESTARTS   AGE   IP                NODE        NOMINATED NODE   READINESS GATES
nginx-pod-master   2/2     Running   0          51m   10.32.0.2         k8s-node2   <none>           <none>
```

# 유의점
- staticPodPath 수정
  - config.yaml의 *staticPodPath*를 수정
  - kubelet daemon restart 진행
- Control plane의 *staticPodPath*
  - etcd, apiserver, controller, scheduler 등 존재
  - 새로운 파일 입력 시, 이들은 Worker node에 구동