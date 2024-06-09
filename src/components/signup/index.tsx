'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './signup.module.scss';
import dynamic from 'next/dynamic';
import { useSignUp } from '@/hooks/useSignUp';

const Error = dynamic(() => import('@/components/error/index'), {
  loading: () => <p>Loading...</p>,
});

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState('');
  const { mutate, isLoading } = useSignUp();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { password } = data;

    if (password.length < 5) {
      setError(
        'La longueur du mot de passe doit avoir une longueur de 5 caractères minimum'
      );
      return;
    }

    mutate(data, {
      onSuccess: () => {
        router.replace('/login');
      },
      onError: (error: any) => {
        setError(error.response.data);
      },
    });
  };

  return (
    <div className={styles.signUp}>
      <h1>Inscription</h1>
      {error && <Error message={error} />}
      <form className={styles.signUp_form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          id='email'
          placeholder='Adresse email'
          required
          {...register('email')}
        />
        {errors.email && (
          <span style={{ color: 'red' }}>Votre email est requis</span>
        )}
        <input
          type='password'
          id='password'
          placeholder='Mot de passe'
          required
          {...register('password')}
        />
        {errors.password && (
          <span style={{ color: 'red' }}>Votre mot de passe est requis</span>
        )}
        <button type='submit'>
          {isLoading ? 'Chargement...' : 'Inscription'}
        </button>
      </form>
    </div>
  );
}
