## Convolution Neural Network(CNN)

### Convolution
|Filter 연산|
|:-:|
|<img src=../static/img/convolution_0.png height=300px>|

|CNN 청사진 예시|
|:-:|
|<img src=../static/img/convolution_1.png height=200px>|

#### Stride
- 슬라이딩 간격 설정

#### Padding
- 영상의 테두리에 일정한 값을 주입하여 사이즈 확대

#### 연산
- 예시
  - Padding = 1, Stride = 1
  - Input: 40\*50\*128
  - Kernel: 3\*3
  - Output: 40\*50\*64
  - Parameter: 3\*3\*128\*64

### 1\*1 Convolution
Dimension reduction을 위한 기법
- Parameter 수를 줄이면서 깊이를 보존
- Bottle neck architecture