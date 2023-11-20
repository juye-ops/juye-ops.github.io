---
title: '[Docker]Docker compose'
author: juye-ops
date: 2023-04-18 00:00:00 +0900
categories: ['Infra', 'Docker']
tags: [Docker]
render_with_liquid: false
---

# Docker Compose
도커 컨테이너 여러 개를 유기적으로 구축

```bash
# docker-compose.yml로 구축
docker compose up 
```

## docker-compose.yml 작성법

```yaml
version: "3.9"
services:

  my_redis:   # container 이름을 my_redis로 설정
    image: redis:alpine
    ports:
      - "6379"  # host:6379를 my_redis:6379로 포트포워딩
    networks:
      - frontend    # frontend 네트워크에 등록
    deploy: # my_redis의 설정 값
      replicas: 2
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure

  my_database:
    build: ./database   # Dockerfile이 있는 위치
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "3306:3306" # host:3306을 my_database:3306로 포트포워딩
    networks:
      - backend # backend 네트워크에 등록

  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"   # host:5000을 vote:80으로 포트포워딩
    networks:
      - frontend    # frontend 네트워크에 등록
    depends_on:
      - my_redis    # redis 생성 후 vote 생성
    deploy: #vote의 설정값
      replicas: 2
      update_config:
        parallelism: 2
      restart_policy:
        condition: on-failure
  
  ...   # 이러한 형식으로 계속 작성

networks:
  frontend: # frontend 네트워크 설정
  backend:  # backend 네트워크 설정

volumes:
  db-data:  # 컨테이너 설정에서 사용할 변수
```

## 유의사항
- Dockerfile을 build하고 docker-compose를 build하는 형식으로 만들면 오류가 날 때도 있음