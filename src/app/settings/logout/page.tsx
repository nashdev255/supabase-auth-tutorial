import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Logout from '@/app/components/Logout';
import type { Database } from '@/lib/database.types';

const LogoutPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if(!session) redirect('/auth/login');

  return <Logout />;
}

export default LogoutPage;
