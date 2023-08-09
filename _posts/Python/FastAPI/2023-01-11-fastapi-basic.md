---
title: 'FastAPI'
author: juye-ops
date: 2023-01-11 00:00:00 +0900
categories: ['Python', 'FastAPI']
tags: ['RestAPI', 'Python', 'Backend']
render_with_liquid: false
---

# Fast API
최근 떠오르는 Python Web framework

## 특징
- High Performance: Node.js, Go와 비슷한 성능
- Easy: Flask와 비슷한 구조로, Microservice에 적합
- Productivity: Swagger 자동 생성 및 Pydantic을 이용한 Serialization

## FastAPI vs Flask
```python
# Flask
@app.route("/books", methods=["GET"])
def books_table_update():
    title = request.args.get('title', None)
    author = request.args.get('author', None)
```
```python
# FastAPI
@app.get("/books/{book_title}/author/{author}")
async def books_table_update(books_title: str, author: str):
```
- Flask보다 간결한 Router 문법
- Asynchronous(비동기) 지원
- Built-in API Documentation(Swagger)
- Pydantic을 이용한 Serialization 및 Validation
- 현재는 Flask의 유저가 더 많은 추세
- ORM 등 Database와 관련된 라이브러리가 적음

# 구축
## FastAPI 프로젝트 구조
```bash
├ app/
│  ├─ __main__.py
│  ├─ main.py # or app.py
│  ├─ model.py
```
- \_\_main\_\_.py: 애플리케이션을 간단하게 실행할 수 있는 Entrypoint 역할
  - Entrypoint: 프로그래밍 언어에서 최상위 코드가 실행되는 시작점 또는 프로그램 진입점
- main.py(app.py): FastAPI의 애플리케이션과 Router 설정
- model.py: ML model에 대한 클래스 함수 정의

# 실행
## 패키지 설치
```bash
pip install fastapi uvicorn
```


## Simple example
```python
from fastapi import FastAPI

# FastAPI 객체 생성
app = FastAPI()

# 라우터 '/'로 접근 시 {Hello: World}를 json 형태로 반환
@app.get("/")
def read_root():
  return {"Hello": "World"}

uvicorn.run(app, host="0.0.0.0", port=8000)   # 외부 아이피로 서버 개설(내부 아이피로도 접근 가능)
# uvicorn.run(app, host="localhost", port=8000)   # 내부 아이피로 서버 개설
# uvicorn.run(app, host="127.0.0.1", port=8000)   # 내부 아이피로 서버 개설
```

## Swagger
- 만든 API를 클라이언트에서 호출하는 경우 사용법을 제공(협업 지원)
- RestAPI 설계 및 문서화
- API의 디자인, 빌드, 문서화, 테스팅을 제공
- 특정 라우터에서 확인 가능
  - localhost:8000/docs
  - localhost:8000/redoc