---
title: '[Pytorch] Out of Memory 해결 방법'
author: juye-ops
date: 2022-11-10 10:00:00 +0900
categories: [Development, Python]
tags: [Develop, Trouble Shooting]
render_with_liquid: false
---

# OOM(Out-of-Memory)
- 어디서, 왜 발생햇는지 알기 어려움
- Error backtracking이 이상한 곳을 참조
- 메모리의 이전상황 파악이 어려움

## 단순한 해결법
1. Batch Size를 낮춘다.
2. GPU 메모리를 Flush 한다.
3. 실행한다.

## GPUUtil
- nvidia-smi 처럼 GPU의 상태를 보여주는 모듈
- Colab은 환경에서 GPU 상태 보여주기에 편리
- iter마다 메모리 상태 식별 가능

```
$ pip install GPUtil
```

```python
import GPUtil
GPUtil.showUtilization()
```

## GPU cache 정리
torch.cuda.empty_cache()
- 가용 메모리를 확보
- del과는 구분이 필요
- reset 대신 쓰기 좋은 함수

## loop 내에 tensor로 축적되는 변수 관리
tensor로 처리된 변수는 GPU 상의 메모리 사용하며, loop 안에 연산에 있을 때 GPU에 Computational graph 생성(메모리 잠식)
- 1-d tensor의 경우 python 기본 객체로 변환하여 처리
- Python의 메모리 배치 특성상 loop가 끝나도 메모리를 차지하므로, `del` 명령어를 적절히 사용하여 메모리를 관리

## Batch Size 실험
학습 시 OOM이 발생했다면 Batch Size를 줄여서 실험

## No Grad
torch.no_grad()
- Inference 시점에서는 torch.no_grad() 구문을 사용
- backward pass로 인해 쌓이는 메모리에서 자유로움

# 예상치 못한 에러 메시지
- CUDNN_STATUS_NOT_INIT: GPU에 대한 소프트웨어 설치 오류
- device-side-assert: OOM의 일종으로 생각할 수 있으며, 외에도 많은 오류가 생성
- colab에서 너무 큰 사이즈는 실행하지 않는 것을 권장
  - Linear, CNN, LSTM(필요 이상으로 많은 메모리를 요구)
- CNN 대부분의 에러는 크기가 안 맞아서 생기는 경우
  - torchsummary 등으로 사이즈 조정
- tensor의 float precision을 16bit로 조정

