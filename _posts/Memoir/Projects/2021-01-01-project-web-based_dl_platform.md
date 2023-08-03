---
title: '객체 탐지 데이터 및 학습 관리를 위한 웹 기반 딥러닝 지원 시스템'
author: juye-ops
date: 2021-01-01 10:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['Infra', 'AI', 'Object detection', 'Communication']
render_with_liquid: false
---

|⚙ 개발 환경|💡오픈소스 & 라이브러리|
|:-:|:-:|
|`Docker` `MongoDB` `Python` `RabbitMQ` `Vue`|`COCO Annotator` `Flask` `YoloV5`|

# 📘 **상세 설명**
---

> 본 연구는 2020년도 경상북도 4차산업혁명 핵심기술개발사업의 지원을 받아 수행한 연구입니다.  
{: .prompt-info }


## **프로젝트 소개**

Object detection 학습 환경을 GUI로 제공함으로써 누구나 쉽게 접근할 수 있도록 장려하고자 합니다.  

오픈소스인 [COCO Annotator](https://github.com/jsbroks/coco-annotator)를 응용하여 제작한 웹 기반 **딥러닝 학습 제공 시스템**입니다.  
흔히 CLI 상으로 제공하는 딥러닝의 API를 GUI 형태로 제공하여 비전 기반 인공지능을 사용하는 데에 **우수한 접근성과 편의를 제공**합니다.  
Object detection 기법에 대한 Data 관리, 학습, 추론, 결과 식별 등, **MLOps의 시퀀스를 제공**합니다.  

*연구실에서 제안한 본 프로젝트의 궁극적인 목적은 `Few-shot Learning` 기법에 편의를 제공하는 것에 있습니다.*

## **개발 방법**
- 학습 모델 Pool 개발
  - Pool에 다량의 모델을 등록하여 학습 시 클라이언트가 웹 뷰에서 **학습 모델을 직접 선택**
- 학습 및 추론
  - 클라이언트가 직접 하이퍼파라미터 입력
  - REST API를 이용하여 서버에서 학습 진행
  - 클라이언트가 선택한 모델 별 Label format 변환
- 학습 과정 모니터링
  - Socket을 연결하여 실시간 학습 로그를 시각화
- 학습 결과로 추출된 가중치 파일 관리
  - 서버를 통한 실제 파일 등록
  - `MongoDB`를 이용한 성능 지표 및 하이퍼파라미터 기록

# 👪 **역할 및 개발 내용**
---
- On-prem 서버 운용 및 관리
- `Docker`를 이용한 인프라 관리
  - `Docker-compose`릁 통한 **MSA 적용**
- 기능 추가
  - Frontend에서 입력한 하이퍼 파라미터 전달
  - Backend에서 추출된 학습 결과를 파일 형태로 전달하기 위한 **직렬화 전송 기능** 구현
  - Backend에서 Socket을 통해 학습 및 추론의 진행도 로그를 웹 뷰에서 실시간으로 식별


# 💡 **개발 경험 및 후기**
---
## 오픈소스 활용
COCO Annotator, 학습 모델 등의 **오픈소스를 결합하여 새로운 시스템 개발**하였다. 
오픈소스 별 개발 환경이 다르므로 통일하는 작업이 보기보다 매우 어려운 것을 깨달았다.

또한, 오픈 소스를 통해 Server 형태의 COCO Annotator을 분석하면서 스스로가 여전히 부족하다는 것을 인지하였다.
코드 **템플릿과 컨벤션**이 잘 짜여져 있어 코드를 비교적 쉽게 리뷰할 수 있었다.
추후 프로그램을 개발한다면, 더욱 효율적인 인프라 및 코드 구조를 짜는 것에 집중하고자 한다.

## 협업 능력 향상
팀원 혹은 본인이 봉착한 난관을 **함께 해결하는 능력이 향상**하였다.
```Flask```를 통해 기능 간 데이터를 중개하여 **시스템에 대한 커뮤니케이션을 제공**하였다.
해당 작업을 진행할 때, 중개자는 양 기능의 데이터를 모두 이해해야 한다는 것을 인지하였다.
뿐만 아니라, **지속적으로 소통**을 제공하여 기능 간의 데이터를 수송신 할 때 **소통**을 통해 데이터 구조를 일관화 해야 한다는 것을 인지하였다.