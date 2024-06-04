'use client';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from './signup.module.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HeaderOffline from '@/components/header-offline';
import LayoutOffline from '@/app/layout/layout-offline';
import SignUpComponent from '@/components/signup/index';



export default function SignUp() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace('/');
  }
  return (
    <>
      <Head>
        <title>Inscription</title>
      </Head>
      <div className={styles.inscription}>
        <LayoutOffline>
          <HeaderOffline isButton />
          <SignUpComponent />
        </LayoutOffline>
      </div>
    </>
  );
}
