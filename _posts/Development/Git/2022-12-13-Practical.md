---
title: 'Git 유용한 기능'
author: Juye-ops
date: 2022-12-13 10:00:00 +0900
categories: [Development, Git]
tags: [Develop, Git]
render_with_liquid: false
---


### 기본 설정
``` bash
$ git config --global user.name="USER-NAME"
$ git config --global user.email="USER-EMAIL"
```
<br/>

### 이전 날짜로 커밋
1. 파일 수정 후 커밋 진행
    ```bash
    $ git add MODIFIED_FILE
    $ git commit -m "Message"
    ```

2. 위에서 진행한 커밋을 최근 커밋으로 간주하여 수정
   - amend: 최근 커밋 수정
   - no-edit: 커밋 메시지를 변경하지 않고 개정
   - date: 업데이트 할 날짜 정보
     - 요일, 일, 월, 년, 시간, 표준시 순서대로 공백 단위에 맞춰 입력
    ```bash
    $ git commit --amend --no-edit --date "Sat 1 Jan 2022 00:00:00 KST" # 한국 표준시 기준 1월 1일 토요일 0시 0분 0초로 위의 커밋 정보 수정
    ```

3. 강제 푸시
   - 수정된 정보에 대해 강제로 push 진행
    ```bash
    $ git push --force
    ```

<br/>

### 저장소(Repository) 병합
- 기존의 저장소를 새 저장소로 이식
- 기존의 저장소에서 기록된 로그, 즉 잔디를 보유한 채 저장소 정리

#### 순서 및 예시

1. 새로운 저장소 생성할 시 *(기존의 다른 저장소로 이식할 경우 생략)*
   1. 새로운 저장소(**New-Repo**) 생성
   2. New-Repo 클론
       ```
       $ git clone https://github.com/USERNAME/New-Repo.git
       ```
   3. 저장소 이동
       ```
       $ cd New-Repo
       ```
   4. New-Repo에 대한 최초 커밋
       ```
       $ git add .
       $ git commit -m 'MESSAGE'
       ```

2. 저장소(**Past-Repo**) 이식
   1. **git subtree add --prefix="기존 저장소 명" "기존 저장소 주소" "브랜치 명"**
    ```
    $ git subtree add --prefix=Past-Repo https://github.com/USERNAME/Past-Repo.git main
    ```