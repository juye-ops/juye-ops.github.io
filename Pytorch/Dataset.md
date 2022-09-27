## 데이터셋

### Dataset 클래스
- 데이터 입력 형태를 정의하는 클래스
- 데이터를 입력하는 방식의 표준화
- 데이터 타입(Image, Text, Audio)에 따른 다른 입력 정의

``` python
import torch
from torch.utils.data import Dataset

class CustomDataset(Dataset):
    def __init__(self, text, labels):
        self.labels = labels
        self.data = text

    def __len__(self):
        return len(self.labels)
    
    def __getitem__(self, idx):
        label = self.labels[idx]
        text = self.data[idx]
        sample = {"Text": text, "Class": label}     # 흔히 dictionary 형태로 반환
        return sample
```

#### Dataset 클래스 생성 시 유의점
- 데이터 형태에 따라 각 함수를 다르게 정의
- 모든 것을 데이터 생성 시점에 처리할 필요는 없으며, image의 Tensor 변화는 학습에 필요한 시점에 변환
- 데이터셋에 대한 표준화된 처리방법 제공 요구
  - 후속 연구자에게 영향
- 최근에는 HuggingFace 등의 표준화된 라이브러리를 사용


### DataLoader 클래스
Data의 Batch를 생성해주는 클래스
학습직전(GPU Feed 전) 데이터의 변환을 책임
Tensor로 변환, Batch 처리가 주요 업무
병렬적인 데이터 전처리 코드의 고민 필요

