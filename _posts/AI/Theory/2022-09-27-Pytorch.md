---
title: 'Pytorch 기초'
author: juye-ops
date: 2022-09-27 10:00:00 +0900
categories: [AI, Theory]
tags: [Study, AI, Pytorch]
render_with_liquid: false
---

# Pytorch
## Pytorch 기초
Python의 DL 프레임워크에 대한 입지가 높아지면서 기존 Torch에 Py라는 용어가 붙음

### Pytorch Operations
Numpy 문법과 AutoGrad가 특징

- Tensor
  - 사실상 numpy의 ndarray와 동일
  - Tensorflow의 Tensor와 거의 동일
  - Tensor를 생성하는 함수도 거의 동일

> Tensor: 다차원 Arrays를 표현하는 Pytorch 클래스

#### ndaaray @ Numpy
```python
import numpy as np

n_array = np.arange(10).reshape(2,5)
print(n_array)
print("ndim:",n_array.ndim,"shape :",n_array.shape)
```

#### Tensor @ Pytorch
```python
import torch

t_array=torch.FloatTensor(n_array)
print(t_array)
print("ndim:",t_array.ndim,"shape :",t_array.shape)
```

### Array to Tensor

#### data to Tensor
```python
data= [[3,5],[10, 5]]
x_data=torch.tensor(data)

print(x_data)
```

#### ndarray to Tensor
```python
data= [[3,5],[10, 5]]
nd_array_ex=np.array(data)
tensor_array=torch.from_numpy(nd_array_ex)

print(tensor_array)
```

### Device 식별
```python
...
x_data.device

if torch.cuda.is_available():
    x_data_cuda = x_data.to('cuda')

print(x_data_cuda.device)
```

### Tensor Handling
- view, reshape
  - Reshape 기능
  - view(): 메모리를 복사하여 새로운 공간에 쓰기 때문에 기존 Tensor와 따로 조작
  - reshape(): 메모리를 참조하여 기존 Tensor를 조작
- squeeze, unsqueeze
  - 차원 확장/축소 기능
  - squeeze(): (1, n, m), (n, 1, m), (n, m, 1)의 shape를 (n, m)으로 축소
  - Unsqueeze(c):(n, m)의 shape를 c차원에 대해 확장

### Tensor Operations
- Numpy와 동일한 Operation 보유
- 행렬 곱셈 연산
  - dot()이 아닌 mm(), matmul() 함수 사용
  - matmul() 함수는 Broadcasting 지원

### AutoGrad
backward 함수를 통해 Pytorch의 핵심인 자동 미분

```python
w = torch.tensor(2.0, requires_grad=True) 
y = w**2
z = 10*y + 2 
z.backward()

w.grad
```

## 프로젝트 구조

### Jupyter와 ML/DL 관계
- 초기단계
  - 학습 과정과 디버깅 등 지속적인 확인이 요구하므로 대화식 개발 과정(Jupyter와 같은 코드의 단위 실행)이 유리
- 배포 및 공유 단계
  - 쉬운 재현이 어렵고, 실행순서가 꼬이므로 notebook 공유에 불리
  - DL 코드도 하나의 프로그램이므로 개발 용이성 확보와 유지보수 향상 필요

### 프로젝트 템플릿
- 실행, 데이터, 모델, 설정, 로깅, 지표, 유틸리티 등 다양한 모듈들을 분리하여 프로젝트 템플릿화
  - 사용자 필요에 따라 수정하기에 용이

## 데이터셋

### Dataset 클래스
- 데이터 입력 형태를 정의하는 클래스
- 데이터를 입력하는 방식의 표준화
- 데이터 타입(Image, Text, Audio)에 따른 다른 입력 정의

``` python
import torch
from torch.utils.data import Dataset

class CustomDataset(Dataset):
    def __init__(self, text, labels):
        self.labels = labels
        self.data = text

    def __len__(self):
        return len(self.labels)
    
    def __getitem__(self, idx):
        label = self.labels[idx]
        text = self.data[idx]
        sample = {"Text": text, "Class": label}     # 흔히 dictionary 형태로 반환
        return sample
```

#### Dataset 클래스 생성 시 유의점
- 데이터 형태에 따라 각 함수를 다르게 정의
- 모든 것을 데이터 생성 시점에 처리할 필요는 없으며, image의 Tensor 변화는 학습에 필요한 시점에 변환
- 데이터셋에 대한 표준화된 처리방법 제공 요구
  - 후속 연구자에게 영향
- 최근에는 HuggingFace 등의 표준화된 라이브러리를 사용


### DataLoader 클래스
- Data의 Batch를 생성해주는 클래스
- 학습직전(GPU Feed 전) 데이터의 변환을 책임
- Tensor로 변환, Batch 처리가 주요 업무
- 병렬적인 데이터 전처리 코드의 고민 필요



## 구현
### nn.Module
딥러닝을 구성하는 Layer의 base class
- Input, Output, Forward, Backward(weights에 대한 Autograd) 정의
- 학습 대상이 되는 parameter(tensor) 정의

