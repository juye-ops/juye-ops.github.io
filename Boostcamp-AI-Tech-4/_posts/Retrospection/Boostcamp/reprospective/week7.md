# 7주차 회고록 - Wrap Up
## Wrap Up
### 대회 결과
- Public
  - Val F1 Score: 0.7488
  - Accuracy: 80.6190%
- Private
  - Val F1 Score: 0.7229
  - Accuracy: 79.0635%

### 적용 기술
**Augmentations**
- Albumentations 라이브러리를 이용한 Augmentation 진행
- 나이
    |Augmentation|Parameter|Description|
    |:-:|:-:|:-:|
    |GrayScale||흑백 이미지 변환|
    |CenterCrop|384|중앙 영역 잘라내기|
    |Sharpening|alpha = (0.5, 1)|이미지 선명화|
    |Horizontal Flip|p = 0.3|p 확률에 따른 좌우 반전|
    |Normalize|mean = (0.485, 0.456, 0.406) <br> std = (0.229, 0.224, 0.225)|이미지 선명화|

- 성별
    |Augmentation|Parameter|Description|
    |:-:|:-:|:-:|
    |GrayScale||흑백 이미지 변환|
    |UnderCrop|img_size = 384|하단 중앙 영역 잘라내기|
    |Sharpening|alpha = (0.5, 1)|이미지 선명화|
    |Horizontal Flip|p = 0.3|p 확률에 따른 좌우 반전|
    |Normalize|mean = (0.485, 0.456, 0.406) <br> std = (0.229, 0.224, 0.225)|이미지 선명화|

- 마스크
  |Augmentation|Parameter|Description|
  |:-:|:-:|:-:|
  |GrayScale||흑백 이미지 변환|
  |RandomResizedCrop|img_size = 384 <br> scale = (0.8, 1.0)|중앙 영역 잘라내기|
  |Sharpening|alpha = (0.5, 1)|이미지 선명화|
  |Horizontal Flip|p = 0.3|p 확률에 따른 좌우 반전|
  |Normalize|mean = (0.485, 0.456, 0.406) <br> std = (0.229, 0.224, 0.225)|이미지 선명화|

**모델링: Ensemble**
- 나이, 성별, 마스크 분류 모델을 각각 학습하여 Inference 레벨에서 Ensemble 진행
- MobileNet V3를 통하여 신속한 모델링 완성
- S.O.T.A.의 Image Classification 정보를 바탕으로 Pretrained Model 선정
- EfficientNet V2, Swin, ViT 등의 모델 이용
- EfficientNet V2 Large
  - S.O.T.A.의 Cifar 100 데이터셋 기준 SAM Optimizer와 함께 2위에 등극

**학습 방법**
- 나이와 연령의 경우 2700명에 대해 각각 동일한 정보를 보유하므로 CSV의 각 Row에 해당하는 7장의 이미지 중 1장을 랜덤으로 선택하여 학습
- 마스크의 경우 2700명에 대해 7장의 이미지가 분류 대상이므로 모든 이미지$(2700*7=18900)$에 대해 학습
- Validation은 각 도메인에서 8:2로 적용
- 각 도메인에 대한 모델은 EfficientNet V2 Large 모델을 이용
- Hyper-Parameter
  - Loss Function: Focal with Label Smoothing
  - Optimizer: SAM
  - Learning rate: 0.01

**학습 결과**
- 나이
  - Val F1 Score: 86.4%
  - 대부분 범주의 경계에 있는 20대 후반, 50대 후반에서 오분류

- 성별
  - Val F1 Score: 99.3%
  - 머리카락 길이나 체형에 따라 오분류

- 마스크
  - Val F1 Score: 99.5%
  - 마스크의 경우, 대부분 입술이 보이면 이상 착용자도 미착용으로 오분류

### 한계
- EDA
  - 데이터를 과학적으로 보지 않고 단순 이미지로 접근
- 나이 분류
  - 나이가 18세부터 60세 까지 넓은 범위로 분포
  - 실제 사람이 보기에도 분류가 모호
- Augmentation 기법
  - Crop, Resize, Sharpening 등과 같은 Albumentations에서 제공하는 Soft Augmentation 기법만 적용
  - 파라미터에 따른 Visualization 미진행
