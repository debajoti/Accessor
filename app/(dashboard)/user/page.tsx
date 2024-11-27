import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { buttonVariants } from '@/components/ui/button';
import UsersList from '@/components/UserList';
import AddUser from '@/components/AddUser';
import NotLoggedIn from '@/components/NotLoggedIn';

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <NotLoggedIn/>
    }

  return (
    <div className='h-full w-full p-16 sm:p-20 mt-10'>
        <div >
            <h1 className='font-bold text-2xl mb-2'>Welcome,</h1>
            <span className='text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold'>{session?.user?.name}</span>
        </div>
        <div className='relative mt-5 lg:mt-5 flex justify-between items-center gap-5'> 
          <div>
            <span className={buttonVariants({variant: 'role'})}> {session?.user?.role}</span></div>
            {session?.user?.role === 'ADMIN' && <div><AddUser/></div>}
        </div>
        <hr className="mt-10 font-bold w-full border-blue-300 border-b-2"/>
        <div className='mt-5 text-2xl'>
            <h1>Other Users</h1>
            <div>
                <UsersList currentUserEmail={session?.user?.email} currentUserRole={session?.user?.role} currentUserPermisions={session?.user?.permissions}/>
            </div>
        </div>
    </div>
  )
}

export default page
