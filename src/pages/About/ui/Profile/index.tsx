import { ScrollHint } from '@/shared/ui/ScrollHint';
import styles from './Profile.module.css';
import type { ProfileProps } from '../../model/Profile/types';

export function Profile({ frontmatter }: ProfileProps) {
  return (
    <div className={styles.profileSlide}>
      <div className={styles.profileContent}>
        <h1 className={styles.name}>{frontmatter.name}</h1>
        <p className={styles.tagline}>{frontmatter.tagline}</p>

        <div className={styles.contactInfo}>
          <a href={`mailto:${frontmatter.email}`} className={styles.contact}>
            ✉️ {frontmatter.email}
          </a>
          <a href={`tel:${frontmatter.phone}`} className={styles.contact}>
            📱 {frontmatter.phone}
          </a>
          <a href={frontmatter.blog} target="_blank" rel="noopener noreferrer" className={styles.contact}>
            🌐 Blog
          </a>
        </div>
      </div>

      <ScrollHint />
    </div>
  );
}
