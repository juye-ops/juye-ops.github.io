---
title: '[AWS]VPC 고급'
author: juye-ops
date: 2023-11-24 00:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

# VPC 엔드포인트
AWS의 퍼블릭 서비스나 직접적으로 생성한 AWS 서비스에 대해 직접적으로 접근할 수 있는 프라이빗 액세스 기능
- 예를 들어, S3 스토리지 서비스에 대해 생성한 VPC에서 접근하려고 한다면, VPC 엔드포인트 기능을 통해 AWS 내부의 프라이빗 연결 가능

## 유형
- 엔드포인트: AWS 퍼블릭 서비스에 대상으로 연결
  - 게이트웨이 엔드포인트: AWS 퍼블릭 서비스 중 S3와 DynamoDB에 대한 연결
  - 인터페이스 엔드포인트: 위 대상 외에 나머지 AWS 퍼블릭 서비스에 대한 연결
    - 가상 네트워크 인터페이스 형식
    - 프라이빗 서브넷에 배치
- 엔드포인트 서비스: 사용자가 직접 생성한 서비스에 대해 연결

<img src="/static/img/Study/Infra/aws-endpoint-target_architecture.png">
_엔드포인트 구조_

<img src="/static/img/Study/Infra/aws-endpoint-s3_architecture.png">
_VPC 게이트웨이 엔드포인트 생성 후 S3 통신 흐름 도식화_

<img src="/static/img/Study/Infra/aws-endpoint-cloudformation_architecture.png">
_VPC 인터페이스 엔드포인트 생성 후 CloudFormation 통신 흐름 도식화_

<img src="/static/img/Study/Infra/aws-eps_architecture.png">
_VPC 엔드포인트 및 서비스를 통한 프라이빗 링크 통신 흐름_

## 특징
- 보안 측면 강화: 프라이빗 연결을 통해 외부 구간으로 노출이 되지 않음
- 서비스 제약: 연결 대상 서비스는 동일 리전에 속한 서비스만 가능
- VPC 종속: 오직 VPC 하나에만 연결 가능(다수의 VPC에 종속 불가)
- 권한 제어: AWS IAM 기능을 통해 정책을 수립하여 VPC 엔드포인트에 대한 권한 부여가 가능

# 배치 그룹(Placement Group)
그룹 내 인스턴스의 배치를 조정하는 기능
- 물리 호스트의 장애에 대해 상호 간 영향도를 최소화하고 장애를 줄이기 위해 하드웨어에 최대한 분산하여 배치
- 인스턴스의 배치가 분산되는 상황이 모두 좋은 것은 아니며, 워크로드에 따라 인스턴스의 배치 위치를 조정하는 것이 유리한 경우도 존재

## 종류
### 클러스터 배치 그룹
인스턴스의 하드웨어 배치를 서로 근접하게 위치
- 서로 인접하게 배치하여 지연과 성능을 보장
- 고성능 컴퓨팅 환경에서 수많은 애플리케이션의 긴밀한 통신 관계에서 낮은 지연 시간과 높은 네트워크 성능 요구
- 하나의 가용영역에 종속
- 그룹 내 인스턴스는 동일한 인스턴스 유형을 사용하도록 권고

<img src="/static/img/Study/Infra/aws-placementgroup-cluster.png">
_클러스터 배치 그룹에서 인스턴스 배치_

### 파티션 배치 그룹
인스턴스를 논리적인 세그먼트로 분산
- 하나의 파티션에 존재하는 인스턴스는 다른 파티션의 인스턴스와 하드웨어를 공유하지 않아 상호 영향을 미치지 않음
- 가용 영역 당 최대 7개의 파티션 보유 가능
- 파티션 배치 그룹에서 실행할 수 있는 인스턴스 숫자는 계정 제한의 적용을 받음

<img src="/static/img/Study/Infra/aws-placementgroup-partition.png">
_파티션 배치 그룹에서 인스턴스 배치_

### 분산형 배치 그룹
서로 다른 하드웨어로 분산하여 배치
- 인스턴스 간의 상호 장애 영향도를 최소화
- 주로 중요한 애플리케이션의 고가용성을 보장받기 위해 사용
- 각각 고유한 랙에 배치된 인스턴스 그룹이며, 랙마다 자체 네트워크 및 전원 존재
- 가용 영역당 7개의 인스턴스로 제한

<img src="/static/img/Study/Infra/aws-placementgroup-spread.png">
_분산형 배치 그룹에서 인스턴스 배치_

# 메타 데이터
객체에 대한 Key&Value 집합 데이터

|키|설명|키|설명|
|:-|:-|:-|:-|:-|
|ami-id|AMI ID|placement/availability-zone|인스턴스의 가용 영역 정보|
|ami-launch-index|인스턴스 시작 순서|public-hostname|퍼블릭 IP의 DNS 호스트 이름|
|hostname|프라이빗 IP의 DNS 호스트 이름|public-ipv4|퍼블릭 IP 주소|
|instance-id|인스턴스 ID|public-keys/|퍼블릭 키 정보|
|instance-type|인스턴스 유형|security-groups|인스턴스에 적용된 보안 그룹|
|local-ipv4|프라이빗 IP 주소|services/domain|AWS 리소스 도메인 정보|
|mac|인스턴스의 MAC 주소|services/partition|리소스가 있는 파티션 정보|
|network/|네트워크 정보(하위 메뉴 존재)|||

## EC2 인스턴스 메타데이터 확인
169.254.169.254 라는 링크-로컬 주소를 통해 HTTP 요청과 응답으로 메타데이터 호출 가능

[인스턴스 종류 확인 방법](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html)