'use client'
import React, { use, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import Login from './login';
import CircleModal from "./circle-modal";
import { useDispatch, useSelector } from 'react-redux'
import Register from './register';
import { RootState } from '../store';
import { hideAuthModals, logout, showLoginOnly, showRegisterOnly, toggleLogin } from '../features/auth/slice';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

const Header = () => {

 const router = useRouter()   
const dispatch = useDispatch()
const showLogin = useSelector((state:RootState)=>state.auth.showLogin)
const user = useSelector((state:RootState)=>state.auth.user)
const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
const showRegister = useSelector((state:RootState)=>state.auth.showRegister)

const handleLogout = ()=>{
    router.push('/')
    dispatch(logout())

    
}


  return (
    <div className="w-full h-16 bg-amber-900 text-amber-50 py-4 px-8">
        <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-row items-center gap-2">
                {/* <Image src="/assets/images/logo.svg" alt="logo" width={100} height={100} /> */}
                <h1 className="text-2xl font-bold cursor-pointer">
                    <Link href="/">Circle</Link>
                </h1>
            </div>

            <div  className="flex flex-row items-center gap-2" onClick={()=>dispatch(showLoginOnly())}>
                {isAuthenticated && user ?  (`Welcome ${user?.fullName}`):(<FaUserCircle className='cursor-pointer'/>) }
                
                {isAuthenticated && user ? (
                    <Button type="submit" onClick={handleLogout}
            className='text-amber-800 bg-amber-50 font-semibold cursor-pointer hover:text-amber-50 hover:bg-amber-800'>
                Logout
            </Button>):('')
            }
            </div>
        </div>

        { showLogin && 
               <CircleModal showModal={showLogin} cancelModal={()=>dispatch(hideAuthModals())}>
                    <div>
                        <Login />
                    </div>
                </CircleModal>
        }

        { showRegister && 
               <CircleModal showModal={showRegister} cancelModal={()=>dispatch(showLoginOnly())}>
                    <div>
                        <Register />
                    </div>
                </CircleModal>
        }
    </div>
  )
}

export default Header

