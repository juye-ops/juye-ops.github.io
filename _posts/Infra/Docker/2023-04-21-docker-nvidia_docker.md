---
title: '[Docker] Nvidia Docker'
author: juye-ops
date: 2023-04-18 00:00:00 +0900
categories: [Infra, Docker]
tags: [Docker, Installation]
render_with_liquid: false
---

# Nvidia docker 설치

## GPG Key 등록
``` bash
distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
      && curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
      && curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
            sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
            sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

## apt 관리
```bash
sudo apt-get update
sudo apt-get install -y nvidia-docker2
```

## dry-run
```bash
docker run --rm --gpus all ubuntu:18.04 nvidia-smi
```