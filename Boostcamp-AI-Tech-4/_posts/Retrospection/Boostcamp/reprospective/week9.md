# 9주차 회고록
## 학습 내용
[9주차 정리 내용](https://github.com/juye-ops/TIL/blob/main/AI/README.md)

### AI서비스 개발
- Object detection 개론
  - mAP Metrix
- 2-Stage Detectors
  - R-CNN
  - Fast R-CNN
  - Faster R-CNN
- 1-Stage Detectors
  - SSD
  - Yolo
- Libraries
  - MMDetection
  - Detectron
- More
  - EfficientDet
  - Cascade R-CNN
  - Deformable Convolutional Networks
  - (Swin) Transformer
  - Ensemble

## 활동 내용
### 피어세션
- 팀 그라운드 룰
  - 등수에 연연하지 않고, 남들이 해보지 않는 새로운 시도를 두려워하지 않고 도전하기
  - 처음부터 큰 목표를 설정하기보단 작은 목표를 확실히 설정하고 점차 확장해 나가기
  - 결과를 도출해내는 과정을 잘 기록하고 정리하기
  - 사이좋게 지내기
  - Notion에 회의록 작성

- Level 2 대회 프레임 구축
  - Notion에 결과 기록
  - 메인 라이브러리 및 시각화 툴 고정
  - Seed 1로 설정

### 이벤트 세션
- 우팀소(우리 팀을 소개합니다)
  - 이전 기수 구성원과 현재 본인의 활동 범위 비교
  - 부스트 캠프에서 확보해야 할 메인 인사이트 파악

- 멘토 클래스
  - 팀원 소개 및 인사
  - 멘토님의 주 연구 분야인 ```Meta learning``` 에 대한 소개

- 마스터 클래스
  - LV2 대회 소개
  - Kaggle과 같은 외부 컴피티션에서 적용할만 한 EDA, 기법 등을 제안

- 오피스 아워
  - LV2 대회에서 Baseline의 ```mmdetection``` 프리뷰 제안

### 문제점 및 개선 방향
#### 문제점
- Object detection 난이도
  - Classification과 달리 직관적이지 않아 이해하는 데에 많은 시간 소요
  - Object detection 난이도에 따른 집중력 저해

#### 개선 방향
- Classification과의 비교
  - 다년 간 실습을 통해 코드와 함께 모델을 분석하고 원리도 이해하면서 학습
  - 실습 경험도 적고, 코드 수준도 높아 실습과 겸비하여 적극적으로 학습할 예정


### 회고
> Object detection 너무 어렵다.  
> Classification은 인간의 시각, 뇌를 비교하면서 표현이 가능했던 것 같았지만,  
> Object detection은 Localization과 Semantic의 loss를 파악하는 데에서 인간적으로 이해하기가 어려웠다.  
> 그리고 프로젝트 뿐만 아니라, 점차 드는 생각이 BBox를 이용한 Detection task는 실용적이지 못하다고 느꼈다.  
> 특히 Vision에서의 Anomaly Detection과 자율주행 외에는 어떻게 쓸 수 있을지에 대해 깊은 고민을 요구하는 것 같다.  
> 
> Level 3의 아이디에이션을 지속적으로 진행하고 있지만, 대회와 강의에 겹쳐 제대로 생각해보지 못했던 것 같다.  
> 부담을 줄이기 위해서 대회는 학습 레벨에 그쳐야겠다고 생각하게 되었다.  
>
> 아무리 어렵더라도 천천히 익히면서 미래를 생각하자고 다짐하였다.