## 역전파(Backpropagation) 알고리즘
각 층에 사용된 파라미터를 효율적으로 학습하는  알고리즘

### 연쇄법칙
- $z = (x+y)^2$
  - $w = x + y$ 로 치환
  - $z = w^2$
  - $\frac{\partial z}{\partial x} = \frac{\partial z}{\partial w} \frac{\partial w}{\partial x}$
  - $\frac{\partial z}{\partial w} = 2w,  \frac{\partial w}{\partial x} = 1$
  - $\therefore \frac{\partial z}{\partial x} = 2$
- 각 노드의 뉴런(텐서) 값을 컴퓨터가 기억해야 미분 계산이 가능

|오차역전파 식 유도|오차역전파 결과 요약|
|:-:|:-:|
|<img src = ../static\img\before_backpropagation.png>|<img src = ../static\img\after_backpropagation.png>|


|오차역전파(심화) 식 유도 1|오차역전파(심화) 식 유도 2|
|:-:|:-:|
|<img src = ..\static\img\deep_backpropagation1.png>|<img src = ..\static\img\deep_backpropagation1.png>|
|오차역전파(심화) 결과 요약||
|<img src = ..\static\img\deep_backpropagation1.png>||

