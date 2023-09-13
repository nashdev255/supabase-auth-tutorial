'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/Loading'
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: 'メールアドレスが正しくありません。' }),
})

const ResetPassword = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {

  }

  return (
    <div className='max-w-[400px] mx-auto'>
      <div className='text-center font-bold text-xl mb-10'>パスワードを忘れた場合</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <div className='text-sm mb-1 font-bold'>メールアドレス</div>
          <input
            type="email"
            className='border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500'
            placeholder='メールアドレス'
            id='email'
            {...register('email', { required: true })}
          />
        </div>

        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm'
            >
              送信
            </button>
          )}
        </div>
      </form>
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
    </div>
  )
}

export default ResetPassword;