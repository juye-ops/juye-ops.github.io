---
title: '[Git]이전 날짜로 커밋'
domain: DevOps
category: Git
date: 2023-01-06
thumbnail: ""
description: ""
featured: false
---

# 이전 날짜로 커밋
1. 파일 수정 후 커밋 진행
    ```bash
    git add MODIFIED_FILE
    git commit -m "Message"
    ```

2. 위에서 진행한 커밋을 최근 커밋으로 간주하여 수정
   - amend: 최근 커밋 수정
   - no-edit: 커밋 메시지를 변경하지 않고 개정
   - date: 업데이트 할 날짜 정보
     - 요일, 일, 월, 년, 시간, 표준시 순서대로 공백 단위에 맞춰 입력
    ```bash
    git commit --amend --no-edit --date "Sat 1 Jan 2022 00:00:00 KST"
    # 한국 표준시 기준 1월 1일 토요일 0시 0분 0초로 위의 커밋 정보 수정
    ```

3. 강제 푸시
   - 수정된 정보에 대해 push 진행
    ```bash
    git push
    ```