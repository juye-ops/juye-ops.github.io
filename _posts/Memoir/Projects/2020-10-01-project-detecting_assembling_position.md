---
title: '이미지 분류와 객체 검출 기반의 컴퓨터 부품 조립 위치 확인 시스템'
author: juye-ops
date: 2020-10-01 10:00:00 +0900
categories: ['Memoir', 'Projects', 'KSC']
tags: ['AI', 'Classification', 'Object detection', 'Tensorflow', 'YoloV5', 'Selenium']
render_with_liquid: false
---

|⚙ 개발 환경|💡오픈소스 & 라이브러리|
|:-:|:-:|
|`Python`|`OpenCV` `Selenium` `Tensorflow` `YoloV5`|

# 📘 **상세 설명**
---

## **프로젝트 소개**
PC의 부품 비용과 조립 난이도를 고려하여 초보자에게 발생하는 사고를 방지하기 위한 인공지능 서비스입니다.  

본 프로젝트의 주제는 인식된 컴퓨터 부품에 대해 메인보드 상 결합되어야 할 위치를 반환하는 것입니다.

데이터는 크롤링을 통해 수집하였으며, 부품 Classification은 ```Tensorflow```의 튜토리얼을 바탕으로 **98.9% 정확도**를 확인하였고, 메인보드 조립 위치 검출은 ```YoloV5``` 모델을 바탕으로 **96.8%의 mAP**를 확인하였습니다.

![Desktop View](/static/img/Projects/DAP_blueprint.png)
_프로젝트 요약도_

## **개발 방법**
### **기술 스택**
### **데이터셋**
- 데이터 마이닝
  - Selenium을 통해 [Danawa](https://danawa.com/) 페이지의 키워드를 검색하여 크롤링
  - 검색된 키워드의 Thumbnail 이미지를 저장

||검출(메인보드) 데이터셋|분류(부품) 데이터셋|
|-:|:-:|:-:|
|개수|메인보드 600장|CPU 300장<br>그래픽카드 300장<br>RAM 300장|
|비고|CVAT를 통해 BBox Labeling 진행||

### **실험**

||Classification|Object detection|
|Model|`MobileNetV2`|`YoloV5`|
|Augmentation|Rescale, Color Jitter|Rescale, Color Jitter|
|정확도|98.9%|96.8% mAP@0.5<br>96.8% mAP@0.5:0.95|

### **추후 확장 방안**
- 부품 확장
  - CPU, RAM, 그래픽카드와 같은 주요 부품이 아닌, 케이블이나 핀에 대한 이미지도 추가로 학습

# 👪 **역할 및 개발 내용**
---
- 데이터 구축
  - Crawling 기법 적용
  - 메인보드 이미지에 대한 BBox Annotation
- 모델 분석 및 학습
  - Tensorflow 모델 및 튜토리얼 분석
  - YoloV5 구조 분석


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