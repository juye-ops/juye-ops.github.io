---
title: '2021 근골격계 동영상 데이터 인공지능 모델 알고리즘 개발 해커톤'
author: juye-ops
date: 2021-12-13 10:00:00 +0900
categories: ['Memoir', 'Competitions']
tags: ['Award', 'Competition', 'Video Classification']
render_with_liquid: false
---

# 📘 상세 설명
---

<img src="/static/img/Competitions/Muscul/pamphlet.png" width=400px>


## **예선(참가 신청)**

기간: 2021.11.18. ~ 2021.12.12.

**근골격 데이터를 활용한 아이디어** 제시
- 패턴 분석을 이용한 **1인 재활치료 시스템**
  - 조사 결과, 재활치료를 혼자 진행하고 싶어하는 인원이 다수로 식별
  - 재활치료 시 치료사의 **인적자원 축소**
  - 재활치료 별 정확한 동작을 학습하여 현재 자세와 학습된 모델의 유사도 측정 진행
  - Day by day로 자세 유사도의 평균을 저장해 **성장 정도 식별**

## 본선

> **해커톤 주제 변경**  
> 기존 해커톤 방향은 예선에서 제안한 아이디어를 3일 간 구현하는 것이었습니다.
{: .prompt-info}

첫 번째 미션으로는 재활치료 종류에 따라 **동영상을 분류**하는 것입니다.  
두 번째 미션으로는 동영상 Frame에 매칭되는 Sequence data의 의미를 파악하는 것입니다.  

기간: 2021.12.13. ~ 2021.12.15.

## 개발 방법
- 정적인 Frame 학습
  - 동영상의 모든 Frame을 각각 추론 후 최다 빈도에 대해 분류
    - 훈련 정확도는 높으나 실제 추론 결과 불량
  - LSTM을 이용한 Sequence data 분류
    - 훈련 정확도 및 실제 추론 결과 모두 불량


|최종 설계 방법|
|:-:|
|<img src="/static/img/Competitions/Muscul/method.png">|

- CRNN & Ensemble
  - 시계열 데이터를 학습의 Classic 모델인 ```LSTM``` 기법에 Ensemble 적용
    - 이미지를 ```LSTM```으로 학습하기 위해 CNN(`VGG16` Network)을 통한 이미지의 특징 벡터 추출
    - 이미지 특징 벡터 학습 모델과 Sequence Data 학습 모델을 Ensemble
    - 훈련 정확도 및 실제 추론 결과 모두 양호


|최종 모델의 정확도|
|:-:|
|<img src="/static/img/Competitions/Muscul/accuracy.png" width=400px>|

- Sequence 의미 파악
  - 모든 팀 구현 실패
  - 일반적인 좌표가 아니라 소수로 구성되어 의미 파악 가능성이 희미

# 👪 역할 및 개발 내용
---
- 예선 **아이디어 제안 및 채택**
  - 주도적으로 보고서를 작성하여 팀장으로 선발
- **Video to Image 변환**
  - 실제 사용할 때 실시간으로 분석하기 위해 디스크가 아닌 메모리 상으로 데이터 관리
- 동영상을 프레임별로 분류한 후 **CNN으로 추출**
- **Multi-Input** 기반 학습 진행
- **`LSTM`**을 이용하여 이미지 순간이 아닌 동영상을 문맥적으로 파악
  - `LSTM`을 적용하기 위해 이미지를 `VGG16` Network를 거쳐 1차원 특징벡터 추출
  - 영상과 Sequence Data에 대한 우수한 추론 결과 도출


# 💡 개발 경험 및 후기
---
## 메모리 부족
동영상을 프레임 별로 이미지화 할 때 메모리가 부족하여 Jupyter notebook 종료 현상이 발생했습니다.
Jupyter notebook에 대한 사용법이 익숙하지 않아 이를 확인하는 데에 많은 시간을 소비하였고, 이미지 크기를 축소하고 n 프레임 당 한 이미지를 추출함으로써 이를 해결할 수 있었습니다.

해커톤의 촉박한 시간으로 인해 어쩔 수 없이 허술하게 대비한 점이 많이 아쉬웠던 것 같습니다.

## CRNN 기법에 대한 첫 접근
기존에는 동영상에 대한 학습을 경험한 적이 없습니다.
또한, LSTM과 같은 시계열 학습 모델은 이론으로만 이해하고 있었습니다.
주어진 촉박한 시간에 '동영상은 *이미지의 시계열*' 데이터라는 것을 떠올렸고, 이러한 점을 팀원들의 양해를 구해 과감하게 적용해보았습니다.

위의 시도는 성공적으로 수상까지 이끌어 주었고, 딥러닝에 다시금 흥미를 느낄 수 있었습니다.
**CNN, LSTM의 개념을 제대로 이해**하고 있었기에 가능할 수 있었고, 추후 이러한 학습 기법을 CRNN으로 명칭한 것 까지 이해하였습니다.

비록 아주 기본적인 모델들을 바탕으로 결합한 것이 전부이지만, **순발력**을 바탕으로 이들을 적용하였고, 다방면에서 **팀장으로서 인정**받을 수 있었던 계기였습니다.

## 해커톤 경험
본선이 3일이지만 실질적으로 주어진 시간은 첫 날 오전과 마지막 날 오후를 제외한 48시간으로 매우 촉박했다.
당시 학교 시험 기간임에도 불구하고 해커톤을 위해 **약 3 + 1시간 정도의 수면 시간**을 가졌습니다.

이러한 **열정과 무모함**은 팀장으로서 **팀원의 기대를 충족**하고자 하는 마음에서 우러나왔던 것 같습니다. 

## 1위 솔루션
수상자 간에 진행한 PT 발표를 통해 1위의 솔루션을 참조할 수 있었습니다.
1위 같은 경우, CRNN을 사용한 것은 동일하였으나, 재활치료 동영상의 사이클을 파악하여 한 시퀀스에 대해서만 분류하였습니다.  
예를 들어, 팔굽혀펴기를 5회 실시하는 영상이 있다면, 5번의 사이클을 파악하여 그 중 1회만 학습하였습니다.

1위의 솔루션은 많은 곳에서 영감을 얻을 수 있었습니다.
프로젝트를 수행할 때 모델링에 더욱 신경을 썼던 우리 팀과 달리, 데이터를 직접 보고 특징을 분류하는 EDA 과정이 잘 이루어진 것 같았습니다.
또한, 동영상 전체에 한 사이클만 사용함으로써 메모리를 대폭 축소할 수 있다는 이점까지 확보할 수 있었을 것 같았습니다.

기본 모델을 구조적으로 잘 사용하긴 하였으나, 실질적으로 효율을 증대하기 위해서는 많이 부족했던 것 같아 반성하게 되었습니다.

# 🔗 관련 링크
---
- [Github 소스코드](https://github.com/juye-ops/Musculoskeletal)
- [2021 근골격계 동영상 데이터 인공지능 모델 알고리즘 개발 해커톤](http://dataton.kr/sub.php?code=6&mode=view&no=10&category=&page=1&search=&keyword=)