---
title: '[FastAPI] Get 요청'
author: juye-ops
date: 2023-01-11 01:00:00 +0900
categories: ['Python', 'FastAPI']
tags: ['RestAPI', 'Python', 'Backend']
render_with_liquid: false
---

# 활용
## GET
### 예시
```python
from fastapi import FastAPI
import uvicorn

app = FastAPI()

database = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@app.get("/users/{user_id}")  #Path parameter를 이용한 조회
def get_user(user_id):
    return {"user_id": user_id}

@app.get("/items")    # Query string을 이용한 조회
def read_item(skip: int=0, limit: int=10):
    return database[skip: skip+limit]

@app.get("/items/{item_id}")  # Optional parameter를 이용한 조회
def optional_read_item(item_id: str, q=None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
```
- Path Parameter
  - http://localhost:8000/users/123
    - 123 유저 정보 요청
- Query String
  - http://localhost:8000/items?skip=1&limit=100
    - skip=1, limit=100인 변수로 read_item 함수 실행 후 정보 요청
- Optional Parameter
  - http://localhost:8000/items/1&q=FASTAPI
