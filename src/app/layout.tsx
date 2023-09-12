import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseListener from './components/SupabaseListener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Supabase Auth Tutorial',
  description: 'Create Login/Signin Form',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SupabaseListener />
        <div className='flex flex-col min-h-screen'>
          <main className='flex-1 container max-w-screen-sm mx-auto px-1 py-5'>{ children }</main>
          <footer className='py-5'>
            <div className='text-center text-sm'>
              { new Date().getFullYear() }
              &copy; All rights reserved | Build with nashdev255
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

export default RootLayout;
