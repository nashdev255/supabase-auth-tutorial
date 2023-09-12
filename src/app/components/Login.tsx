'use client'

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import Loading from '../Loading';

type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: 'メールアドレスが正しくありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
})

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if(error) {
        setMessage('エラーが発生しました。' + error.message);
        return;
      }

      router.push('/');

    } catch(error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <div className='max-w-[400px] mx-auto'>
      <div className='text-center font-bold text-xl mb-10'></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <input
            type="email"
            className='border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500'
            placeholder='メールアドレス'
            id='email'
            {...register('email', { required: true })}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.email?.message}</div>
        </div>
        <div className='mb-5'>
          <input
            type="password"
            className='border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500'
            placeholder='パスワード'
            id='password'
            {...register('password', { required: true })}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.password?.message}</div>
        </div>
        <div className='mb-5'>
          {loading ? (
            <Loading/>
          ) : (
            <button
              type='submit'
              className='font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2'
            >
              ログイン
            </button>
          )}
        </div>
      </form>

      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}

      <div className='text-center text-sm mb-5'>
        <Link href={'/auth/reset-password'} className='text-gray-500n font-bold'>
          パスワードを忘れた方はこちら
        </Link>
      </div>

      <div className='text-center text-sm'>
        <Link href={'/auth/signup'} className='text-gray-600 font-bold'>
          アカウントを作成する
        </Link>
      </div>
    </div>
  )
}

export default Login;
