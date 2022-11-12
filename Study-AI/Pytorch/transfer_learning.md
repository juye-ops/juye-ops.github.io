## 전이 학습
Pretrained model을 활용하여 본 모델에 학습
- 다른 데이터셋으로 만든 모델을 현재 데이터에 적용
- 일반적으로 대용량 데이터셋으로 만들어진 모델의 성능이 높음
- 현재의 DL에서는 가장 일반적인 학습 기법
- backbone architecture가 잘 학습된 모델에서 일부분만 변경하여 학습을 수행

> Pretrained model: model.load와 같이 기존에 학습된 모델로써, 레이어 구조, 가중치 정보를 호출하여 모델을 응용할 수 있으며, 오픈소스로 제공되는 모델의 다양성이 점차 확대 중이다.

### Freezing
Pretrained model을 활용 시 모델의 일부분에 대해 frozen 진행
- 학습 레이어에 대해 required_grad를 False로 하여 frozen 처리
- 해당 Layer는 필터링을 진행하지만, 해당 레이어에서의 가중치는 그대로 보유

