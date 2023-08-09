---
title: '[FastAPI] API Router'
author: juye-ops
date: 2023-01-11 04:00:00 +0900
categories: ['Python', 'FastAPI']
tags: ['RestAPI', 'Python', 'Backend']
render_with_liquid: false
---

# API Router
- API Router는 더 큰 애플리케이션들에서 많이 사용되는 기능
- API Endpoint를 정의
- Python Subpackage
- API Router는 Mini FastAPI로 여러 API를 연결하여 활용
- 기존에 사용하던 `@app.get`, `@app.post`가 아닌, Router 파일을 따로 설정하여 app에서 import하여 사용

```python
from fastapi import FastAPI, APIRouter
import uvicorn

user_router = APIRouter(prefix="/users")    # '/users'를 Default router로 설정
order_router = APIRouter(prefix="/orders")  # '/orders'를 Default router로 설정

# 하단의 user 라우터는 다른 파일로 관리하는게 일반적
@user_router.get("/", tags=["users"])   # /users/
def read_users():
    return [{"username": "Rick"}, {"username": "Morty"}]

@user_router.get("/me", tags=["users"]) # /users/me
def read_user_me():
    return {"username": "fakecurrentuser"}

@user_router.get("/{username}", tags=["users"])     # /users/*
def read_user(username: str):
    return {"username": username}


# 하단의 order 라우터는 다른 파일로 관리하는게 일반적
@order_router.get("/", tags=["orders"]) # /orders/
def read_orders():
    return [{"order": "Taco"}, {"order": "Burritto"}]

@order_router.get("/me", tags=["orders"])   # /orders/me
def read_order_me():
    return {"my_order": "taco"}

@order_router.get("/{order_id}", tags=["orders"])   # /orders/*
def read_order_id(order_id: str):
    return {"order_id": order_id}

app = FastAPI()

if __name__ == "__main__":
    app.include_router(user_router)
    app.include_router(order_router)
    uvicorn.run(app, host="localhost", port=8000)

```