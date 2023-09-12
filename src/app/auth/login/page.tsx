import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Login from '@/app/components/Login';
import type { Database } from '@/lib/database.types';

const LoginPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(session) redirect('/');

  return <Login />
};

export default LoginPage;
