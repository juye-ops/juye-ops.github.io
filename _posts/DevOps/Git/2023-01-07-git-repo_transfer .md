---
title: '[Git]저장소(Repository) 병합'
author: juye-ops
date: 2023-01-07 10:00:00 +0900
categories: ['DevOps', 'Git']
tags: [Develop, Git]
render_with_liquid: false
---

# 저장소(Repository) 병합
- 기존의 저장소를 새 저장소로 이식
- 기존의 저장소에서 기록된 로그, 즉 잔디를 보유한 채 저장소 정리

## 순서 및 예시

1. 새로운 저장소 생성할 시 *(기존의 다른 저장소로 이식할 경우 생략)*
   1. 새로운 저장소(**New-Repo**) 생성
   2. New-Repo 클론
       ```
       git clone https://github.com/USERNAME/New-Repo.git
       ```
   3. 저장소 이동
       ```
       cd New-Repo
       ```
   4. New-Repo에 대한 최초 커밋
       ```
       git add .
       git commit -m 'MESSAGE'
       ```

2. 저장소(**Past-Repo**) 이식
   1. **git subtree add --prefix="기존 저장소 명" "기존 저장소 주소" "브랜치 명"**
    ```
    git subtree add --prefix=Past-Repo https://github.com/USERNAME/Past-Repo.git main
    ```