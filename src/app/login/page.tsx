'use client';

import Head from 'next/head';
import styles from './login.module.scss';
import HeaderOffline from '@/components/header-offline';
import LoginForm from '@/components/login-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LayoutOffline from '@/app/layout/layout-offline';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace('/');
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.login}>
        <div className={styles.login_bg}>
          <LayoutOffline>
            <HeaderOffline />
            <LoginForm />
          </LayoutOffline>
        </div>
      </div>
    </>
  );
}
