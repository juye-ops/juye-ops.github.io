---
title: '[Anaconda]설치'
author: juye-ops
date: 2022-12-06 10:00:00 +0900
categories: ['Infra', 'Anaconda']
tags: ['Python', 'Anaconda']
render_with_liquid: false
---

## Anaconda

### Installation
1. [Anaconda-repo](https://repo.anaconda.com/archive/)에서 Installer 다운로드
   - 직접 다운로드
   - 터미널 wget 다운로드
    ```bash
    wget https://repo.anaconda.com/archive/[Filename]
    
    wget https://repo.anaconda.com/archive/Anaconda3-2022.10-Linux-aarch64.sh/
    ```

2. 라이센스 확인
   1. Ctrl + C 로 스킵
   2. ```yes``` 입력

3. 설치 경로 입력
   - 기본 값: Home directory
   - 수정: 수정하고자 하는 절대 경로 입력

4. Anaconda initialize
   - Anaconda가 터미널 실행 시 (base)로 자동 activate
   - ```yes```를 입력하여 우선 True로 할당

5. 터미널 실행 시 자동 activate 끄기
    ```bash
    conda config --set auto_activate_base False
    ```