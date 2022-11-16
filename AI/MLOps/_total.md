# MLOps
**참고 블로그**
- [[MLOps 정의] MLOps가 무엇인고?](https://jaemunbro.medium.com/mlops%EA%B0%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B3%A0-84f68e4690be)

## MLOps 개론

### 모델 개발 프로세스 - Research
보통 자신의 컴퓨터, 서버 인스턴스 등에서 실행하며, 고정된 데이터를 통해 학습
1. 문제 정의
2. EDA
3. Feature Engineering
4. Train
5. Predict


### 모델 개발 프로세스 - Production
학습된 모델을 앱, 웹 서비스에서 사용할 수 있도록 만드는 과정이며 **Real World, Production 환경에 모델을 배포**한다고 표현
1. 문제 정의
2. EDA
3. Feature Engineering
4. Train
5. Predict
6. **Deploy**

---
모델이 배포되었다고 가정할 때, 모델의 결과값이 이상한 경우가 존재  
- Input 데이터가 범위를 벗어나는 이상한 경우가 존재하는 등 원인 파악 요구  
- Research 단계에선 Outlier로 제외할 수 있지만, 실제 서비스에선 제외가 힘들며, 별도 처리를 요구

모델 성능이 계속 변경
- 예측 값과 실제 레이블을 요구
- 정형(Tabular) 데이터에서는 정확히 알 수 있지만, 비정형 데이터는 모호한 경우가 다수

새로운 모델이 더 안좋다면
- 과거의 모델을 다시 사용할 지에 대한 판단 고려
- Research 환경에서 좋던 모델이 Production 환경에선 미흡할 수 있음
- 이전 모델을 다시 사용하기 위한 작업을 요구
---


### MLOps: ML(Machine Learning) + Ops(Operations)
- 머신러닝 모델을 운영하면서 반복적으로 필요한 업무를 자동화하는 과정
- 머신러닝 엔지니어링 + 데이터 엔지니어링 + 클라우드 + 인프라
- 머신러닝 모델 개발(ML Dev)과 머신러닝 모델 운영(Ops)에서 사용되는 문제와 반복을 최소화하고, 비즈니스 가치를 창출하는 것이 목표
- 모델링에 집중할 수 있도록 관련된 인프라를 만들고, 자동으로 운영되도록 만드는 일

*머신러닝 모델링 코드는 머신러닝 시스템 중 일부에 불과*
<img src="../static/img/mlops_code.png">

**MLOps의 목표**는 빠른시간 내에 가장 적은 위험을 부담하며 아이디어 단계부터 Production단계까지 ML프로젝트를 진행할 수 있도록 기술적 마찰을 줄이는 것

||Research ML|Production ML|
|:-:|:-:|:-:|
|**데이터**|고정|계속 변함(Dynamic-Shifting)|
|**중요 요소**|모델 성능(Accuracy, Loss 등)|모델 성능, 빠른 Inference 속도, 해석|
|**도전 과제**|더 좋은 성능을 내는 모델(SOTA), 새로운 구조의 모델|안정적인 운영, 전체 시스템 구조|
|**학습**|데이터를 고정한 채 모델 구조, 파라미터 기반 재학습|시간 흐름에 따라 데이터가 변경되어 재학습|
|**목적**|논문 출판|서비스에서 문제 해결|
|**표현**|Offline|Online|


## MLOps Component
MLOps의 구성 요소에 따라 역할 분리

### Infra
배포하기 위한 성능 지표
- 클라우드
  - AWS, GCP, Azure, NCP 등
- 온프레미스
  - 회사나 대학원의 전산실에 서버를 직접 설치

#### Server Infra
- 예상하는 트래픽
- 서버의 CPU, Memory 성능
- 스케일 업, 스케일 아웃의 가능성
- 자체 서버 vs 클라우드

#### GPU Infra
- Local GPU vs Cloud GPU

### Serving
- Batch serving
  - 많은 양의 데이터를 일정 주기에 따라 예측
- Online serving
  - 한 번에 하나씩(실시간으로) 예측
  - 병목이 없으며, 확장 가능하도록 준비

<img src="../static/img/serving.png" width="1000px">


### Experiment, Model Management
- 파라미터, 모델 구조 등의 조합에 따른 성능 지표를 관리
- 모델 Artifact, 이미지 등의 부산물 관리
- 모델 생성일, 성능, 모델의 메타 정보 등을 기록
- 여러 모델을 통일된 규격에 따라 운영 

### Feature Store
- 학습과 serving에 사용되는 모든 feature들을 모아둔 저장소
- 대용량 배치 처리와 low latency의 실시간 서빙을 모두 지원하여야 함

### Data Validation
- Feature의 분포 확인
- 데이터 검증에 실패하면 신규 모델의 배포를 중지하며, 해당 의사결정 역시 자동화로 진행
- Data/Model/Concept drift
  - 모델을 새로운 데이터에 맞게 꾸준히 학습하거나 목적 등을 전환하는 행위

<img src="../static/img/drift.png" width = "1000px">


### Continuous Training
- Retrain 과정
- 새로운 데이터를 사용하여 프로덕션 모델이 자동으로 학습
- 성능을 확인하여 학습 여부를 따지는 Pipeline이 Data Processing/Model training/Model evaluation engine에 영향을 미쳐 학습 진행

<img src="../static/img/continuous_training.png" width = 1000px>

### Monitoring
- 모델의 지표, 인프라 성능 지표 등을 기록

### AutoML
- 데이터에 맞는 모델을 자동으로 제작