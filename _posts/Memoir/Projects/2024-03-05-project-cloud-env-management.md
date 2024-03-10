---
title: 'Cloud Env Management'
author: juye-ops
date: 2024-03-05 00:00:00 +0900
categories: ['Memoir', 'Projects']
tags: ['Cloud', 'AWS', 'Hyper-V', 'OpenStack','VMWare', 'VBox', 'Libreswan']
render_with_liquid: false
---

|**분류**|개인 프로젝트|
|**참여 인원**|1명|
|**개발 기간**|2023.12. ~ |
|**비고**||

# 📘 **상세 설명**
---
## 소개
AWS와 호스트 VM(2대)에 대해 Site-to-Site(IPSec) VPN을 통한 하이브리드 클라우드를 구축하여 환경을 제작합니다.
나아가, 서브넷 내부는 NAT를 통해 네트워크를 관리하고, 호스트 VM에 쿠버네티스 클러스터를 구축합니다.

## 개발 환경 & 아키텍처
- Cloud: `AWS`
- Host: `Hyper-V`
- VPN Tool: `Libreswan`

<img src="/static/img/Projects/CEM/dev-architecture.png">
_최종(목표) 아키텍처_

# 📜 **개발 방법**
---
## VM Hypervisor(2형) 비교 분석
<table>
<tr><th>플랫폼</th><th>장점</th><th>단점</th></tr>
<tr>
    <td><strong>VMWare Player</strong></td>
    <td>
        <ul>
        <li>비교적 안정적</li>
        </ul>
    </td>
    <td>
        <ul>
        <li>구형 UI</li>
        <li>네트워크 서브넷 관리 제한</li>
        </ul>
    </td>
</tr>
<tr>
    <td><strong>Virtual Box</strong></td>
    <td>
        <ul>
        <li>직관적인 UI</li>
        <li>네트워크 관리 용이</li>
        </ul>
    </td>
    <td>
        <ul>
        <li>불안정적</li>
        <li>상시 스냅샷 요구</li>
        </ul>
    </td>
</tr>
<tr>
    <td><strong>Hyper-V</strong></td>
    <td>
        <ul>
        <li>안정적</li>
        <li>네트워크 관리 용이</li>
        </ul>
    </td>
    <td>
        <ul>
        <li>초기 구축에 대한 복잡도</li>
        <li>동적 디스크 및 메모리가 비교적 빠듯함(Linux 한정?)</li>
        </ul>
    </td>
</tr>
</table>

## VM 환경 구축
Hyper-V 채택

### Private Network 구축
- 가상 네트워크를 형성
- Windows의 NAT 기능을 통해 외부 네트워크 연결

### Kubernetes 클러스터 구축
- cri-dockerd를 통한 쿠버네티스 클러스터 구축
- CNI: WeaveNet

## 클라우드 플랫폼 비교 분석

<table>
<tr><th>플랫폼</th><th>장점</th><th>단점</th></tr>
<tr>
    <td><strong>AWS</strong></td>
    <td>
        <ul>
        <li>다수의 공개 자료</li>
        <li>점유율 1위</li>
        </ul>
    </td>
    <td>
        <ul>
        <li>구형 UI</li>
        <li>어색한 키워드</li>
        </ul>
    </td>
</tr>
<tr>
    <td><strong>OpenStack</strong></td>
    <td>
        <ul>
        <li>비교적 명확한 Well-known 키워드</li>
        </ul>
    </td>
    <td>
        <ul>
        <li>이미지, 프로젝트를 일일이 관리하는 클라우드 제공자 입장</li>
        <li>중첩가상화로 VM 내부에서 구축 시 외부 네트워크와 연결이 제한</li>
        </ul>
    </td>
</tr>
</table>

## 클라우드 환경 개발
AWS 채택

### VPC 구축
- 네트워크
  - IGW 생성
  - 프라이빗 서브넷 생성
  - Routing table에 IGW와 서브넷를 연결
- 인스턴스
  - EIP 생성 후 연결

### VPN 구축
- 네트워크
  - VGW 생성 후 VPC에 연결
  - 호스트 외부 아이피에 대한 CGW 생성

## VPN 툴 비교 분석