### nn.Parameter
- Tensor 클래스의 상속 클래스
- nn.Module 내에 attribute가 될 때 required_grad=True로 지정되어 학습 대상이 되는 Tensor로 취급
- 대부분의 layer에는 weights 값들이 지정되어 있으므로 직접 지정할 일은 거의 없음

### Backward
- Layer에 있는 Parameter들의 미분을 수행
- Forward의 결과값(model의 output;예측치)과 실제값간의 차이(loss)에 대해 미분을 수행
- 해당 값으로 Parameter 업데이트
- 실제 backward는 Module 단계에서 직접 지정 가능
  - 직접 쓸 일은 없지만 순서 이해할 필요가 있음
  - Module에서 backward와 optimizer는 오버라이딩을 통해 자동으로 설정

## Multi-GPU 학습

### 용어 정리
- Single vs Multi
  - Single: 1개
  - Multi: 2개 이상
- GPU vs Node
  - GPU: 컴퓨터 내부의 한 GPU
  - Node: 한 대의 컴퓨터
- Single Node Single GPU
- Single Node Multi GPU
- Multi Node Multi GPU

### Multi-GPU
데이터를 학습시키기 위한 두가지 방법 존재

#### 모델 Parallel
- 과거(Alexnet)부터 사용
- 모델의 병목, 파이프라인의 어려움 등으로 인해 고난이도 과제로 취급

```python
class Model(ResNet):
def __init__(self, *args, **kwargs):
    super(ModelParallelResNet50, self).__init__(
        Bottleneck, [3, 4, 6, 3], num_classes = num_classes, *args, **kwargs
    )
    self.seq1 = nn.Sequential(...).to("cuda:0")
    self.seq2 = nn.Sequential(...).to("cuda:1")

    self.fc.to('cuda:1')

def forward(self, x):
    x = self.seq2(self.seq1(x).to('cuda:1'))
    return self.fc(x.view(x.size(0), -1))
```

#### Data Parallel
- 데이터를 나눠 GPU에 할당 후 결과의 평균을 취하는 방법
- minibatch 수식과 유사하며, 한번에 여러 GPU에서 수행

```python
parallel_model = torch.nn.DataParallel(model)  # 단순히 데이터를 분배한 후 평균을 취함(GPU 사용 불균형 문제 발생, GPU 간의 병목에 따른 Batch 사이즈 감소, GIL)
DistributedDataParallel() # 각 CPU마다 Process 생성하여 개별 GPU에 할당(기본적으로 DataParallel로 하지만, 개별적으로 연산의 평균을 냄)

predictions = parallel_model(inputs)
loss = loss_function(predictions, labels)
loss.mean().backward()
optimizer.step()
predictions = parallel_model(inputs)
```


## 모델 관리
### 모델 저장
model.save()
- 학습 결과를 저장하기 위한 함수
- 모델 형태(architecture)와 파라미터를 저장
- 모델 학습 중간 과정의 저장을 통해 최선의 결과 모델을 선택
- 만들어진 모델을 외부 연구자와 공유하여 학습 재현성 향상

``` python
model = Net()   # 학습 모델
...

torch.save(model.state_dict(), "weights/model.pt")
```

### 모델 로드
model.load()
- 학습 가중치를 호출하기 위한 함수
- 모델 형태(architecture)와 파라미터를 호출

``` python
model = torch.load("weights/model.pt")
...

torch.save(model.state_dict(), "weights/model.pt")
```

### Layer 시각화
torchsummary 라이브러리을 통해 학습 레이어 시각화
```
pip install torchsummary
```

```python
import torch

model = Net()

summary(model, input_size=(3, 224, 224))
```

### checkpoints
학습의 중간 결과를 저장
- 최선의 결과 선택 가능
- earlystopping 기법 사용 시 이전 학습의 결과물을 저장
- loss와 metric 값을 지속적으로 확인 및 저장
- 일반적으로 epoch, loss, metric을 함께 저장하여 확인

> Earlystopping: n 지정 시, n회에 걸쳐 학습에 진전이 없을 시 종료하는 콜백 함수이다.

## Transfer learning
Pretrained model을 활용하여 본 모델 학습
- 다른 데이터셋으로 만든 모델을 현재 데이터에 적용
- 일반적으로 대용량 데이터셋으로 만들어진 모델의 성능이 높음
- 현재의 DL에서는 가장 일반적인 학습 기법
- backbone architecture가 잘 학습된 모델에서 일부분만 변경하여 학습을 수행

> Pretrained model: model.load와 같이 기존에 학습된 모델로써, 레이어 구조, 가중치 정보를 호출하여 모델을 응용할 수 있으며, 오픈소스로 제공되는 모델의 다양성이 점차 확대 중이다.

### Freezing
Pretrained model을 활용 시 모델의 일부분에 대해 frozen 진행
- 학습 레이어에 대해 required_grad를 False로 하여 frozen 처리
- 해당 Layer는 필터링을 진행하지만, 해당 레이어에서의 가중치는 그대로 보유

