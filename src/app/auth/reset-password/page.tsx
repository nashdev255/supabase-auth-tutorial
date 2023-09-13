import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import ResetPassword from '@/app/components/ResetPassword';
import type { Database } from '@/lib/database.types';

const ResetPasswordPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if(!session) redirect('/auth/login');

  return <ResetPassword />
}

export default ResetPasswordPage;
