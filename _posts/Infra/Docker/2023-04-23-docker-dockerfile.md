---
title: '[Docker] Dockerfile 작성법'
author: juye-ops
date: 2023-04-23 00:00:00 +0900
categories: [Infra, Docker]
tags: [Docker, Installation]
render_with_liquid: false
---

# Dockerfile 작성법
## 종류

|명령어|설명|비고|
|:-:|:-:|:-:|
|FROM|기본 이미지|어떤 이미지에서 시작할 지 지정|
|MAINTAINER|이미지를 생성한 개발자의 정보|1.13.0 이후 사용 X|
|RUN|이미지를 생성할 때 실행할 명령어|RUN 명령을 수행할 때마다 레이어 생성 및 캐싱|
|WORKDIR|작업 디렉토리 지정||
|EXPOSE|개방할 포트 지정||
|USER|사용자 지정|default: root|
|COPY/ADD|build 중 호스트의 파일 또는 폴더를 이미지에 저장|ADD는 일반 파일 뿐만 아니라, 압축 파일이나 네트워크 상의 파일도 허용|
|ENV|이미지에서 사용할 환경 변수 값을 지정||
|CMD|컨테이너를 생성할 때의 명령어|ex. docker run|
|ENTRYPOINT|컨테이너를 실행할 때의 명령어|ex. docker start|

## 예시
```Dockerfile
# CUDA 11.8, Ubuntu 22.04 이미지 생성
FROM nvidia/cuda:11.8.0-base-ubuntu22.04

# 상호작용 제거
ARG DEBIAN_FRONTEND=noninteractive

# apt 패키지 업데이트 및 설치
RUN apt update && apt install  openssh-server python3-pip sudo libgl1-mesa-glx nvidia-cuda-toolkit -y

# 사용자 이름: ID, 비밀번호: password 인 사용자 생성
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 dacon
RUN  echo 'ID:password' | chpasswd

# ssh 실행
RUN service ssh start

# ssh 접근을 위한 22번 포트 허용
EXPOSE 22

# ssh 실행
CMD ["/usr/sbin/sshd","-D"]
```