<table>
<tr><th>플랫폼</th><th>장점</th><th>단점</th></tr>
<tr>
    <td><strong>Libreswan</strong></td>
    <td>
        <ul>
        <li>다수의 공개 자료</li>
        </ul>
    </td>
    <td>
        <ul>
        <li>AWS에서 직접 지원하는 것이 아니므로, 구성에서 수정 필요</li>
        </ul>
    </td>
</tr>
<tr>
    <td><strong>OpenVPN</strong></td>
    <td>
    </td>
    <td>
        <ul>
        <li>Client(SSL/TLS) VPN</li>
        <li>하이브리드 클라우드 제작에 부적합</li>
        </ul>
    </td>
</tr>
</table>
### OpenVPN
Client(SSL/TLS) VPN 오픈소스
- 하이브리드 클라우드 제작에 부적합

### Libreswan
IPSec VPN 오픈소스
- 장점
  - 다수의 공개 자료
- 단점
  - AWS에서 직접 지원하는 것이 아니므로, OpenSwan 구성에서 수정 필요


# 💡 **개발 경험 및 후기**
---
## 클라우드 구축
이전엔 클라우드 비용이 잘못 관리하면 폭탄 맞을까봐 접근하지 못했다.
실제로, AWS 서적 공부 후 EIP를 보내지 않아 불가피하게도 수만원이 빠져나간 경험도 있다.

나아가, VM안에 OpenStack을 구축했는데, 중첩 가상화 이슈인지, 내부 인스턴스에서 외부 네트워크가 연결되지 않는 문제점이 식별되었다.
분명, 다른 사람들이 사용하는 걸 보면 Vbox에서도 돼서 Vbox에 다시 구축해보았는데도 되지 않았다.
NAT의 문제도 어떤 문제도 식별하기 힘들어서 불가피하게 AWS를 사용했다.
하지만, OpenStack의 UI가 훨씬 소규모이고 축약돼있어서 빠르게 이해할 수 있었다.

이러한 경험을 바탕으로 AWS에 접근했을 때, 훨씬 빠른 속도로 개발할 수 있었다.
처음에는 VPC에 구축한 인스턴스에 연결이 되지 않았고, 구글링을 해도 SSH 포트 개방하라는 글들만 있었다.
하지만, 다양한 인스턴스를 구축하는 실험을 통해 외부 게이트웨이를 등록해야 연결이 된다는 점을 식별했다.
특히 직접 실습을 통해 라우팅테이블, 서브넷, IGW 등을 연계하면서 네트워크에 대한 이해도가 급속도로 성장할 수 있었던 것 같다.

## VPN
IGW, CGW, VGW 등 정말 헷갈리는 요소가 많았고, 구글링을 통해 이해하려고 해도 잘 이해가 되지 않았다.
하지만 VPN을 구축하는 과정과 VPN 아키텍처를 구글링하면서 이에 대한 시야가 트이기 시작했다.

처음에는 OpenVPN으로 구축을 성공했는데, 전혀 Site-to-site를 쓰는게 아니어서 이게 맞냐는 의구심이 들었다.
아니나 다를까, OpenVPN은 클라이언트 네트워크였고, 만약 이렇게 구축을 하게 된다면 각각의 노드에서 연결하여 메시 형태로 구축하게 될 것이라고 생각이 들었다.
따라서, 다시 IPSec 툴을 찾아보고 적용할 수 있었다.

Libreswan을 적용하기 위해 정말 많은 시행착오를 거쳤다.
특히, Site-to-Site VPN을 구축하고 구성 파일을 다운로드해서 적용했는데, 별 오류 로그가 없이 status가 활성화 됐던 것이다.
하지만 이 상태에서 Loaded와 Active 모두 0이었고, VPN Tunnel마저 Down으로 있었다.
처음에는 VM이 NAT로 구성되어 있어 NAT-Traversal을 사용해야 하냐는 의문이 많았지만, 정말 많은 Docs를 찾아보아도 마땅한 해결책이 없었다.
심지어 Libreswan은 NAT Traversal을 기본적으로 지원한다는 것이었다.
수많은 구글링 끝에 conf 파일의 tunnel1이라는 이름만 실행할 수 있는 명령어를 쳐보았는데, 지원하지 않는 IKE 인증 메소드였다.

뿐만 아니라 VM(A)에서 AWS와 VPN 터널링을 했는데, VM(B)에서는 AWS 인스턴스와 통신이 되지 않았다.
현재는 VM(B) 라우팅 테이블에 추가해준 형태로 처리를 했다.

# 🔗 관련 링크
---