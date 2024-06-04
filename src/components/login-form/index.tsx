'use client';
import React from 'react';
import styles from './login-form.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { SpinnerDotted } from 'spinners-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Error from '@/components/error';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormValues>();

  const onFormSubmittedHandler: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError('');

    const resultat = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (resultat && resultat.error) {
      setError(resultat.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1>S&apos;identifier</h1>
      {error && <Error message={error} />}
      <form
        className={styles.loginForm_form}
        onSubmit={handleSubmit(onFormSubmittedHandler)}
      >
        <input
          placeholder='E-mail'
          type='email'
          id='email'
          className='input'
          {...register('email', {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        <input
          placeholder='Mot de passe'
          type='password'
          id='password'
          {...register('password', {
            required: true,
          })}
        />
        <button type='submit'>
          {isLoading ? (
            <SpinnerDotted
              size={15}
              thickness={100}
              speed={100}
              color='#ffffff'
            />
          ) : (
            `S'identifier`
          )}
        </button>
      </form>
      <div style={{ color: 'white', paddingTop: '20px' }}>
        <span> Première visite sur Netflix ?</span>
        <Link href='/inscription'> Inscrivez-vous </Link>
      </div>
    </div>
  );
}
