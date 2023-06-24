---
title: '[Kubernetes] Controller: Job Controller'
author: juye-ops
date: 2023-05-10 01:00:00 +0900
categories: ['Study', 'Infra']
tags: ['K8S']
render_with_liquid: false
---

# 쿠버네티스의 역할
Pod가 항상 실행(Running)될 수 있도록 보장

# Job
- Batch 처리하는 Pod는 작업이 완료되면 종료
- Batch 처리에 적합한 컨트롤러로, Pod의 성공적인 완료를 보장
  - 비정상 조욜 시 다시 실행
  - 정상 종료 시 완료

## Definition
- completions: 성공 할 Pod 갯수
- parallelism: 동시에 running 할 최대 개수
- activeDeadlineSeconds: 작업 할 최대 시간
- restartPolicy
  - Never: Pod generate & start
  - OnFailure: 컨테이너 자체를 restart
- backoffLimit: restartPolicy를 적용할 횟수
  - Default: 6
  - 초과 시, Job은 그대로, Pod만 제거

```yaml
# job.yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: centos-job
spec:
#  completions: 5
#  parallelism: 2
#  activeDeadlineSeconds: 5
  template:
    spec:
      containers:
      - name: centos-container
        image: centos:7
        command: ["bash"]
        args:
        - "-c"
        - "echo 'Hello World'; sleep 25; echo 'Bye'"
      restartPolicy: Never
#      restartPolicy: OnFailure
#  backoffLimit: 3
```


## Example
- 생성 후 비정상 종료(pod delete) 및 정상 종료 식별
  - 비정상 종료 시 Rerun을 통해 새로운 pod로 생성
  - 정상 종료 시 STATUS: Completed로 전환

```
master@k8s-master:~/kubernetes/6$ kubectl create -f job.yaml
job.batch/centos-job created

master@k8s-master:~$ kubectl get pods
NAME               READY   STATUS    RESTARTS   AGE
centos-job-p96q4   1/1     Running   0          3s

master@k8s-master:~$ kubectl delete pod centos-job-p96q4
pod "centos-job-p96q4" deleted

master@k8s-master:~/kubernetes/6$ kubectl get pods
NAME               READY   STATUS    RESTARTS   AGE
centos-job-nmxpr   1/1     Running   0          3s

master@k8s-master:~$ kubectl get pods
NAME               READY   STATUS      RESTARTS   AGE
centos-job-nmxpr   0/1     Completed   0          68s
```

## Job이 끝난 후 스스로 제거되지 않는 이유
Job에서 진행한 로그는 각 Job의 Pod에 보존

# CronJob
Unix의 Crontab과 같이 특정 날짜 패턴에 자동으로 Job을 실행

## Definition
```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: cronjob-exam
spec:
  schedule: "* * * * *"
  startingDeadlineSeconds: 500
#  concurrencyPolicy: Allow
  concurrencyPolicy: Forbid
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox
            args:
            - /bin/sh
            - -c
            - echo Hello; sleep 10; echo Bye
          restartPolicy: Never
```