---
title: '[Ubuntu] 명령어 우선순위 변경'
author: juye-ops
date: 2022-11-21 10:00:00 +0900
categories: ['Infra', 'Ubuntu']
tags: [Develop, Terminal]
render_with_liquid: false
---

## Ubuntu 명령어 우선순위 변경 (Python3)
```bash
python

-bash: /usr/bin/python: No such file or directory
```

Alternatives
1. Python3 위치 파악
    ```bash
    which python3
    
    /usr/bin/python3
    ```

2. python의 alternatives 파악
    ``` bash
    sudo update-alternatives --config python

    update-alternatives: error: no alternatives for python
    ```

3. 명령어 우선순위 등록
    ```bash
    # update-alternatives --install [SYMBOLIC_PATH] [ALTER_NAME] [REAL_PATH] [NUMBER]
    sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
    sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.7 2 # if python2 exists
    ```

4. 명령어 확인
    ```bash
    sudo update-alternatives --config python
    ```

***Alternatives 제거***
```bash
# sudo update-alternatives --remove [ALTER_NAME] [REAL_PATH]
sudo update-alternatives --remove python /usr/bin/python3
```