# Pytorch

## Pytorch 기초

### Pytorch
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