---
title: '[FastAPI] Error Handling'
author: juye-ops
date: 2023-01-11 06:00:00 +0900
categories: ['Python', 'FastAPI']
tags: ['RestAPI', 'Python', 'Backend']
render_with_liquid: false
---

# Error handling
- 웹서버를 안정적으로 운영하기 위해 반드시 필요한 주제
- 서버에서 Error가 발생한 경우, 어떤 Error가 발생했는지 식별
- 요청한 클라이언트에 해당 정보를 전달하여 대응
- 모니터링 도구를 사용해 Error log를 수집
- 발생하는 오류를 빠르게 수정할 수 있도록 예외처리를 구성

```python
from fastapi import FastAPI, HTTPException
import uvicorn

app = FastAPI()

items={
    1: "AI",
    2: "Backend,
    3: "Infrastructure"
}

@app.get("v1/{item_id}")
async def find_by_id(item_id: int):
    return items[item_id]

@app.get("/v2/{item_id}")
async def find_by_id(item_id: int):
    try:
        item=items[item_id]
    except KeyError:
        raise HTTPException(status_code=404, detail=f"아이템을 찾을 수 없습니다. [id: {item_id}]")
    return item
```