---
title: '[AWS]CloudFormation'
author: juye-ops
date: 2023-11-21 01:00:00 +0900
categories: ['Infra', 'AWS']
tags: ['AWS']
render_with_liquid: false
---
*본 학습은 **따라하며 배우는 AWS 네트워크 입문** 서적을 통해 진행했습니다.*

<img src="/static/img/Study/Infra/aws-cloudformation.png">
_CloudFormation 스택 실습 목표_
# CloudFormation
AWS 인프라에 대해 코드로 개략적인 선언을 하는 방법
- IaC(Infrastructure as Code) 방식으로, 자신이 생성할 AWS 인프라 자원을 코드로 정의하여 자동으로 정의된 자원을 생성 혹은 제거 가능

## 템플릿
생성할 AWS 인프라 자원을 코드로 정의한 파일/확장자
- JSON 혹은 YAML

## 스택 생성
템플릿을 CloudFormation에 업로드하여 스택 생성
- 스택을 생성하면 템플릿에 정의된 AWS 인프라 자원에 대해 순서대로 자동 생성

## 스택 삭제
스택 생성에 의해 생성된 AWS 인프라 자원을 순서대로 자동 삭제

# CloudFormation 템플릿
```yaml
Parameters:
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access to the instances. Linked to AWS Parameter
    Type: AWS::EC2::KeyPair::KeyName
    ConstraintDescription: must be the name of an existing EC2 KeyPair.
  LatestAmiId:
    Description: (DO NOT CHANGE)
    Type: 'AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>'
    Default: '/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2'
    AllowedValues:
      - /aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2

Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref LatestAmiId
      InstanceType: t2.micro
      KeyName: !Ref KeyName
      Tags:
        - Key: Name
          Value: WebServer
      SecurityGroups:
        - !Ref MySG
      UserData:
        Fn::Base64:
          !Sub |
            #!/bin/bash
            yum install httpd -y
            systemctl start httpd && systemctl enable httpd
            echo "<h1>Test Web Server</h1>" > /var/www/html/index.html

  MySG:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP access via port 80 and SSH access via port 22
      SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: 80
        ToPort: 80
        CidrIp: 0.0.0.0/0
      - IpProtocol: tcp
        FromPort: 22
        ToPort: 22
        CidrIp: 0.0.0.0/0
```
## 스택 생성
### 템플릿 준비
1. "준비된 템플릿" 선택
2. 템플릿 파일 업로드를 통한 yaml 파일 등록

### 스택 세부 정보 지정
1. 스택 이름 작성
2. 파라미터 작성
  - KeyName: 자신의 키 페어 작성
  - Latest Ami Id: 수정 금지

### 스택 옵션 구성 및 DF-test
과정 생략 후 전송

## 스택 삭제
스택 선택 후 "삭제" 버튼 클릭
- 인스턴스에서 생성된 인스턴스 종료 확인