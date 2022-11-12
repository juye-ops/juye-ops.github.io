## Recurrent Neural Networks(RNN)

### Autoregressive model
과거의 Time span을 고정하는 기법으로, AR(n)일 시, 과거 n 스텝에 의존

#### Markov model
직전 스텝의 과거에 의존하는 기법
- 이때 껏의 많은 정보를 포기

#### Latent autoregressive model
과거 정보를 요약하는 Hidden State를 형성

### RNN; Vanila RNN
Short-term dependencies
- Hidden State를 보유하여 과거를 기억하는 노드 형성
- 멀리 있는 기억 노드에 대해서 점차 잊게 되는 한계보유
- Gradient Vanishing/Exploding 현상 발생

|RNN 구조|Gradient Vanishing/Exploding|
|:-:|:-:|
|<img src = "../static/img/rnn.png">|<img src = "../static/img/gradient-vanishing.png">|


### Long Short Term Memory(LSTM)
3개의 입력을 받아 과거의 정보 유실 정도를 결정
- 입력(출력)
  - Input(Output): 현재 노드의 입력(출력)
  - Previous(Next) cell state: 이전(현재)까지의 노드 정보를 취합하여 요약
  - Previous(Next) hidden state: 이전(현재) 노드의 output
- 출력
  - Output
  - Next cell state
  - Next hidden state
- Gate
  - Forget gate: 정보의 유용함을 판단하여 현재까지의 정보(Cell state) 중 버릴 정보를 조정
  - Input gate: 현재 정보에서 Cell state에 등록할 정보를 선택
  - Output gate: 최종적으로 조작하여 다음 노드로 전달할 정보를 정리

<img src = ../static/img/lstm_summary.png height = 400px>

#### GRU
LSTM 구조에서 Gate를 2개로 줄여 구조적 단순함 식별


### Transformer
기존 seq2seq 모델과 달리, Attention 기법을 적용한 NLP 모델

- Encoder
  - Feed Forward Neural Network와 Self-Attention으로 구성
  - Self-Attention
    - 여러 언어가 Encoder의 입력으로 들어갈 때 각 단어가 다른 단어를 고려하여 인코딩
  - Feed Forward Neural Network
    - Self-Attention을 통해 인코딩된 각 단어를 일대일로 변환

---
<img src="../static/img/transformer1.png">

예시 문장: The animal didn`t cross the street, because it was too tired

위의 예시 문장에서 it이 무엇을 지칭하는지 아는 것이 번역의 핵심으로 취급한다.  
Self-Attention기법을 통해 it이라는 단어가 그 외의 모든 단어들과 비교하여 연관성을 학습한다.  

---
