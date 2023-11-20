---
title: '[Ubuntu]용량 관리'
author: juye-ops
date: 2022-11-21 10:00:00 +0900
categories: ['Infra', 'Ubuntu']
tags: [Develop, Terminal]
render_with_liquid: false
---

# 용량 관리

## 시스템 전체 용량 확인
```bash
df -h
```

## 메모리(RAM) 확인
```bash
free --giga   # 기가바이트로 얼마나 남았는지 확인
free --mega   # 메가바이트로 얼마나 남았는지 확인
free --kilo   # 킬로바이트로 얼마나 남았는지 확인
```

## (현재) 폴더의 전체 파일 크기 확인
```bash
du ./ -d 1 -h
```