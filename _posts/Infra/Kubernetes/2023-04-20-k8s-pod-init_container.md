---
title: '[Kubernetes]Pod: Init container를 적용한 Pod'
author: juye-ops
date: 2023-04-20 00:00:00 +0900
categories: ['Infra', 'Kubernetes']
tags: ['K8S']
render_with_liquid: false
---

# Init Container
Main container의 전처리를 수행하는 Container
- Init container 수행에 실패하면 Main container는 수행되지 않는 구조

## Example
[Kubernetes: Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)
1. myapp-pod: init-container-exam.yaml 작성
   - `myservice`라는 앱과 `mydb`라는 앱이 생성되면 Main container인 `myapp-container`를 수행
```yaml
# init-container-exam.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app.kubernetes.io/name: MyApp
spec:
  containers:
  - name: myapp-container
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  initContainers:
  - name: init-myservice
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup myservice.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for myservice; sleep 2; done"]
  - name: init-mydb
    image: busybox:1.28
    command: ['sh', '-c', "until nslookup mydb.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo waiting for mydb; sleep 2; done"]
```

2. myapp-pod 생성
   - init 2개 대기 확인
```
master@k8s-master:~/kubernetes/yaml$ kubectl get pods
NAME        READY   STATUS     RESTARTS   AGE
myapp-pod   0/1     Init:0/2   0          15s
```

3. Init containers를 생성 시킬 트리거 yaml 작성
```yaml
# myservice.yaml
apiVersion: v1
kind: Service
metadata:
  name: myservice
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9376
```
```yaml
# mydb.yaml
apiVersion: v1
kind: Service
metadata:
  name: mydb
spec:
  ports:
  - protocol: TCP
    port: 80
    targetPort: 9377
```

4. myservice, mydb를 순서대로 실행하면서 Status 식별

```
master@k8s-master:~/kubernetes/yaml$ kubectl create -f mydb.yaml
service/mydb created

master@k8s-master:~/kubernetes/yaml$ kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP   47h
mydb         ClusterIP   10.97.155.161   <none>        80/TCP    5s
myservice    ClusterIP   10.110.61.55    <none>        80/TCP    3m39s

master@k8s-master:~/kubernetes/yaml$ kubectl get pods
NAME        READY   STATUS    RESTARTS   AGE
myapp-pod   1/1     Running   0          25m
```
```
master@k8s-master:~/kubernetes/yaml$ kubectl create -f myservice.yaml
service/myservice created

master@k8s-master:~/kubernetes/yaml$ kubectl get services
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP   47h
myservice    ClusterIP   10.110.61.55   <none>        80/TCP    35s

master@k8s-master:~/kubernetes/yaml$ kubectl get pods
NAME        READY   STATUS     RESTARTS   AGE
myapp-pod   0/1     Init:1/2   0          20m
```

