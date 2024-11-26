'use client'

import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

const SignoutButton = () => {
  return (
    <Button variant="destructive" onClick={() => signOut({
        redirect:true,
        callbackUrl: `${window.location.origin}`,
    })}>
      Sign Out
    </Button>
  )
}

export default SignoutButton
