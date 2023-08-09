---
title: '[FastAPI] Background tasks'
author: juye-ops
date: 2023-01-11 05:00:00 +0900
categories: ['Python', 'FastAPI']
tags: ['RestAPI', 'Python', 'Backend']
render_with_liquid: false
---
# Background tasks
- Starlett의 비동기 프레임워크를 래핑하여 사용
- FastAPI의 기능 중 Background tasks 기능은 오래 걸리는 작업들을 background에서 실행
- Online Serving에서 CPU 사용이 많은 작업들을 Background task로 사용하면 클라이언트는 작업 완료를 기다리지 않고 즉시 Response를 식별 가능

```python
...
app = FastAPI()

def cpu_bound_task(wait_time: int):
    sleep(wait_time)
    return f"task done after {wait_time}"

class TaskInput(BaseModel):
    wait_time: int = Field(default=1, le=9, ge=1)

@app.post("/task", status_code=202) # 비동기 작업 시 통상 202 code를 return
async def create_task_in_background(task_input: TaskInput, background_tasks: BackgroundTasks):
    background_tasks.add_task(cpu_bound_task, task_input.wait_time)
    return "ok"

tasks = [{"wait_time": i} for i in range(1, 10)]

start_Time = datetime.now()
run_tasks_in_fastapi(app, tasks)
end_time = datetime.now()

print(f"Background tasks: Took {(end_time - start_time).seconds})
```