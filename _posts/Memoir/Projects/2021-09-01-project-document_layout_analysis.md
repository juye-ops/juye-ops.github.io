---
title: '문서 객체의 랜덤 배치를 통한 문서 레이아웃 분석기'
author: juye-ops
date: 2021-09-01 10:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['AI', 'Object detection', 'YoloV5', 'OpenCV', 'KIIT']
render_with_liquid: false
---

|**분류**|팀 프로젝트|
|**참여 인원**|2명|
|**소속**||
|**개발 기간**|2021.09. ~ 2021.12.|
|**비고**||

# 📘 **프로젝트 소개**
---
## **개요**
본 프로젝트는 Document Layout Analysis 분야에서 레이아웃을 검출하기 위한 학습 모델을 제시합니다.  
약 36만 장으로 구성된 PublayNet의 극히 일부만 사용하여 연구를 진행하였습니다.

데이터를 재구성하고자 `OpenCV` 모듈을 통해 모든 Layout을 분리하였고, 빈 여백에 배치함으로써 데이터를 조정하였습니다.
성능을 평가하기 위해 Document objects의 배치 방법을 두 가지로 구현하였고, 데이터셋의 양을 변경하면서 성능을 비교하였습니다.

Document objects 배치 방법에 따라 최대 **94.57%, 69.51%의 mAP@0.5 정확도를 도출**하였습니다.

<img src="/static/img/Projects/DLA/blueprint.png">
_프로젝트 요약도_

## **개발 환경 & 아키텍처**
- Backend: `Python`
- Object detection: `YoloV5`
- Image process: `OpenCV`

# 📜 **개발 방법**
---
## **기본 데이터셋**
### [PublayNet](https://developer.ibm.com/exchanges/data/all/publaynet/)
- Document layout analysis를 위한 논문, 기사 이미지
- 96GB / 약 36만 장
- 카테고리 = **Figure**, **Text**, **Title**, List, **Table**
- 데이터셋 재구성
  - Train 양 조정
    - Random Augmentation을 위해 PublayNet에서 제공하는 Train 0 만 활용
    - Document object를 랜덤으로 백지 상에 배치하여 15000, 30000, 45000 장의 이미지를 재생성
  - EDA 후 카테고리 재구성
    - List가 Text와 너무 유사한 양상으로 표현하므로 제거
    - Title은 `OpenCV`를 활용하여 특정 좌표보다 위에 존제하는 대제목을 *Title*로 두고, 아래에 존재하는 소제목은 *Subtitle*로 분류
    - 기존 *Figure*는 *Figure(그림)*과 *Graph(그래프)*로 재분류하여 학습
  - 최종 데이터셋
    - 데이터셋 수: 15000, 30000, 45000 장
    - 카테고리: **Figure**, Graph, Subtitle, **Table**, **Text**, **Title**

## **Object 랜덤 배치 알고리즘**
- 같은 확률로 배치할 시 Subtitle과 같이 **빈도 수가 잦은 이미지의 정확도 하락**
  - (배치되는 카테고리 총 개수) / (전체 이미지 수)의 확률로 배치 시 **이미지가 많은 카테고리가 독점**하는 현상 발생
  - 최종적으로 위의 방법에서 **정규 분포를 따르는 확률**로 재조정

### RPLC vs RPSLC
- RPLC: 백지 상에 Document object를 랜덤으로 배치
  1. Zero like를 함수를 이용한 여백 이미지 행렬과 Masking 행렬 구비
  2. 임의의 Document object를 선택
  3. 이미지 행렬에 Document object 부여
     - 랜덤 좌표 5번 내에 Masking에 겹치지 않을 시 Document Object 배치
     - 정상적으로 Document object가 배치될 시 해당 영역에 대해 Masking
  4. 문서 영역의 50%를 초과할 때 배치 종료 후 데이터 생성
