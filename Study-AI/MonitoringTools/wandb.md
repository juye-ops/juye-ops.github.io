## weight & biases
- 머신러닝 실험을 원활히 지원하기 위한 상용도구
- 협업, code versioning, 실험 결과 기록 등 제공
- MLOps의 대표적인 툴로 저변 확대 중
- [weights&biases](https://wandb.ai)

```
$ pip install wandb -q
```

```python
import wandb
wandb.init(project = "my-project", entity='teamlab') # 프로젝트의 hash 값 입력

config = {"epochs": EPOCHS, "batch_size": BATCH_SIZE, "learning_rate": LEARNING_RATE}
wandb.init(project="my-test-project", config=config)
# wandb.config.batch_size = BATCH_SIZE
# wandb.config.learning_rate = LEARNING_RATE

for e in range(1, EPOCHS+1):
    epoch_loss = 0
    epoch_acc = 0
    for X_batch, y_batch in train_dataset:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device).type(torch.cuda.FloatTensor)
        ...
        optimizer.stop()
        ...
    wandb.log({'accuracy': train_acc, 'loss': train_loss})
```
