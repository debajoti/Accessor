import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { buttonVariants } from '@/components/ui/button';
import UsersList from '@/components/UserList';

const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <div>Not Logged In</div>
    }

  return (
    <div className='h-full w-full p-16 sm:p-20 mt-10'>
        <div >
            <h1 className='font-bold text-2xl mb-2'>Welcome,</h1>
            <span className='text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold'>{session?.user?.name}</span>
        </div>
        <div className='relative mt-5 lg:mt-5 flex items-center gap-5'> 
            <span>Role :  </span>
            <span className={buttonVariants({variant: 'role'})}> {session?.user?.role}</span>
        </div>
        <hr className="mt-10 font-bold w-full border-blue-300 border-b-2"/>
        <div className='mt-5 text-2xl'>
            <h1>Other Users</h1>
            <div>
                <UsersList currentUserEmail={session?.user?.email} currentUserRole={session?.user?.role}/>
            </div>
        </div>
    </div>
  )
}

export default page
