## 2 Stage Detectors

### Overview
#### Sliding Window
- 일종의 window로 입력 이미지를 스캔하여 후보 region으로 등록
- 수 많은 연산과 낮은 정확도 반환

#### Selective Search
- 이미지의 low-level 특성을 Segmentation하여 점차적으로 확장

### R-CNN
#### Pipeline
1. 입력 이미지 받기
2. Selective Search를 통해 약 2000개의 RoI(Region of Interest)를 추출
3. RoI의 크기를 조절해 모두 동일한 사이즈로 변경
    - CNN의 마지막 FC Layer의 입력 사이즈
4. RoI를 CNN에 넣어 feature 추출
    - 각 region마다 4096-dim feature vector 추출(2000*4096)
    - Pretrained AlexNet 구조 활용  
5. CNN을 통해 나온 feature를 SVM에 넣어 분류 진행
    - 클래스 개수가 C일 때 배경 여부까지 총 C+1개와 Confidence scores를 추출
6. CNN을 통해 나온 feature를 regression을 통해 bounding box 예측(RoI 미세 조정)

#### Training
- AlexNet
  - Domain specific finetuning
  - Dataset
    - IoU > 0.5: Positive samples
    - IoU <> 0.5: Negative samples
    - Batch
      - Positive samples: 32
      - Negative samples: 96
- Linear SVM
  - Dataset
    - Ground truth: Positive samples
    - IoU < 0.3: Negative samples
    - Batch
      - Positive samples: 32
      - Negative samples: 96
  - Hard Negative Mining
    - 배경으로 식별하기 어려운 샘플들을 강제로 다음 배치의 Negative sample로 Mining 하는 방법
    - Hard Negative: False Positive
- BBox Regressor
  - Dataset
    - IoUI > 0.6: Positive samples
  - Loss function
    - MSE Loss

#### 단점
- 2000개의 Region을 각각 CNN 통과
  - 연산량 상승 및 속도 저하
- 사이즈에 따른 강제 Warping
  - 성능 하락 우려
- CNN, SVM, BBox Regressor을 각각 따로 학습
- End-to-End가 아니므로 구조적 측면에서 한계 발생

### SPPNet
- 입력 이미지에 대해 Convolution 연산 
- Convolution 결과인 Feature vector에 대해 Spatial Pyramid Pooling 기법 수행
- Warping 과정 생략

#### Spatial Pyramid Pooling
[SPPNet 논문 리뷰](https://deep-learning-study.tistory.com/445)
- 여전히 단점 존재
  - CNN, SVM, BBox Regressor을 각각 따로 학습
  - End-to-End가 아니므로 구조적 측면에서 한계 발생