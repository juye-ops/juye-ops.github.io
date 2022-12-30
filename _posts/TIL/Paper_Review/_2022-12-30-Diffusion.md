---
title: '[논문 리뷰] Denoising Diffusion Probabilistic Models'
author: juye-ops
date: 2022-01-01 10:00:00 +0900
categories: ['TIL', 'Paper review']
tags: ['Paper review', 'AI', 'Generative']
render_with_liquid: false
---

### 키워드
[Energy based model(EBM)](https://arxiv.org/abs/1609.03126): Energy function을 이용하는 생성모델
Score matching

# 요약

# 초록
## 기존 생성 모델
- 이미지나 오디오 합성 모델의 활약
  - Generative adversarial networks(GANs)
  - Auto-regressive models
  - Flows
  - Variational auto-encoder(VAEs)
- Energy-based Model과 Score matching 에선 GAN에 필적하는 이미지를 생성

## Diffusion probabilistic model
- Markov chain
  - Signal이 파괴될 때까지 샘플링의 반대방향으로 데이터에 Noise를 점진적으로 추가함으로써 Diffusion의 역행 과정을 학습
- 간단하며 학습에도 효율적이지만, 샘플의 퀄리티에 대해 입증 불가

## Denoising diffusion
- Diffusion 모델을 통해 때때로는 타 종류의 모델 보다 고퀄리티의 샘플을 생성