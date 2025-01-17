---
title: 'GRU 기반 행동 분석 모델을 이용한 어린이 이상 행동 검출 시스템'
author: juye-ops
date: 2022-03-14 10:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['KIIT', 'Awards', 'AI', 'Video Classification']
render_with_liquid: false
---

|**분류**|팀 프로젝트|
|**참여 인원**|3명|
|**소속**|Haemu|
|**개발 기간**|2022.03. ~ 2022.08.|
|**비고**|2022 한국정보기술학회 대학생 논문경진대회 금상 수상|

# 📘 **프로젝트 소개**
---
## **개요**
본 연구는 아동학대 발생 사례가 증가하고, 어린이 대상 AI 연구가 적다는 관점을 토대로 아동 학대에 대한 문제점을 식별하여 **사회적 문제를 해결하는 데에 기여**하고자 진행한 프로젝트입니다.  
본 프로젝트는 동영상 분석을 기반으로 하여 어린이의 이상 행동을 식별하는 시스템을 제작하였습니다.

<img src="/static/img/Projects/GRU/result.png">

## **개발 환경 & 아키텍처**
- Backend: `Python`
- Feature extraction: `Tensorflow` `MobileNetV3`
- Image process: `OpenCV`
- Human detection: `YoloV4`

# 📜 **개발 방법**
---
> 논문에서는 크로마키 데이터셋만을 활용하였으며, 추후 Object detection을 적용하였습니다.  
> 따라서, 본 내용은 논문의 확장 연구까지 진행한 결과입니다.
{: .prompt-info }

## **데이터셋**
### [어린이 보호구역 내 어린이 도로보행 위험행동 영상 학습용 데이터](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=169)
- 어린이 보호구역(스쿨존) 내 어린이 도로보행 위험영상을 다양하게 확보하기 위해 시나리오를 기반으로 촬영하여 수집된 데이터
- 데이터셋 구성
  - 10가지의 이상행동
  - 동영상: 1200클립/300시간
  - 상황 별 동영상셋을 폴더 별로 분리
  - 객체 별 Annotation 정보
- 구축 기관: 비엔지티

### [이상행동 CCTV 영상](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=realm&dataSetSn=171)
- 공공 보안용 CCTV에서 이상행동 발생 시 검출하기 위한 인공지능 학습용 데이터
- 데이터셋 구성
    - 12가지의 이상행동
    - 동영상: 8400클립/700시간
    - 12가지의 이상행동
    - 동영상: 8400클립/700시간
- 구축 기관: 마인즈랩

### **실험**
- 데이터 전처리
  - 원본 영상을 대상으로 `Optical flow`를 적용하여 Optical field 추출
  - `YoloV4` tiny 모델을 통해 원본 영상에서 사람 객체의 Bounding Box 좌표 식별
  - 사람의 Bounding Box 좌표에 해당하는 Optical field만 남겨 바람, 조명과 같은 노이즈를 제거
  - `MobileNetV3` 모델을 통하여 추출한 프레임을 1차원 특징 벡터로 변환
  - 30개의 시계열 특징 벡터를 묶어서 numpy 파일로 저장
- GRU 학습 진행
  - numpy 파일을 읽어 GRU 층에 입력
  - FC 층을 통한 폭력 상황 구분 진행
- 추론
  - 동영상 파일 좌측 상단에 폭력 상황 여부 시각화


|Video Feature 추출|Feature vector를 바탕으로 한 GRU 모델|
|:-:|:-:|
|<img src="/static/img/Projects/GRU/architecture1.png">|<img src="/static/img/Projects/GRU/architecture2.png">|


### **추후 확장 방안**
- 데이터 포맷
  - Generator 기법 적용 예정
    - 프레임의 특징벡터를 추출하여 30개 씩 numpy 파일로 변환하는 데 많은 시간 소요
    - 동영상을 프레임으로 분리할 시 파일 크기가 약 5배 이상 상승
    - 동영상을 프레임으로 분리하는 것에 시공간적 낭비가 심함
    - Tensorflow의 Generator를 통해 데이터를 Iterator와 같이 호출하여 시공간 복잡도 절약 예상
    - 실시간 추론 가능성 식별
- Segmentation
  - 본 연구에서는 사람의 Optical field 영역을 확보하여 사람의 형상만 추출
  - 사람의 Segmentation 학습 모델을 이용한다면 더욱 정확하고 우수한 모델이 될 것으로 예상
