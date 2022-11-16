## Neck
Low Level의 feature는 Semantic이 약하고, High Level의 feature는 Localization이 약하므로 다양한 크기의 객체를 더욱 잘 탐지하기 위해 Feature Level끼리 교환하는 기법

### FPN(Feature Pyramid Network)
- Pyramidal feature hierarchy: 각 Layer의 Feature를 통해 예측
- Feature Pyramid Network: 각 Layer의 Feature에서 예측한 후 문맥 교환 제공
  - Top-down Path way: Pyramid 구조를 통해서 High Level의 정보를 Low Level에 순차적으로 전달

<img src="static/img/FPN.jpg" width=500px>

#### Scoring
- 각 Feature Map을 각각의 RPN에 입력하여 개별적인 class score과 BBox regressor을 출력
  - Input: Multi-scale feature map
  - Process: Region proposal and Non Maximum Suppression(NMS)
  - Output: 1000 region proposals
- region proposals를 어떤 scale의 feature map과 매칭할 지 기억
  - $k=[k_0 + log_2(\sqrt{wh}/224)]$
  - $\therefore w, h \propto 1/k$
  - 아래 그림에서 $k_0 = 4$
  - $w, h$가 크면 클수록 Low Level의 Feature map

<img src="static/img/FPN_RoI.jpg" width=500px>

#### 결론
- 여러 scale의 물체를 탐지하기 위해 설계
- 여러 크기의 Feature를 사용
- Bottom up(backbone)에서 다양한 크기의 Feature map을 추출하고, Feature map의 Semantic을 교환하기 위해 Top-down 방식 사용

### PANet(Path Aggregation Network)
다수의 CNN 레이어를 갖는 모델에서 Low-Level Feature까지 정보가 전달되지 않는 한계를 개선
- Adaptive Feature Pooling
  - $k=[k_0 + log_2(\sqrt{wh}/224)]$ 수식이 wh에 따라 Feature map을 선택하므로 다른 결과를 유도할 수 있는 우려 발생
  - 모든 Feature map에서 RoI Projection를 진행하여 Channel에 대한 Max Pooling하여 최종 Feature map 생성
- 문맥 교환 추가
  - Bottom-up Path way: Top-down Path way를 진행 후 다시 Low Level의 Feature를 High Level에도 전달
  
<img src="static/img/panet.png" height=300px>