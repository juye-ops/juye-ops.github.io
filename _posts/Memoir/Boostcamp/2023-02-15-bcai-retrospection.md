---
title: 'Boostcamp AI Tech 마지막 회고록'
author: juye-ops
date: 2023-02-15 10:00:00 +0900
categories: ['Memoir', 'Boostcamp']
tags: ['Boostcamp', 'AI']
render_with_liquid: false
---

# Boostcamp의 목적
네이버 커넥트재단에서 운영하는 **Boostcamp AI Tech 4기를 수료**하였다.
본 과정은 AI Engineer를 양성하기 위해 우수한 강사/멘토/운영진들로 구성되어 있으며, AI에 대한 지식을 견고하게 다룰 수 있었다.
지원할 당시와 지금은 약간 생각이 달라졌다.

지원할 때의 나는 방향성이 구체적이지 않았고, AI에 호기심이 많았으나 너무 Low-level 수준의 활용 능력을 가졌다.
따라서 'Boostcamp 떨어지면 AI는 등한시 해야겠다.'라는 생각을 가졌다.
Boostcamp에 합격하면서 AI에 흥미를 느껴 깊이 다루고자 하였지만, 이 역시 많은 계기로 인해 생각이 바뀌었다.
특히 AI는 너무 발빠르게 변화하고, 현재 배우고 있는 내용이 옳다고 100% 장담할 수 없다는 점이다.

생각이 바뀌게 된 시점은 최종 프로젝트를 수행하면서 바뀌었다.
최종 프로젝트를 수행하면서 Boostcamp에서 제공하는 환경에서 팀원들의 개발 환경을 장려하였다.
AI는 특히 모델에 따라 요구하는 사양이나 환경이 많이 달라진다.
이러한 점을 미루어 보아 Micro-service Architecture를 지향하였고, 이러한 서버 구축 경험은 팀원 중 나 밖에 없어서 이를 도맡아 처리하게 되었다.

제공하는 Container 환경에서의 제약 사항을 해결하는 것에 대해 퍼즐이 맞춰지는 것 같았고, 그러한 점에 다시금 큰 호감을 느끼게 되었다.
물론, 제공하는 서버에서 Privileged 권한이 없어 Docker in docker나 특정 오픈소스를 설치하는 것에 큰 제약이 따랐고, 이런 불가피한 사항은 해결하지 못했다.
하지만 이러한 점 역시 안된다는 것을 알 수 있고, **많은 것에 해답이 정해져 있는 것 같아 예전과 같은 호감을 다시금 가지게 되었다.**

Boostcamp의 기존 목적과는 엇갈렸지만, 더욱 **인프라나 클라우드 서비스에 관심을 가지게 되었다.**
지원하기 전 주 분야가 AI Engineering, 보조 분야가 Infra/System Engineering이었다면, 수료하고 난 후에는 서로 뒤바뀐 것 같다.

'이럴 거면 AI를 왜 배웠지?' 라는 생각보다 AI에 대해 기본을 배웠다고 생각한다.
학부에서 운영체제, 안드로이드, 웹, 앱, 데이터베이스 등을 배우고, 인공지능 역시 배우는데, 학부에서의 인공지능은 기본이라고도 할 수 없을 만큼 원리 정도만 배우는게 현실이다.
인프라 같은 경우 개발 경험이 많을 수록 해당 경험을 발현하여 더 좋은 환경을 구축할 수 있을 것이라고 생각한다.
이번 부스트캠프를 통해 **AI에 대해 기본을 제대로 다진 것 같아** 매우 의미 있었다고 생각한다.

# 활동
## 학습
개인적으로는 소속감이 뛰어난 성격이라 지금까지의 모든 환경에 만족했는데, 시간이 갈수록 지방대의 한계가 보이면서 스스로가 지방대인 것이 큰 약점이라고 생각하게 되었다.
이번 부스트캠프의 우수한 캠퍼분들을 통해 공부 방법도 바뀐 것 같다.
원래는 주어진 자료를 통째로 외우고 실습하는 성격이었고, 실습이 제한된 환경에 있어서 많은 어려움이 따랐다.
당시에는 이를 글로 저장하는 행위 자체가 기억에 도움이 되지 않고, 시간도 낭비된다는 생각이 더 들었다.

현재는 **기록을 통해 다시 한 번 복습하거나 필요할 때 해당 기록을 바탕으로 활동을 진행한다.**
남들이 기록한 것을 계속 찾아보는 것 보다 스스로가 무엇을 정리한 지 알고, 해당 글을 본인 글에서 찾으면 된다는 큰 장점에 매료되었다.

