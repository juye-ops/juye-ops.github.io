---
title: 'Poetry'
author: juye-ops
date: 2023-01-11 10:00:00 +0900
categories: ['Python', 'Poetry']
tags: ['Backend', 'Poetry']
render_with_liquid: false
---

# Poetry

## Poetry: 가상환경 및 의존성 관리
- Dependency Resolver로써 복잡한 의존성들의 버전 충돌을 방지
- Virtualenv를 생성해서 격리된 환경에서 빠르게 개발 가능
- 기존 파이썬 패키지 관리 도구에서 지원하지 않는 Build, Publish 가능
- pyproject.toml을 기준으로 여러 툴들의 config를 명시적으로 관리
- 새로 만든 프로젝트라면 poetry와 virtualenv 등을 비교하는 것을 권장

## 설치
- Requirements: Python 2.7 or 3.5+
```bash
pip install poetry
```

## Poetry 프로젝트 생성
- 패키지 이름 검색 및 선택
- 패키지 버전 명시
- Dependency(Production용)
- Development Dependency(Dev용)
- 개발 환경마다 필요한 패키지 분리


Poetry 생성 예시
```bash
poetry init

This command will guide you through creating your pyproject.toml config.

Package name [fastapi]:
Version [0.1.0]:
Description []:  How to use FastAPI
Author [juye-ops <kjye.ops@gmail.com>, n to skip]:
License []:  MIT
Compatible Python versions [^3.10]:  >=3.8

Would you like to define your main dependencies interactively? (yes/no) [yes]
You can specify a package in the following forms:
  - A single name (requests): this will search for matches on PyPI
  - A name and a constraint (requests@^2.23.0)
  - A git url (git+https://github.com/python-poetry/poetry.git)
  - A git url with a revision (git+https://github.com/python-poetry/poetry.git#develop)
  - A file path (../my-package/my-package.whl)
  - A directory (../my-package/)
  - A url (https://example.com/packages/my-package-0.1.0.tar.gz)

Package to add or search for (leave blank to skip): fastapi
Found 20 packages matching fastapi
Showing the first 10 matches

Enter package # to add, or the complete package name if it is not listed []:
 [ 0] fastapi
 [ 1] fastapi-manage
 [ 2] fastapi-oracle
 [ 3] fastapi-common
 [ 4] fastapi-responseschema
 [ 5] fastapi-featureflags
 [ 6] fastapi-utils
 [ 7] fastapi-misskey
 [ 8] zdppy-fastapi
 [ 9] fastapi-analytics
 [ 10]
 > 0
Enter the version constraint to require (or leave blank to use the latest version): >=0.70.0

Add a package (leave blank to skip): pytest
Found 20 packages matching pytest
Showing the first 10 matches

Enter package # to add, or the complete package name if it is not listed []:
 [ 0] pytest
 [ 1] pytest123
 [ 2] 131228_pytest_1
 [ 3] pytest-pingguo-pytest-plugin
 [ 4] pytest-symbols
 [ 5] pytest-circleci
 [ 6] exgrex-pytest
 [ 7] pytest-pythonpath
 [ 8] pytest-level
 [ 9] pytest-faker
 [ 10]
 > 0
Enter the version constraint to require (or leave blank to use the latest version):
Using version ^7.2.0 for pytest

Add a package (leave blank to skip):

Would you like to define your development dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):

Generated file

[tool.poetry]
name = "fastapi"
version = "0.1.0"
description = "How to use FastAPI"
authors = ["juye-ops <kjye.ops@gmail.com>"]
license = "MIT"
readme = "README.md"

[tool.poetry.dependencies]
python = ">=3.8"
fastapi = ">=0.70.0"
pytest = "^7.2.0"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"


Do you confirm generation? (yes/no) [yes]
```