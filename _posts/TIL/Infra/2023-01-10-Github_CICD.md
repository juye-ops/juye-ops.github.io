---
title: 'Github Action을 이용한 CI/CD'
author: juye-ops
date: 2023-01-10 10:00:00 +0900
categories: ['TIL', 'Infra']
tags: ['Github']
render_with_liquid: false
---

# CI/CD
## 개발 환경
- Local
  - 각자의 컴퓨터에서 개발
  - 각자의 환경을 통일시키기 위해 Docker 등을 사용
- Dev
  - Local에서 개발한 기능을 테스트할 수 있는 환경
  - Test 서버
- Staging
  - Production 환경에 배포하기 전에 운영하거나 보안, 성능을 측정하는 환경
- Production
  - 실제 서비스를 운영하는 환경
  - 운영 서버

### Git flow
개발 환경을 브랜치로 관리하는 방법으로, 기업마다 방법 측면에서의 차이 존재
- main
  - Production 서버의 코드 보유
  - staging 혹은 develop 브랜치에서 Code review & Pull request 진행
- staging
  - Staging 서버의 코드 보유
  - 일반적인 Git flow에서는 해당 브랜치가 생략
  - develop 브랜치에서 Code review & Pull request 진행
- develop
  - Dev 서버의 코드 보유
  - feature 브랜치의 각 기능을 통합하는 브랜치
- feature/*
  - 특정 기능을 구현하는 브랜치

![Desktop View](/static/img/Infra/git-flow.png)
_Gitflow 구조_

## Continuous Integration(CI)
- Build, Test 자동화
- 지속적으로 코드 품질을 관리
- 새롭게 작성한 코드 변경사항이 Build, Test 후 Test case에 통과했는지 확인
- 코드를 수정한 모든 개발자가 CI 프로세스를 진행

## Continuous Deploy/Delivery(CD)
- 배포 자동화
- 항상 신뢰 가능한 상태의 코드가 되면 자동으로 배포할 수 있도록 하는 과정
- CI 이후 진행
- dev/staging/main 브랜치에 Merge가 될 경우 코드가 자동으로 서버에 배포

# Github Action
Github에서 출시한 기능으로, 소프트웨어의 Workflow 자동화를 도와주는 도구

## Workflow 예시
1. Test code
   - 특정 함수의 return 값이 어떻게 나오는지 확인하는 Test code
   - 특정 변수의 타입이 int가 맞는지 확인
   - Unit test, End to end test

2. 배포
   - Prod, Staging, Dev 서버에 코드 배포
   - FTP로 파일 전송하거나 Docker image를 Push하는 방법으로 진행
   - Node.js 등 다양한 언어 배포도 지원

3. 쉘 스크립트 실행
   - Github repo에 저장된 스크립트를 일정 주기를 가지고 실행
   - crontab의 대용
   - 데이터 수집을 주기적으로 해야할 경우 활용
   - Python - [https://github.com/actions/setup-python](https://github.com/actions/setup-python)

4. Github tag, release 자동으로 설정
   - Main 브랜치에 Merge 될 경우 특정 작업 실행
   - 기존 버전에서 버전 Upgrade
   - 새로운 브랜치 생성 시 특정 작업 실행 가능

5. etc
   - 사용자가 만든 Workflow 템플릿을 공유
     - github action 등으로 검색
     - [Action Marketplace](https://github.com/marketplace?type=actions)
     - [Awesome Github Actions](https://github.com/sdras/awesome-actions)

## Github Action pricing
Public repo는 무료이며, Private repo는 아래 조건을 따름
![Desktop View](/static/img/Infra/action_pricing.png)

## Github Action 제약 조건
- 하나의 Github repo 당 최대 20개의 Workflow 등록 가능
- Workflow에 존재하는 Job은 최대 6시간 실행 가능하며, 초과 시 자동으로 중지
- 동시에 실행할 수 있는 Job에 제한

## Github Action 사용 방식
1. 코드 작업
2. 코드 작업 후, Github action의 활용 방안 고려
3. 사용할 Workflow 정의
4. Workflow 정의 후 정상 작동하는 지 확인

## Github Action core
### Workflow
- 여러 Job으로 구성
- Event로 Trigger(실행)되는 자동화 된 Process
- 최상위 개념을 내포
- Yaml 파일로 작성되며, ```.github/workflows``` 폴더에 저장

### Event
- Workflow를 Trigger하는 특정 활동 혹은 규칙
- 특정 Branch로 Push 하는 경우
- 특정 Branch로 Pull Request하는 경우
- 특정 시간대에 반복(Cron)

### Jobs
- Runner에서 실행되는 Steps의 조합
- 여러 Job이 있는 경우 병렬 혹은 순차적으로 실행 가능
  - 다른 Job에 의존 관계 보유 가능(A job success 후 B job 실행)

### Steps
- Job에서 실행되는 개별 작업
- Action을 실행하거나 쉘 커맨드 실행
- 하나의 Job에선 데이터 공유 가능

### Actions
- Workflow의 제일 작은 단위
- Job을 생성하기 위해 여러 Step을 묶은 개념
- 재사용이 가능한 Component
- 개인적으로 Action이나 Marketplace의 Action을 사용 가능

### Runner
- Workflow가 실행될 서버
- Github-hosted runner: Github Action의 서버를 사용하는 방법
  - vCPU 2
  - Memory 7GB
  - Storage 14GB
- Self-hosted runner: 직접 서버를 호스팅해서 사용하는 방법


# Github Action 사용
## SSH action

```yaml
# .github/workflow/deploy-ssh.yml
name: CICD-SSH
on:
  push:
    branches: [ main ]   # main 브랜치 Push 시 실행
    paths:      # posts 폴더 내 파일이 수정될 시 실행
      - 'posts/**'
    # paths-ignore:   # 해당 파일이 push되는 경우는 무시
    #   - .gitignore
    #   - README.md
    #   - LICENSE

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      name: executing remote ssh commands using ssh key
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }} 
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        port: 22
        script: |   # 실행 시 수행 할 스크립트
            cd ${{ github.event.repository.name }}/part2/04-cicd
            sh deploy_ssh.sh
```