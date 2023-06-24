---
title: '[Infra] Cloud'
author: juye-ops
date: 2022-01-01 10:00:00 +0900
categories: ['Study', 'Infra']
tags: ['Infra', 'Cloud']
render_with_liquid: false
---

# Cloud
## 전통적인 서버
- 물리적 공간, 확장성을 고려한 서버실을 운영
- 전기, 에어컨 등 서버가 급작스럽게 종료되지 않도록 환경 마련
- 트래픽에 따른 즉각적인 서버 사양 조정 지원

## Cloud 서버
- 전통적인 서버의 문제점을 완화하기 위한 클라우드 서비스가 발전
- 서버 개설 이후 개발자가 직접 설정해야 하는 작업 등을 클라우드에서 쉽게 처리 가능
  - 프레임워크를 내장한 AWS EMR, GCP dataproc 등을 활용
  - Jupyter notebook도 Interpreter 설정에 따른 일종의 클라우드

# Services
## 서비스 종류
- CSP(Cloud Solution Provider): 공공 클라우드 인프라, 플랫폼 서비스를 제공하는 업체를 의미
- SaaS(Software as a service): 서비스형 소프트웨어, 사용자에게 제공되는 소프트웨어를 가상화하여 제공
  - 다른 설정 없이 서비스만 이용
  - Gmail, Slack 등
- PaaS(Platform as a service): 서비스형 플랫폼으로써, 주로 응용 프로그램을 개발할 때 필요한 플랫폼을 제공
  - 코드만 올려서 돌릴 수 있도록 구성
  - Firebase, Google app engine 등
- IaaS(Infrastructure as a service): 서비스형 인프라로써, 확장성이 높고 자동화된 컴퓨팅 리소스를 가상화하여 제공
  - 원하는 사양의 가상 머신이나 스토리지를 선택하고 이용한 시간이나 데이터 양에 따라 비용을 지불
  - AWS EC2 등
- AIaaS(AI as a service): 서비스형 인공지능으로써, 다양한 AI 기반 기능을 포함하여 타사 공급업체가 고객사에 서비스 형태로 제공하는 인공지능 소프트웨어(즉시 사용할 수 있는 AI 제품)

## Computing services
연산을 수행하는(Computing) 서비스
- 가상 컴퓨터, 서버 제공
- CPU, Memory, GPU 등의 환경을 선택
- '인스턴스'라는 단위로 생성하여 사용

### Serverless computing
코드를 클라우드에 제출하면 해당 코드로 서버를 실행하는 형태
- Micro service로 많이 활용
- 요청 부하에 따라 자동으로 확장(Auto scaling)

### Statelsess container
Docker를 사용한 Container 기반으로 서버를 실행하는 구조
- Docker image를 업로드하면 해당 이미지 기반으로 서버를 실행해주는 형태
- 요청 부하에 따라 자동으로 확장(Auto scaling)

## Database services
### Object storage
다양한 Object를 저장할 수 있는 저장소
- 다양한 형태의 데이터를 저장할 수 있으며, API를 통해 데이터에 접근
- 데이터 저장 비용이 저렴해지는 추세

## #Database(RDB)
클라우드가 제공하는 Database를 활용
- 웹/앱 서비스와 연결된 경우가 많으며, 대표적으로 MySQL, PosgreSQL 등을 사용
- 저장된 데이터를 어떻게 사용하냐에 따라 어디에 저장할지를 결정

## Data warehouse
Database 및 Object storage에 있는 데이터 등을 모두 모은 저장소
- 데이터 분석에 특화된 Database

||AWS|GCP|Azure|
|:-:|:-:|:-:|:-:|
|**Computing service<br>(Server)**|Elastic Compute<br>(EC2)|Compute Engine|Virtual machine|
|**Serverless computing**|Lambda|Cloud Function|Azure Function|
|**Stateless container**|ECS|Cloud Run|Container Instance|
|**Object storage**|S3|Cloud Storage|Blob Storage|
|**Database(RDB)**|Amazon RDS|Cloud SQL|Azure SQL|
|**Data warehouse**|Redshift|BigQuery|SynapseAnalytics|
|**AI Platform**|SageMaker|Vertex AI|Azure Machine Learning|
|**Kubernetes**|EKS<br>(Elastic Kubernetes Service)|GKE<br>(Google Kubernetes Engine)|AKS<br>(Azure Kubernetes Service)|