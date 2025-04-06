import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header(){
    const {user,isSignedIn}=useUser();
    return(
        <div className='p-3 px-5 flex justify-between shadow-md'>
           <img src='/logo.svg' width={40} height={40}/>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                    <Button variant="outline"className='#9f5bff hover:bg-gray-100 text-black rounded px-6'>Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button className='#9f5bff hover:bg-gray-700 text-white rounded px-6'>Get Started</Button>
                </Link>
            }
        </div>
    )
}

export default Header