'use client'
import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterOnly,login, hideAuthModals } from '../features/auth/slice'
import { RootState } from '../store'
import { useRouter } from 'next/navigation'


interface IFormInput {
  email: string
  password: string
}

  

const Login = () => {

    const dispatch = useDispatch();
const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
const user = useSelector((state:RootState)=>state.auth.user)
const router = useRouter()
    const { control, handleSubmit,reset} = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      })



    
      useEffect(()=>{
        console.log('User:', user);
  console.log('Authenticated:', isAuthenticated);

        if (user && isAuthenticated) {
            router.push('/')
        }
        
      },[user, isAuthenticated])

      const onSubmit: SubmitHandler<IFormInput> = (data) => {
        try{
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const matchedUser = users.find(
                (user: {email:string, password:string})=> user.email === data.email && user.password === data.password
            )

            if (matchedUser) {
                dispatch(login({email: matchedUser.email, fullName: matchedUser.fullName, password: matchedUser.password}))
                localStorage.setItem('currentUser', JSON.stringify(matchedUser))
                dispatch(hideAuthModals());  
                // router.push('/')       
            } else{
                alert('invalid cred')
            }
            
            reset()

        }catch(error){
            console.error('error occured')
        }

        console.log(data)
      }
    

  return (
    <div className='relative py-6'>
        <h1 className='text-amber-800 text-lg font-bold text-center'>Login</h1>

        <div className="py-2">
            <form onSubmit={handleSubmit(onSubmit)} className='my-4 w-[300px]'>
                <div className="flex flex-col gap-6">
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      }}
                      
                    render={
                        ({ field }) => 
                        <Input {...field} placeholder="Email" type='email' />
                    }
                    
                />
            
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      }}
                    render={({ field }) => 
                        <Input {...field} placeholder="Password" type='password'/>
                    }
                />

            <Button type="submit"
            className='text-amber-800 bg-amber-50 font-semibold cursor-pointer hover:text-amber-50 hover:bg-amber-800'>
                Login
            </Button>
                </div>

            </form>

            <p className="text-sm text-slate-900 flex gap-2">Don't have an account yet? 
                <span className='text-amber-800 font-semibold cursor-pointer' onClick={()=>dispatch(showRegisterOnly())}>Sign up</span>
            </p>
        </div>
    </div>
  )
}

export default Login
