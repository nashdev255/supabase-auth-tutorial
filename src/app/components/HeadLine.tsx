import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cotLeaf from '../../../public/cotLeaf.png';

const HeadLine = () => {
  return (
    <>
      <main className='w-full xs:space-x-8 sm:space-x-8 md:space-x-14 lg:space-x-28 xl:space-x-32 md:flex justify-center'>
        <div className='flex justify-center'>
          <div className='h-56 w-56 flex items-center'>
            <Image src={ cotLeaf } alt='cotyledons' />
          </div>
        </div>
        <div className='h-full my-auto space-y-4 items-center'>
          <div className='items-center text-center text-cyan-800 text-4xl font-bold'>
            <h1>プログラミングで</h1>
            <h1>未来を掴もう</h1>
          </div>
          <div className='text-center'>
            <div className='px-8 py-2 bg-cyan-600 rounded-lg inline-block'>
              <h4 className=' text-white font-bold text-center'>
                <Link href={'./'}>今すぐはじめる</Link>
              </h4>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HeadLine;