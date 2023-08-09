---
title: '[FastAPI] Post 요청'
author: juye-ops
date: 2023-01-11 02:00:00 +0900
categories: ['Python', 'FastAPI']
tags: ['RestAPI', 'Python', 'Backend']
render_with_liquid: false
---
# 활용
## Post
클라이언트에서 API에 데이터를 송신
- Request Body: 클라이언트의 정보를 API에 전달
- Response Body: API의 Response를 클라이언트에 전달

### Post Method
Request Body에 데이터를 넣어서 송신
- Content-Type: 바디의 데이터를 설명하며, Header 필드가 존재하고 데이터 타입이 명시
  - application/x-www-form-urlencoded: BODY에 Key, Value를 사용하며 &구분자 사용
  - text/plain: 단순 txt파일
  - multipartform-data: 데이터를 바이너리 데이터로 전송
- ```pydantic```으로 Request body 데이터 정의
- Type Hinting에 위에서 생성한 Class 주입

### 예시
Request Body 데이터 검증
```python
from fastapi import FastAPI
import uvicorn

from pydantic import BaseModel

class ItemIn(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

class ItemOut(BaseModel):
    name: str
    price: float
    tax: float = None

app = FastAPI()

@app.post("/items", response_model=ItemOut)
def create_item(item: ItemIn):
    return item

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
```

- Post 요청 진행
  1. http://localhost:8000/docs 진입
  2. ```/items``` 라우터 선택
  3. 우측 상단의 "Try it out!" 클릭
  4. 전달 할 파라미터 수정 후 하단의 Execute 클릭
     - 내부 데이터 수정 완료

  5. 하단의 Response Body 식별
     - Request는 ```ItemIn``` 클래스로 하였지만, Response Body는 ```ItemOut``` 형태로 도출


### Form
Form 형태로 데이터를 입력
- 입력한 유저의 ID와 PW를 바탕으로 유저 ID 출력
```bash
pip install python-multipart
```

```python
from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates

import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="./")

@app.get("/login")
def get_login_form(request: Request):
    return templates.TemplateResponse("login_form.html", context={"request": request})

@app.post("/login")
def login(username: str=Form(...), password: str=Form(...)):
    return {"username": username}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
```

```html
<!-- login_form.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title> Sample Login Form</title>
    </head>
    <body>
        <form method="post">
            <input type="string" name="username" value="{{username}}"/>
            <input type="password" name="password" value="{{password}}"/>

            <input type="submit">
        </form>
    </body>
</html>
```

### File Upload
파일 등록
- 등록한 파일의 크기나 이름을 확인하는 예제

```python
from typing import List

from fastapi import FastAPI, File, Request, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="./")

@app.post("/files")
def create_files(files: List[bytes] = File(...)):
    return {"file_sizes": [len(file) for file in files]}

@app.post("/uploadfiles")
def create_upload_files(files: List[UploadFile] = File(...)):
    return {"filenames": [file.filename for file in files]}

@app.get("/")
def main(request: Request):
    return templates.TemplateResponse("fileupload.html", context={"request": request})

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
```

```html
<body>
    <form action="/files" enctype="multipart/form-data" method="post">
        <input type="file" name="files" multiple>
        <input type="submit">
    </form>
    <form action="/uploadfiles" enctype="multipart/form-data" method="post">
        <input type="file" name="files" multiple>
        <input type="submit">
    </form>
</body>
```

# 심화
## Event Handler
이벤트가 발생했을 때의 처리를 담당하는 함수
- FastAPI에선 Application이 실행할 때나 종료될 때 특정 함수 실행 가능

```python
...
 @app.on_event("startup")
 def startup_event():
    print("Start Up Event")
    items["foo"] = {"name": "Fighters"}
    items["bar"] = {"name": "Tenders"}

@app.on_event("shutdown")
def shutdown_event():
    print("Shutdown Event!")
    with open("log.txt", mode="a") as log:
        log.write("Application shutdown")


@app.get("items/{item_id}")
def read_items(item_id: str):
    return items[item_id]

...
```