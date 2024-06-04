import styles from './layout-offline.module.scss';
import { ReactNode } from 'react';

export default function LayoutOffline({ children }: { children: ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>;
}
