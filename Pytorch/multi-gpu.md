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