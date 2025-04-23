import { SignIn, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

function SignInPage() {
    const navigate = useNavigate();
    const {isSignedIn} = useUser();

    useEffect(() => {
      if (isSignedIn) {
        navigate('/dashboard');
      }
    }, [isSignedIn, navigate]);
    return (
        <div className='flex justify-center my-5 items-center'>
            <SignedOut>
                <SignInButton>
                    <button className="cta-button-small hover:text-primary">Sign In</button>
                </SignInButton>
            </SignedOut>
            {/* <SignedIn>
                <UserButton />
            </SignedIn> */}
        </div>
    )
}
export default SignInPage