스스로가 하던 공부법은 학부 성적을 취득하기에 적절하였던 것 같다.
CS나 다양한 지식을 바탕으로 **블로그를 채워 스스로 많은 도움을 제공하고자 한다.**

## 피어세션 & 프로젝트
Level 1때 와는 달리, Level 2에서 피어세션이 더욱 꽃이라고 느꼈다.
Level 1에서는 약간 방향감이 잡히지 않았고, 랜덤 팀 배정으로 인해 늦게나마 친해질 때 쯤 Level 2로 가게 되었다.
특히 Level 1 때 팀원 모두가 인공지능 경험이 없어서 혼자 부담을 짊어지고 가는 느낌이 없지 않아 있었다.

Level 2에서는 기존 경험이 없더라도 Level 1에서의 경험을 바탕으로 감을 충분히 익힌 상태였고, 특히 구팀을 할 때 대학원 진학 예정자 위주로 모아 팀원들의 열정이 가득했다.
대회 경험이 적어 구체적으로 어떻게 Score를 높이는지에 대해 깊은 감은 없었으나, Code-level에서 깊이 분석하면서 성장하는 모습이 인상 깊었다.

최종 프로젝트는 방향을 늦게 수립했다.
그럼에도 불구하고 팀원들은 체계적으로 업무를 분담하였고, 그 결과 최종 네트워킹 데이에서의 방명록 수가 압도적으로 많았다.
팀원들의 소극적인 성격을 고려하여 의견 제시할 때에는 팀원들의 피드백을 한 명 한 명 꼭 확인하였다.
얼버무리면서 넘어가는 것 보다 최소한의 불만도 들으려고 했던 것이 프로젝트를 성공으로 이끌 수 있던 이유 중 하나라고 생각한다.

또한, 이렇게 성공적으로 프로젝트를 마무리 할 수 있는 이유는 팀의 분위기 때문이었다.
나는 초반에 어색한 사이를 최대한 깨려고 노력하였고, 결과적으로 소극적이라고 생각한 팀원들의 활기찬 모습과 함께 프로젝트를 수행할 수 있었다.
팀의 분위기를 주도하는 데에는 이러한 점 뿐만 아니라, **모두가 친구로서 서로를 대한 것도 있다고 생각한다.**
업무 중과 달리, 업무 후에는 그 어떤 친구들 만큼 편하게 장난도 치고 놀기도 한 팀이었다.

업무 중의 고통도, 업무 후의 웃음도 나눈 관계에서 '이러한 팀을 위해 하나라도 더 해주고 싶다'라는 생각이 많이 들었다.
밤샘도 마다 않았으며, 누군가의 Trouble shooting에 적극적으로 기여하였던 것 같습니다.
그 어떤 팀보다 이상적이라고 생각했고, **앞으로의 팀 활동에서 이러한 분위기를 가질 수 있도록 주도하고자 한다.**

## 이벤트 세션
활동을 장려하기 위한 스페셜 피어세션, 오피스아워, 마스터클래스, 두런두런 등의 많은 이벤트 세션들이 있었다.
이러한 활동이 도움이 되었냐고 물어본다면, 반은 맞고 반은 아니라고 대답할 것 같다.
말 그대로 어떠한 활동은 도움 되었고, 어떠한 활동은 도움되지 않았다.
내용적으로 도움이 되지 않은 것보다, 다른 활동의 일정을 고려하였을 때 촉박하게 진행하는 세션이 소수로 있었다.
따라서 불가피하게 이벤트 세션 중에 다른 활동을 진행하여야 했다.
놓친 영상은 추후 영상으로 재 확인하였고, 시간 낭비 하는 것이 아닐까 많이 생각하였다.

스페셜 피어세션은 타 도메인과 섞어서 진행하는 랜덤 피어세션이다.
다양한 도메인에서의 다양한 의견을 받을 수 있었고, 다양한 사람들 덕분에 프로젝트 및 진로에 대해 많은 도움을 얻을 수 있었던 것 같다.

오피스아워, 마스터클래스, 두런두런과 같은 활동을 통해 직무에 대한 시야를 매우 넓힐 수 있었던 것 같다.
회고록 역시 부스트캠프 덕분에 시작하였으며, 점점 이러한 것들에 대한 중요성을 느낀다.