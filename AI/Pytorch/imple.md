## 구현
### nn.Module
딥러닝을 구성하는 Layer의 base class
- Input, Output, Forward, Backward(weights에 대한 Autograd) 정의
- 학습 대상이 되는 parameter(tensor) 정의

### nn.Parameter
- Tensor 클래스의 상속 클래스
- nn.Module 내에 attribute가 될 때 required_grad=True로 지정되어 학습 대상이 되는 Tensor로 취급
- 대부분의 layer에는 weights 값들이 지정되어 있으므로 직접 지정할 일은 거의 없음

### Backward
- Layer에 있는 Parameter들의 미분을 수행
- Forward의 결과값(model의 output;예측치)과 실제값간의 차이(loss)에 대해 미분을 수행
- 해당 값으로 Parameter 업데이트
- 실제 backward는 Module 단계에서 직접 지정 가능
  - 직접 쓸 일은 없지만 순서 이해할 필요가 있음
  - Module에서 backward와 optimizer는 오버라이딩을 통해 자동으로 설정