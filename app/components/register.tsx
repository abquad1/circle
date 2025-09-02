'use client'
import React from 'react'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSelector, useDispatch } from 'react-redux'
import { showRegisterOnly,showLoginOnly,login, hideAuthModals } from '../features/auth/slice'
import { RootState } from '../store'

interface IFormInput {
  email: string
  password: string
  fullName: string
}

interface UserType {fullName: string, email: string, password:string}

const Register = () => {

    const dispatch = useDispatch();
const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
          password: "",
        },
      })
    
      const onSubmit: SubmitHandler<IFormInput> = (data) => {
        
            try{
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            

            const existingUser = existingUsers.find(
                (user: {email: string})=> user.email=== data.email
            )

            if (existingUser) {
                alert('email is already registered') 
            }

            const newUser= {fullName: data.fullName, email: data.email, password:data.password}
            

            const updatedUsers = [...existingUsers, newUser]
            localStorage.setItem('users', JSON.stringify(updatedUsers))

            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
                dispatch(login(newUser))
                dispatch(showLoginOnly());
                console.log(data)


            }catch(error){
                console.error(error)
            }
        
        // console.log(data)
      }
    

  return (
    <div className='relative py-6'>
        <h1 className='text-amber-800 text-lg font-bold text-center'>Register</h1>

        <div className="py-2">
            <form onSubmit={handleSubmit(onSubmit)} className='my-4 w-[300px]'>
                <div className="flex flex-col gap-6">

                <Controller
                    control={control}
                    name="fullName"
                    render={
                        ({ field }) => 
                        <Input {...field} placeholder="Full Name" type='text'/>
                    }
                />

                <Controller
                    control={control}
                    name="email"
                    render={
                        ({ field }) => 
                        <Input {...field} placeholder="Email" type='email' />
                    }
                />
            
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => 
                        <Input {...field} placeholder="Password" type='password' />
                    }
                />

            <Button type="submit" 
            className='text-amber-800 bg-amber-50 font-semibold cursor-pointer hover:text-amber-50 hover:bg-amber-800'>
                Register
            </Button>
                </div>

            </form>

            
        </div>
    </div>
)
}
export default Register
