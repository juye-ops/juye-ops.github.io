---
title: 'Pydantic'
author: juye-ops
date: 2023-01-01 10:00:00 +0900
categories: ['Python', 'Pydantic']
tags: ['Pydantic', 'Backend']
render_with_liquid: false
---

# Pydantic Validation
- Validation Check logic
  1. url: 올바른 url을 입력
  2. rate: 1-10 사이의 정수 입력
  3. target_dir: 올바른 폴더 이름을 입력

Data validation이나 Settings management를 지원하는 라이브러리
- Type Hint를 런타임에서 강제해 안전하게 데이터를 핸들링
- Python의 기본 타입, List, Dict, Tuple에 대한 Validation 지원
- 기존 Validation 라이브러리보다 우수
- Config를 효과적으로 관리
- 머신러닝 Feature data validation으로도 활용

## 기존 validation
### Python class
- Input definition 및 validation에 의미없는 코드 발생
- 로직의 복잡도가 Class의 Method 복잡도에 비례
- Exception handling 방법 등 커스텀하게 제어할 수 있지만 메인 로직(Input을 받아서 Inference를 수행) 구현 집중에 방해

### Data class
- Dataclass Decorator를 통해 생성자 작성 불필요
- 편의용 magic method 활용 가능
- 여전히 validation 메소드는 따로 구현
- Validation 로직을 작성하지 않을 시 런타임에서 type checking 미지원

## Pydantic validation
```python
from pydantic import BaseModel, HttpUrl, Field, DirectoryPath

class ModelInput03(BaseModel):
    url: HttpUrl    # 올바른 http url인지 검증
    rate: int = Field(ge=1, le=10)  # 1<= x <=10인지 검증
    target_dir: DirectoryPath   # 존재하는 디렉토리인지 검증
```

- 훨씬 간결해진 코드(6라인)[vs 52라인(Python class), vs 50라인(dataclass)]
- 주로 쓰이는 타입들(http url, db url, enum 등)에 대한 Validation이 사전에 구현
- 런타임에서 Type hint에 따라서 Validation Error 발생
- Custom type에 대한 Validation도 쉽게 사용 가능


# Pydantic Config
Config를 체계적으로 관리할 방법 제공
## 기존 Config
- 애플리케이션은 종종 상수로 코드에 저장
  - Twelve-Factor를 위반

> Twelve-Factor: 설정을 코드에서 엄격하게 분리하는 것을 요구
> Twelve-Factor app은 설정을 환경 변수(envvars, env)에 저장
> 환경 변수는 코드 변경 없이 쉽게 배포 때마다 쉽게 변경 가능
>
> The Twelve-Factor App이라는 SaaS(Software as a Service)를 만들기 위한 방법론을 정리한 규칙들에 따르면, 환경 설정은 애플리케이션 코드에서 분리되어 관리


1. .ini, .yaml 파일 등으로 config 설정
   - 쉽게 환경을 설정할 수 있지만, 환경에 대한 설정을 하드코딩하는 형태
   - 변경 사항이 생길 때 유연한 코드 변경 불가
2. flask-style config.py
   - Config 클래스에서 yaml, ini 파일을 불러와 python class 필드로 주입하는 과정을 구현
   - Config를 상속한 클래스에서는 Config 클래스의 정보를 오버라이딩하여 사용
   - Data validation이나 환경 변수로 부터 해당 필드를 Overriding 한다면 각각 Overriding을 해야하므로 코드랑이 증가


## Pydantic config
- Validation처럼 BaseSetting를 상속한 클래스에서 Type hint로 주입된 설정 데이터를 검증 가능
- Field 클래스의 env 인자로, 환경 변수로 부터 해당 필드를 오버라이딩 가능
- yaml, ini 파일들을 추가적으로 만들지 않고, env 파일들을 환경별로 만들어 두거나, 실행 환경에서 유연하게 Overriding 가능