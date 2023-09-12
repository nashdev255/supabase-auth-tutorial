'use client';

import { useCallback, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Loading from '@/app/Loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import useStore from '@/store';
type Schema = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }).max(16, { message: '16文字以下で入力する必要があります。' }),
  introduce: z.string().max(1000, { message: '最大文字数を超過しています。' }),
});

const Profile = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, useLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/default.png');
  const { user } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name ? user.name : '',
      introduce: user.introduce ? user.introduce : '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if(user && user.avatar_url) {
      setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileMessage('');

    if(!files || files?.length == 0) {
      setFileMessage('画像をアップロードしてください。');
      return;
    }

    const fileSize = files[0]?.size / 1024 / 1024;
    const fileType = files[0]?.type;

    // 2MB
    if(fileSize > 2) {
      setFileMessage('画像サイズを2MB以下にする必要があります。');
      return;
    }

    if(fileType !== 'image/jpeg' && fileType !== 'image/png') {
      setFileMessage('画像はjpgまたはpng形式である必要があります。');
      return;
    }

    setAvatar(files[0]);
  }, [])

  const onSubmit: SubmitHandler<Schema> = async (data) => {

  }

  return (
    <div></div>
  );
};

export default Profile;
