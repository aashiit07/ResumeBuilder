// import React from 'react'
// import { Button } from '../ui/button'
// import { Link } from 'react-router-dom'
// import { UserButton } from '@clerk/clerk-react'
// import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

// function Header(){
//     return(
//         <div className='p-3 px-5 flex justify-between shadow-md'>
//             <Link to={'/dashboard'}>
//            <img src='/logo2.jpeg' className="cursor-pointer" width={40} height={40}/>
//            </Link>
//             {/* {isSignedIn ?
//                 <div className='flex gap-2 items-center'>
//                     <Link to={'/dashboard'}>
//                     <Button variant="outline"className='#9f5bff hover:bg-gray-100 text-black rounded px-6'>Dashboard</Button>
//                     </Link>
//                     <UserButton />
//                 </div> :
//                 <Link to={'/auth/sign-in'}>
//                     <Button className='#9f5bff hover:bg-gray-700 text-white rounded px-6'>Get Started</Button>
//                 </Link>
//             } */}
//             <SignedOut>
//                 <SignInButton>
//                     <button className='px-4 rounded-md shadow-md bg-purple-500 hover:bg-purple-700 transition text-white'>Sign In</button>
//                 </SignInButton>
//             </SignedOut>
//             <SignedIn>
//                 <UserButton />
//             </SignedIn>
//         </div>
//     )
// }

// export default Header








import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

function Header() {
  return (
    <div className='p-3 px-5 flex justify-between items-center shadow-md bg-white'>
      <Link to={'/dashboard'}>
        <img src='/logo2.jpeg' alt="Logo" className="cursor-pointer" width={40} height={40} />
      </Link>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className='px-4 py-2 rounded-md shadow-md bg-purple-500 hover:bg-purple-700 transition text-white font-semibold'>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link to="/dashboard">
            <button className='px-4 py-2 rounded-md shadow-md bg-purple-500 hover:bg-purple-700 transition text-white font-semibold'>
              Dashboard
            </button>
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
