'use client'
import { FormEvent, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Loading from '@/app/Loading';
import type { Database } from '@/lib/database.types';

const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {

  }

  return (
    <div>
      <div className='text-center mb-5'>ログアウトしますか？</div>
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='font-bold bg-red-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm'
            >ログアウト</button>
          )}
        </div>
      </form>
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
    </div>
  )
}

export default Logout;
