## Tensorboard
DL 시각화 핵심 도구
- Tensorflow의 프로젝트로 만들어진 시각화 도구
- 학습 그래프, metric, 학습 결과의 시각화 지원
- Pytorch도 연결 가능

### 표현 값
- Scalar: metric 등 상수 값의 연속(epoch)을 표시
- Graph: 모델의 Computational graph를 표시
- Histogram: weight 등 값의 분포를 표현
- Image/Text: 예측 값과 실제 값을 비교
- mesh: 3d 형태의 데이터를 표현하는 도구


### 기록

#### SummaryWriter
- 기록을 위한 객체
- logs_base_dir
  - exp_n(실험 디렉터리)에 대한 루트 디렉터리 혹은 특정 exp_n 디렉터리
  - 루트 디렉터리 지정 시, 내부 하위폴더에 대한 모든 tensor board를 시각화
  - 특정 exp_n 디렉터리 지정 시, 해당 실험에 대해 tensor board를 시각화 
- 

```python

from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter(logs_base_dir)
```

#### Scalar
writer.add_scalar(*arg)
- arg[0] = 카테고리
- arg[1] = 그래프 값
- arg[2] = epoch(x축)의 값

```python
for n_iter in range(100):
    writer.add_scalar("Loss/train", np.random.random(), n_iter)
    writer.add_scalar("Loss/test", np.random.random(), n_iter)
    writer.add_scalar("Accuracy/train", np.random.random(), n_iter)
    writer.add_scalar("Accuracy/test", np.random.random(), n_iter)
writer.flush() # 값 기록
```

#### Histogram
writer.add_histogram(*arg)

```python
for i in range(10):
    writer.add_histogram("distribution centers", x + i, i)
writer.close()
```

#### Image
writer.add_images(*args)
- arg[0]: 제목
- arg[1]: 이미지에 대한 배치
```python
writer.add_images('my_image_batch', img_batch, 0)
```