- Categories
  - 아동 학대 뿐만 아니라 실신, 사고 등의 이상행동을 식별하고자 하였으나 정확도를 우선 높이기 위해 폭력 여부만 식별
  - 추후 모델을 개선하여 복수 카테고리에 대한 분류 진행

# 👪 **역할 및 개발 내용**
---
- 아이디어 제시
  - Video와 같이 **시계열 Vision 데이터를 활용**하는 아이디어 제시
- 데이터 전처리 효율 증대
  - Video 데이터의 **FPS를 낮추어 Frame 단위로 분해**
  - Functional 코드 작성을 통한 **메모리 점유율 감소 및 데이터 정제 효율 상승**
- 모델 제작
  - `MobileNet V3`를 통한 **특징 벡터 추출**
  - GRU 기반 **모델 제작**

# 💡 **개발 경험 및 후기**
---
## 관련 연구 조사 경험
본 연구를 진행하기 앞서 관련 도메인을 많이 분석하였습니다.

특히 아동학대에 대한 현황과 문제점을 파악하기 위해 **다양한 기사를 스크랩하였고, 본 연구를 진행하는 데 동기가 크게 부여**되었다.

모델 같은 경우, 초반에는 사람 별 행동을 분류하기 위해 Tracking 모델을 적극적으로 찾았다.
객체 별 행동을 통해 학대를 분류하고자 하였으나, 한 영상 내에 Input 크기가 가변적이어야 하는 문제점을 요구하였다.

시간 문제로 인해 기존 진행했던 [경진대회](/posts/competition-musculoskeletal)를 참고하여 분류 Task로 적용하도록 변경되었다.
위의 경진대회에서는 ```LSTM```을 사용하였다면 ```GRU``` 모델을 사용하여 **시계열 모델을 다양하게 적용**하고자 하였다.

비록 ```LSTM```과 ```GRU```를 이론적으로만 이해한 채로 연구를 진행하였지만, 결과는 성공적으로 보일 수 있었다.

어떠한 아이디어를 실현하기 위한 **관련 연구를 조사하는 것은 상상 이상으로 큰 공부가 될 수 있다**는 것을 몸소 느낄 수 있었다.

## 동영상 전처리
동영상은 압축이 되어 있어서 그런지 모든 프레임을 분리한 이미지 세트와는 현저히 다른 데이터 크기를 보유하였다.
원래 목표는 실시간 경고신호를 제공하는 것이 주 목적이었으나, 현재는 동영상으로 프레임을 분리하여 학습하도록 구성하였다.
그에 따라, 저장공간 및 메모리 사용량이 매우 비효율적이었고, Pythonic Code에 대한 지식이 부족하여 Iterator를 개발 완료 후 떠올렸다.
본 서비스를 실시간 서비스로 제공하기 위해서는 **모델 뿐만이 아니라 데이터 전처리에도 경량화가 필수**라고 생각하게 되었다.

Python의 지식이 나름 갖춰져 있다고 생각하였으나, 아직은 다양한 부분에서 즉각적으로 무엇을 쓰는 것이 옳은 지에 대한 판단은 더딘 것 같다.
어쩌면 **비록 배우는 시간이 걸린다 하더라도, Pythonic Code를 확실히 다지는 것이 앞으로의 코딩이 훨씬 효율적이고 빠를 수 있을 것 같다**고 느꼈다.

## 주성분 파악
과목 담당 교수님께서 동영상 주 성분은 ```Optical flow```로 분석하도록 권장하셨다.
하지만 본 연구에서 제안한 문제점은 Optical field에 빛, 바람에 의한 타 객체의 흔들림 등의 노이즈가 식별되었고, 이를 해결하기 위해 ```YoloV4```의 Human detection을 통한 후처리를 진행해주었다.
본 해결법은 정확도는 상승하였지만, 학습 뿐만 아니라 추론 속도를 늦추게 만들었다.
또한, 정지된 CCTV에만 이용될 수 있도록 국한되었다.

Human segmentation 모델을 통해 노이즈를 제거하고자 하였으나, Human part segmentation과 같이 task가 정확히 일치하는 모델은 찾기 힘들었다.
추후 가능하다면, Human part segmentation의 의의가 무엇인지 판별하여 본 연구에 적용하기 위한 **타당성이 적절한 지 평가**하고자 한다.

# 🔗 관련 링크
---
1. [Github Repo (수정 중)](https://github.com/kit-haemu/Abnormal-Behavior-Detection)
2. [[DBpia] GRU 기반 행동 분석 모델을 이용한 어린이 이상 행동 검출 시스템](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11082631)