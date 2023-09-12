import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Signup from '@/app/components/Signup';
import type { Database } from '@/lib/database.types';

const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(session) redirect('/');

  return <Signup />

};

export default Signup;