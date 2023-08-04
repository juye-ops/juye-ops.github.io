---
title: '이미지 분류와 객체 검출 기반의 컴퓨터 부품 조립 위치 확인 시스템'
author: juye-ops
date: 2020-10-01 10:00:00 +0900
categories: ['Memoir', 'Projects', 'KSC']
tags: ['AI', 'Classification', 'Object detection', 'Tensorflow', 'YoloV5', 'Selenium']
render_with_liquid: false
---

|**분류**|개인 프로젝트|
|**소속**|IXLAB|
|**개발 기간**|2020.09. ~ 2020.12.|
|**비고**||

# 📘 **프로젝트 소개**
---
## **개요**
PC의 부품 비용과 조립 난이도를 고려하여 초보자에게 발생하는 사고를 방지하기 위한 인공지능 서비스입니다.  

본 프로젝트의 주제는 인식된 컴퓨터 부품에 대해 메인보드 상 결합되어야 할 위치를 반환하는 것입니다.

데이터는 크롤링을 통해 수집하였으며, 부품 Classification은 ```Tensorflow```의 튜토리얼을 바탕으로 **98.9% 정확도**를 확인하였고, 메인보드 조립 위치 검출은 ```YoloV5``` 모델을 바탕으로 **96.8%의 mAP**를 확인하였습니다.

![Desktop View](/static/img/Projects/DAP/blueprint.png)
_프로젝트 요약도_

## **개발 환경 & 아키텍처**
- Backend: `Python`
- Image process: `OpenCV`
- Crawling: `Selenium`
- Classification: `Tensorflow` `MobileNetV2`
- Object detection: `YoloV5`

# 📜 **개발 방법**
---
## **데이터셋 구축**

||검출(메인보드) 데이터셋|분류(부품) 데이터셋|
|-:|:-:|:-:|
|개수|메인보드 600장|CPU 300장<br>그래픽카드 300장<br>RAM 300장|
|비고|CVAT를 통해 BBox Labeling 진행||

- 데이터 마이닝
  - Selenium을 통해 [Danawa](https://danawa.com/) 페이지의 키워드를 검색하여 크롤링
  - 검색된 키워드의 Thumbnail 이미지를 저장
- 데이터 증강
  - Rescale
  - Color Jitter

## **실험 결과**
- Classification
  - Model: `MobileNetV2`
  - Acc: 98.9%
- Object detection
  - Model: `YoloV5`
  - 96.8% mAP@0.5
  - 96.8% mAP@0.5:0.95

## **시스템 구현**
1. 메인보드 이미지 입력
   - 메인보드 상 조립 위치 Detection 수행
2. 부품 이미지 입력
   - 이미지 분류를 통한 부품 식별
3. 식별된 부품이 결합되어야 할 위치를 메인보드에 표시
   - 식별된 부품 이름이 메인보드 상 조립 위치의 이름과 같은 영역에 Annotating 진행


# 💡 **개발 경험 및 후기**
---
## 인공지능 첫 걸음
Classification과 Object detection을 결합한 AI 분야 첫 프로젝트이다.
다양한 기술을 많이 적용하고자 하였고, 그 결과, Crawling, Classification, Object detection의 기술을 삽입할 수 있었다.

본 프로젝트가 아직은 실용적이지 않다고 생각하며, Classification과 Detection을 결합하여 **새로운 Task를 생성**하는데에 데 큰 의의를 두었다.

앞으로도 이와 같이 **다양한 도전을 호기심과 함께 발현**하고 싶다.


# 🔗 관련 링크
---
- [Github Repo](https://github.com/juye-ops/detecting-assembling-position)
- [[DBpia] 이미지 분류와 객체 검출 기반의 컴퓨터 부품 조립 위치 확인 시스템](https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE10530016)