// import { SignIn, useUser } from '@clerk/clerk-react'
// import React, { useEffect } from 'react'
// import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
// import { useNavigate } from 'react-router-dom';

// function SignInPage() {
//     const navigate = useNavigate();
//     const {isSignedIn} = useUser();

//     useEffect(() => {
//       if (isSignedIn) {
//         navigate('/dashboard');
//       }
//     }, [isSignedIn, navigate]);
//     return (
//         <div className='flex justify-center my-5 items-center'>
//             <SignedOut>
//                 <SignInButton>
//                     <button className="cta-button-small hover:text-primary">Sign In</button>
//                 </SignInButton>
//             </SignedOut>
//             {/* <SignedIn>
//                 <UserButton />
//             </SignedIn> */}
//         </div>
//     )
// }
// export default SignInPage

import { SignInButton, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border-t-4 border-pink-500">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">Please sign in to access your dashboard and resumes.</p>
        <SignedOut>
          <SignInButton>
            <button className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-300">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}

export default SignInPage;











