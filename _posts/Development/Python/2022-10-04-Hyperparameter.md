---
title: '[딥러닝] 하이퍼 파라미터 튜닝'
author: juye-ops
date: 2022-10-04 10:00:00 +0900
categories: [Development, Python]
tags: [Deep Learning, ray]
render_with_liquid: false
---

## 하이퍼파라미터 튜닝
### 하이퍼 파라미터
모델 스스로 학습하지 않고, 사람이 직접 지정하는 파라미터
- Learning rate, 모델 크기, Optimizer 등
- 하이퍼파라미터에 의해 결과가 크게 좌우될 수도 있음
- 최종의 정확도를 쥐어짜야 할 때 시도 가치 존재
- 선정 방법
  - Grid vs Random 방법
    - Grid: 파라미터 별 직접 값을 지정한 Grid 상에서 경우의 수에 따라 최고의 정확도를 못 뽑을 수도 있다.
    - Random: 하이퍼 파라미터 값을 난수로 설정하여 Grid에서 놓친 최고의 정확도를 찾을 수도 있다.
  - 베이지안 기반 기법
    - 비교적 최근에 주도되는 방법

### Ray
하이퍼파라미터 조정 도구
- Multi-node, Multi-processing 지원 모듈
- ML/DL의 병렬 처리를 위해 개발된 모듈
- 기본적으로 현재의 분산정렬 ML/DL 모듈의 표준
- Hyper-parameter Search를 위한 다양한 모듈 제공

```
$ pip install ray tensorboardX
```

```python
from functools import partial
from ray import tune
from ray.tune import CLIReporter
from ray.tune.schedulers import ASHAScheduler
from ray.tune.suggest.bayesopt import BayesOptSearch
from ray.tune.suggest.hyperopt import HyperOptSearch

config = {
    "l1": tune.sample_from(lambda _: 2**np.random.randint(2, 9)),
    "l2": tune.sample_from(lambda _: 2**np.random.randint(2, 9)),
    "lr": tune.loguniform(1e-4, 1e-1),
    "batch_size": tune.choice([2, 4, 8, 16])
}

scheduler = ASHAScheduler(
    metric = "loss",
    mode = "min",
    max_t = max_num_epochs,
    grace_period = 1,
    reduction_factor = 2
)

reporter = CLIReporter(
    metric_columns = ["loss", "accuracy", "training_iteration"]
)

gpus_per_trial = 2
result = tune.run(
    partial(train_cifar, data_dir=data_dir),
    resources_per_trial = {"cpu": 2, "gpu": gpus_per_trial}
    config = config,
    num_samples = num_samples,
    scheduler = scheduler,
    progress_reporter = reporter
)

best_trial = result.get_best_trial("loss", "min", "last")
```