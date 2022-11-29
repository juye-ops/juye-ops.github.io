# Masked Auto-Encoder

### keywords
- patch / token: (이미지) 파편
- 

### 요약
> MAE is Scalable **Self-supervised learners**.  
> MAE의 Concept는 패치를 랜덤으로 Masking하고, Masking된 Missing Pixels를 재 구성 하는 것이다.  
> MAE의 Design은 다음 두 가지를 따르며, 무거운 모델에 대한 efficiently and effectively하게 학습이 가능하다.
> 
> 1. 비대칭 인코더-디코더 구조이다.  
> 인코더는 without Mask patches에 대해서 동작하며, 디코더는 latent representations와 mask patches를 통해 원본 이미지를 재구성한다.  
> 2. 75%와 같은 매우 큰 영역에 대해 마스킹을 처리하게 될 시 의미있는 supervisory task를 반환할 것으로 예상한다.
>
> 해당 Design은 3배 이상의 속도와 함께 정확도 향상을 도출한다.
> 

## 초록
**NLP 모델의 Solutions**: 데이터의 일부를 제거하고, 제거된 영역을 예측
- GPT
  - Auto Regressive
- BERT
  - Masked Auto-Encoding

*대략 1000억개의 Parameter를 소비*  

### NLP vs Vision
1. 아키텍쳐가 다르다.
   - Vision은 CNN이 압도적으로 널리 활용
   - Masked token이나 Positional embedding 같은 ```indicators```를 결합하는 데에 장애
     - ViT에서 다룸으로써 어느정도 해결
2. 정보 밀집도가 다르다
   - 언어: 인간이 만들어낸 일종의 신호로, 매우 큰 정보를 포함
     - 문장에서 Masking 후 예측 할 때 ```Sophisticated languages understanding```을 유도
   - 이미지: 공간적 중복성(정보)을 보유한 자연 신호
     - 패치가 없어져도 주변 패치의 parts, objects, scenes를 high-level로 이해하여 회복 가능
     - 차이를 극복하기 위해 이미지의 매우 많은 영역을 랜덤으로 Masking
3. Decoder