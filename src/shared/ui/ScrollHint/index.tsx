import styles from './ScrollHint.module.css';

export function ScrollHint() {
  return (
    <div className={styles.scrollHint}>
      <p>스크롤해서 더 알아보기 ↓</p>
      <div className={styles.scrollIndicator}></div>
    </div>
  );
}