- RPSLC: 1열 혹은 2열로 구성된 기사/논문 형식으로 배치
  1. 대 제목을 특정 확률로 가장 상단에 배치
  2. $y$ 좌표를 고정하고 $x_1$(1열), $x_2$(2열) 좌표를 선정
  3. 1열에 가장 먼저 Document object를 배치 후 $y$값 수정
  4. 1열과 2열 중 $y$값이 낮은 열에 Object document 배치
  5. 사전에 선정한 $y_{Thres}$ 좌표를 초과할 시 데이터 생성

<img src="/static/img/Projects/DLA/RPLCvsRPSLC.png">
_RPLC(좌) 이미지와 RPSLC(우) 이미지_

## **실험**
- 배치 방법에 따른 정확도 분석
  - RPLC: **94.57%**(mAP@0.5)
  - RPSLC: **69.51%**(mAP@0.5)

|RPLC 데이터 학습 시 추론 결과|RPSLC 데이터 학습 시 추론 결과|
|:-:|:-:|
|<img src="/static/img/Projects/DLA/RPLC_inference.png">|<img src="/static/img/Projects/DLA/RPSLC_inference.png">|

# 👪 **역할 및 개발 내용**
---
- **아이디어 제시** 및 **연구 방향성 주도**
- `Linux` 기반의 **학습 서버**(교내 지원) **관리** 및 **환경 설정**
- `OpenCV` 라이브러리를 이용한 **데이터 생성 알고리즘** 고안 및 구현
- **배치 알고리즘 테스트**
  - 레이아웃 배치 빈도 외에 데이터의 타당성을 따지기 위해 **잦은 시행착오** 요구
- 학습용 **신경망 모델 선별**

# 💡 **개발 경험 및 후기**
---
## 배치 알고리즘
인공지능 프로젝트 임에도 불구하고 EDA나 전처리 때의 라이브러리 활용, 알고리즘 등의 능력과 같이 **기본적인 프로그래밍 역량이 요구**되었다. 어떻게 보면 당연한 사실이긴 하지만, 늘 짜여진 템플릿에 의존하던 모습을 보였던 것 같다. **컨벤션이나 템플릿을 갖추는 것은 물론, 효율적인 프로그램을 설계하고 제작하는 것이 모든 분야 개발자의 주요 역량**이라는 점을 다시금 새겼다.

## 아이디어의 변경
본 프로젝트는 진행한 교내 *오픈소스 프로젝트* 강의를 통해 진행하였다.

---
- 기존 아이디어
  - 단일 객체만을 보유한 이미지 분류 데이터셋을 랜덤으로 배치하여 Detection에서 배경이 갖는 Semantic 정보의 세기를 이해
  - 배치되는 위치를 바탕으로 자동 레이블링 기능을 제공하기 때문에 이미지 분류 데이터셋임에도 불구하고 객체 검출 학습에 이용 가능
  - 랜덤으로 배치되는 만큼 데이터 증강 기능까지 제공할 수 있을 것으로 예상
- 수정 아이디어: Document Layout Analysis
  - 담당 교수님의 제안에 따른 아이디어 변경
  - Vision과 NLP를 결합한 멀티모달로 문서를 잘 해석하기 위해 회자되는 영역

---

강의 담당 교수님께서 기존 아이디어를 Document layout analysis 분야로 방향을 변경하였고, Document layout같은 경우는 배경 정보가 없기 때문에 기존 실험과는 거리가 멀어졌다.
해당 교수님은 논문 작성에 가산점을 부여하였고, 이미 실험적으로 증명된 것을 스스로 학습하는 것 보다 새로운 것에 대한 연구를 강요하였다.  

당시에 학점을 중요하게 생각하여 본 프로젝트를 계기로 인공지능과 교내 커리큘럼에 괴리감을 느꼈다.
만약 교수님에게 데이터의 Semantic 정보를 깊이 이해하고 분석하기 위해 기존의 실험을 요구했다면, 매 순간의 나의 모습에서 한 걸음 더 나아간 내가 될 수 있지 않았을까라는 아쉬움이 남아있다.

---
# 🔗 관련 링크
- [[DBpia] 문서 객체의 랜덤 배치를 통한 문서 레이아웃 분석기](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10664634)