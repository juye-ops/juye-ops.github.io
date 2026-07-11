import { ScrollHint } from '../../../shared/components/ScrollHint';
import styles from './Profile.module.css';
import { ProfileProps } from '@/domain/about/types/profile.types';

export function Profile({ frontmatter }: ProfileProps) {
  const { name, tagline, email, phone, blog } = frontmatter;

  return (
    <div className={styles.profileSlide}>
      <div className={styles.profileContent}>
        <h1 className={styles.name}>{frontmatter.name}</h1>
        <p className={styles.tagline}>{frontmatter.tagline}</p>
        <div className={styles.contactInfo}>
          {email && <a href={`mailto:${email}`} className={styles.contact}>✉️ {email}</a>}
          {phone && <a href={`tel:${phone}`} className={styles.contact}>📱 {phone}</a>}
          {blog && <a href={blog} target="_blank" rel="noopener noreferrer" className={styles.contact}>🌐 Blog</a>}
        </div>
      </div>

      <ScrollHint />
    </div>
  );
}
