'use client';
import HeaderOnline from '@/components/header-online';
import styles from './commande.module.scss';
import Order from '@/components/order';

export default function Commande() {
  return (
    <div className={styles.commande}>
      <HeaderOnline />
      <Order />
    </div>
  );
}
