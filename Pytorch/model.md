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
$ pip install torchsummary
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