- 개인 코드 분석
  - 팀원의 경험이 미흡해 베이스라인 코드를 분석하고, 개인적으로 Ensemble 모델을 제작
  - 경험이 비교적 있음에도 역할 분배를 적극적으로 못한 아쉬움이 존재
  - 팀원 별 개인적으로 코드 분석을 진행하여 학습을 위한 스펙트럼이 축소

### 느낀 점
- **코드 분석**을 잘하자
  > 베이스라인 코드를 참고하지 않고 직접 코드를 작성하였다.  
  > 베이스라인 코드를 참고하지 않은 이유는 베이스라인 코드를 보았을 때 2700장에 사람들을 18900장의 이미지로 펼치고 Train과 Validation으로 Split하였다.  
  > 문제는, 이렇게 되면 Age와 Gender같은 경우 동일한 사람에 대해 Train과 Validation으로 분류될 수도 있다는 점이다.  
  > 뿐만 아니라, 코드가 너무 종속적으로 구현되어 수정에 크게 닫혀있는 것처럼 보였다.  
  > 이들은 코드를 직접 구현한 주된 이유이다.  

- **코드 구조화**를 잘하자
  > 코드를 직접 제작하면서 어떻게하면 효율적으로 코드를 분류할 수 있을까라는 생각을 많이 했다.  
  > 신경을 썼음에도 불구하고 K-Fold를 적용하고자 하였으나, 클래스 내부에서 통합적으로 구축된 구조 때문에 제한되었다.  
  > Pytorch Template과 타 경진대회의 베이스라인 코드를 참조하여 Revision을 통해 다시 코드를 작성하여 멘토님께 Review를 받은 결과 템플릿 구조에 대해서는 좋은 평을 받았다.  
  > K-Fold를 적용하진 않았지만, 적용할 수 있게 개선하였고, 기존에 비해 더욱 간결해졌다.  
  > Ensemble 모델을 신경써서 더욱 난해해지긴 했지만, 추후 적용한다면 본 템플릿을 이용할 것 같다.  

- **지식**을 제대로 이해하자
  > 데이터를 학습하기 위해 다양한 기법을 적용하고자 하였다.  
  > SAM Optimizer와 다양한 Loss function을 이해하였지만 최종적으로 EMA는 적용하지 못하였다.  
  > 단순히 적용법을 모를 뿐만 아니라, 원리도 이해하지 못하기 때문에 더욱 와닿았다.  
  > 돌이켜보면 SAM Optimizer도 원리를 이해하지 못한 채 예제만 사용했고, EMA는 적용조차 못했다.  
  > 추후 멘토님의 조언 덕분에 적용하는 방법을 알았지만, 이를 설명하기엔 아직 많이 부족한 것 같아 차마 적용하지 못하였다.  
  > 항상 배우는 자세로 임하고자 하며, 실습이 선행되는 버릇은 조금 위험하다고 생각하게 되었다.  

- **성장도** > 정확도
  > 본 대회는 내부에서 진행하는 작은 경진대회이지만, 현재는 경험이라고 표현하고 싶다.  
  > 강의에서 이해하지 못한 데이터 영역부터 Focal Loss나 Freezing과 같은 학습 영역까지, 실습을 통해 익히는 나에겐 최고의 학습 경험이었다.  
  > 모델링은 타 활동에서 많이 다루어보아 EDA, Data Visualization이나 외부 SOTA에서 사용한 기법을 적용하는 데 큰 의미를 가졌다.  
  > 다른 팀(9조, 12조)에 비해선 EDA나 Visualization이 매우 미흡하긴 하였지만, 처음 진행한 경험을 바탕으로 추후 더욱 넓게 분석하고 활용하고자 한다.  

## 활동 내용
### 이벤트 세션
- 멘토 클래스
  - 대회 코드 리뷰
  - EMA 이해
  - 논문 리뷰 예정

- 오피스 아워
  - 클라우드에 대한 이해

- 마스터 클래스
  - 대회 우수 팀의 발표와 마스터의 피드백을 통해 본인 코드와 비교

- 스페셜 피어세션
  - 다양한 팀에 대해 적용 기법, 독특한 방법, 적용했지만 안됐던 방법 등을 공유하면서 공감대 형성
