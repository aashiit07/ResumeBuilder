import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

function Header(){
    return(
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <Link to={'/dashboard'}>
           <img src='/logo2.jpeg' className="cursor-pointer" width={40} height={40}/>
           </Link>
            {/* {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                    <Button variant="outline"className='#9f5bff hover:bg-gray-100 text-black rounded px-6'>Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button className='#9f5bff hover:bg-gray-700 text-white rounded px-6'>Get Started</Button>
                </Link>
            } */}
            <SignedOut>
                        <SignInButton>
                            <button className="cta-button-small hover:text-primary">Sign In</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
        </div>
    )
}

export default Header