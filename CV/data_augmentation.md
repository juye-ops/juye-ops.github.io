## 데이터 증강

### 데이터셋
데이터셋은 편향적으로 구성
- 이미지의 레이블마다 평균적인 특징을 보유

#### 학습용 데이터셋
학습용 데이터셋은 실제 데이터들의 샘플
- 학습용 데이터셋은 실제 데이터셋을 충분히 표현하기 위한 기법을 요구

### 데이터 증강; Data Augmentation
실제 데이터와 유사한 데이터로
- 종류
  - Crop, Shear, Brightness, Perspective, Rotate 등
- Library
  - OpenCV, Numpy 등

#### Brightness adjustment
```python
img[:, :, 0] = img[:, :, 0] + 100
```

#### Rotate, Flip
```python
img_rotated = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)
img_rotated = cv2.rotate(image, cv2.ROTATE_180)
```

#### Crop
```python
y_start = 500
y_size = 400
x_start = 300
x_size = 800
img_cropped = image[y_start : y_start+y_size, x_start : x_start+x_size, :]
```

#### Affine transformation
- 선과 비율, 평행을 유지한 이미지 변환
- 입력과 출력의 대응하는 점들에 대한 위치를 3개씩 지정
``` python
rows, cols, ch = image.shape
pts1 = np.float32([[50, 50], [200, 50], [50, 200]])
pts2 = np.float32([[10, 100], [200, 50], [100, 250]])
M = cv2.getAffineTransform(pts1, pts2)
shear_img = cv2.warpAffine(image, M, (cols, rows))
```

### Modern Data Augmentation

#### CutMix
두 이미지의 일부를 혼합하여 레이블을 공유

#### Rand Augmentation
증강 기법의 집합을 Policy라고 하며, 해당 Policy를 랜덤적으로 적용
