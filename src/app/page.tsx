import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import HeadLine from '@/app/components/HeadLine'

import type { Database } from '@/lib/database.types';

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="text-center text-xl">
      {session? (
        <HeadLine/>
      ) : (
        <HeadLine/>
      )}
    </div>
  );
};

export default Home;
