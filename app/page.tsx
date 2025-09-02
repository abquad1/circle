'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import data from './components/data.json'
import { ScrollArea } from "@/components/ui/scroll-area"
import CircleModal from "./components/circle-modal";
import { useSelector, useDispatch} from 'react-redux'
import { RootState } from './store'
import Login from "./components/login";
import { hideAuthModals, showLoginOnly, showRegisterOnly } from "./features/auth/slice";

interface cartType {
  name: string;
  price: number;
  quantity: number;
  image: {
    desktop: string;
    mobile?: string;
    tablet?: string;
  };
  category: string;
}

interface menuType {
  name: string;
  price: number;
  image: {
    desktop: string;
    mobile?: string;
    tablet?: string;
  };
  category: string;
}

export default function Home() {
const [showQuantity, setShowQuantity] =useState<string[]>([]);
const [count,setCount] = useState<{[key:string]: number}>({})
const [cart, setCart] = useState<cartType[]>([])
const [showOrder,setShowOrder] = useState(false)
const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated)
const dispatch = useDispatch()
const showLogin = useSelector((state:RootState)=>state.auth.showLogin)


const handleCart = (menu:menuType)=>{
  
      if (!isAuthenticated) {
        dispatch(showLoginOnly())
        return;
      }

      setShowQuantity(prev=> prev.includes(menu.category) ? prev: [...prev,menu.category])

      setCount(prev=> ({
        ...prev, [menu.category]: 1
      }))
    
        const existingItem = cart.find(i=>i.category === menu.category)
        if (existingItem) {
           setCart(cart.map(item=> 
            item.category === menu.category ? 
            {...item, quantity: item.quantity + 1} :
             item))
        }   else{
          setCart([...cart, {...menu, quantity: 1}])
        }   
      }        
      
        const handleRemove = (menu: cartType)=>{
            setCart(cart=>cart.filter(item=>item.category !== menu.category))
            setCount(prev=>({
              ...prev, [menu.category]: Math.max((prev[menu.category] || 0) - 1, 0)
            }))
      }
     

const increment =(menu:menuType)=>{
    // const menu = data.find(id=>id.category === menu)
    setCount(prev=>({
      ...prev, [menu.category]: (prev[menu.category] || 0) + 1
    }))

    const existingItem = cart.find(i=>i.category === menu.category)

    if (existingItem) {
      setCart(cart.map(item=> 
       item.category === menu.category ? 
       {...item, quantity: item.quantity + 1} :
        item))
   }   else{
     setCart([...cart, {...menu, quantity: 1}])
   }  
}

const decrement =(menu:menuType)=>{
  setCount(prev=>({
    ...prev, [menu.category]: Math.max((prev[menu.category] || 0) - 1, 0)
  }))

  setCart(prev=>{
    const updatedMenu = prev.map(item=> item.category === menu.category ? {...item, quantity: item.quantity - 1 }: item )
    return updatedMenu.filter(item=>item.quantity > 0)
  })
}

const handlenewOrder = ()=>{
  setShowOrder(false);
  setCart([]);
  setShowQuantity([])
  setCount({})
}
  return (
    <div className="w-full bg-amber-50 min-h-screen px-2 md:px-8 py-4 ">
      <main className="flex flex-col md:flex-row items-start py-2 md:py-4">
          <div className="w-full md:w-4/5 px-2 md:px-16 relative">

          <h1 className="text-2xl mx-6 font-bold">Desserts</h1>
            <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-12">
            {data.map((menu,i)=>(
              <div className="w-full px-6 py-3 flex flex-col gap-4 md:gap-6" key={i}>
                  <div className={`relative w-full ${count[menu.category] > 0 ? 'border-2 border-amber-700': 'border-none'}`}>
                    <Image alt="" src={menu.image.desktop} height={100} width={100} className="w-full"/>
              
                   {showQuantity.includes(menu.category) && count[menu.category] > 0? (
                     <div 
                      className="w-30 h-12 md:h-8 absolute top-[93%] md:top-9/10 left-1/4 md:left-1/5 bg-amber-700  font-semibold 
                      text-slate-100 flex items-center justify-between gap-1 px-4 py-2 rounded-4xl md:rounded-2xl border
                       border-zinc-800 text-xs">
                       <button onClick={()=>decrement(menu)}
                        className="h-5 md:h-3 w-5 md:w-3 rounded-full border border-white text-white flex items-center justify-center 
                       hover:text-amber-700  hover:bg-slate-100 cursor-pointer text-xl md:text-sm">-</button>
                       {count[menu.category]}
                       <button onClick={()=>increment(menu)}
                       className="h-5 md:h-3 w-5 md:w-3 rounded-full border border-white text-white flex items-center justify-center 
                       hover:text-amber-700  hover:bg-slate-100 cursor-pointer text-xl md:text-sm">+</button>

                     </div>
                   ):(
                    <div onClick={()=>handleCart(menu)} 
                    className="w-30 h-12 md:h-8 absolute top-[93%] md:top-9/10 left-1/4 md:left-1/5 cursor-pointer bg-[#ffffff] 
                    font-semibold text-zinc-800 flex items-center gap-1 px-4 py-2 rounded-4xl md:rounded-2xl border
                     border-zinc-800 text-xs">
                      <img src="/assets/images/icon-add-to-cart.svg" alt="" className="h-3" />
                      Add to Cart
                    </div>
                   )}
                  </div>                

                  <div className="mt-4">
                    <p className="text-sm md:text-[0.6rem] font-semibold text-rose-300">{menu.category}</p>
                    <h3 className=" text-md md:text-sm font-semibold">{menu.name}</h3>
                    <h3 className="text-md md:text-sm text-orange-500 font-bold">${(menu.price).toFixed(2)}</h3>
                  </div>
              </div>
            ))}
            </div>
          </div>
          <div className="w-full md:w-1/5 px-6 md:px-0">
              <div className="bg-[#ffffff] px-3 py-3 w-full">

                <h1 className="text-xl md:text-lg font-bold text-amber-700">Your Cart ({cart.length})</h1>
                  {cart.length > 0 ? (
                    <div className="">
                      {cart.map((item,i)=>(
                        <div className="" key={i}>
                          <div className="flex flex-row items-center justify-between gap-2 py-2">
                                <div className="flex flex-col">
                                    <h1 className="text-sm">{item.name}</h1>

                                    <div className="flex flex-row items-center gap-3">
                                        <p className="text-xs">
                                          {item.quantity}x
                                        </p>

                                        <h4 className="flex flex-row gap-3 text-sm">
                                          <span className="text-xs flex flex-row items-center">@ ${item.price.toFixed(2)}</span> <span className="">${(item.price * item.quantity).toFixed(2)} </span>
                                        </h4>
                                    </div>
                                </div>

                                <div className="">
                                  <img onClick={()=>handleRemove(item)} src="/assets/images/icon-remove-item.svg" alt="" 
                                  className="cursor-pointer h-3 w-3 rounded-full border border-black  " />
                                </div>

                                
                          </div>

                          <div className="h-[1px] w-full bg-slate-800"></div>
                        </div>
                      ))}                      

                          <div className="flex flex-row items-center justify-between my-2">
                              <p className="text-xs">Order Total:</p>
                              <h1 className="font-bold text-md">${cart.reduce((sum,i)=>sum + i.price* i.quantity,0).toFixed(2)}</h1>
                          </div>

                          <div className="w-full my-2">
                            <button className="w-full bg-amber-800 text-amber-50 py-2 px-3 rounded-full text-sm cursor-pointer"
                            onClick={()=>setShowOrder(true)} type="submit">Confirm Order</button>
                          </div>

                    </div>
                    
                  ):(
                    <div className="">
                        
                        <div className="text-center flex flex-col  items-center w-full mt-4 md:mt-2">
                          <img src="/assets/images/illustration-empty-cart.svg" alt="" className="h-24 w-24" />
                          <p className="text-amber-500 font-semibold text-sm md:text-xs">Your added items will appear here</p>
                        </div>
                    </div>
                  )}
              </div>

              { showLogin && 
               <CircleModal showModal={showLogin} cancelModal={()=>dispatch(hideAuthModals())}>
                    <div>
                        <Login />
                    </div>
                </CircleModal>
        }

              {showOrder && (
                  <CircleModal showModal={showOrder} cancelModal={()=>setShowOrder(false)}
                       children={
                        <div>
                           <div className="flex flex-col gap-2">
                              <div className="flex items-center ">
                                <img src="/assets/images/icon-order-confirmed.svg" alt="" className="h-10 w-10" />
                                {/* <img src="/assets/images/icon-remove-item.svg" alt="" onClick={()=>setShowOrder(false)}
                                className="cursor-pointer h-7 w-7 border border-amber-700 rounded-full p-1" /> */}
                              </div>

                                <h1 className="text-xl font-bold">Order Confirmed</h1>
                                <p className="text-sm text-amber-900">We hope you enjoy your food</p>
                              </div>

                              <ScrollArea className="h-[250px] md:h-[200px] mt-6">

                              <div className="bg-gray-50 p-2 rounded-lg w-full md:w-[300px]">
                              {cart.map((item,i)=>(
                              <React.Fragment key={i}>        
                                <div className="flex flex-col my-4 w-full " >
                                    <div className="w-full flex flex-row items-center justify-between">
                                      
                                    <div className="flex flex-row items-center gap-2">
                                      <div className="w-12">
                                          <Image alt="" src={item.image.desktop} height={20} width={20} className="w-full"/>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                          <h1 className="text-sm font-bold">{item.name}</h1>

                                          <div className="flex flex-row items-center gap-3">
                                              <p className="text-xs font-bold">
                                                {item.quantity} <span className="text-amber-600">x</span>
                                              </p>

                                              <h4 className="flex flex-row gap-3 text-sm">
                                                <span className="text-xs text-amber-900 flex flex-row items-center ">@ ${item.price.toFixed(2)}</span> 
                                              </h4>
                                          </div>
                                    </div>
                                  </div>

                                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)} </span>
                                    </div>
                                </div>
                              </React.Fragment>

                              ))}
                              </div>
                              </ScrollArea>


                              <div className="flex flex-row items-center justify-between my-2">
                                  <p className="text-xs">Order Total:</p>
                                  <h1 className="font-bold text-md">${cart.reduce((sum,i)=>sum + i.price* i.quantity,0).toFixed(2)}</h1>
                              </div>

                              <div className="w-full my-2">
                                <button className="w-full bg-amber-800 text-amber-50 py-2 px-3 rounded-full text-sm cursor-pointer"
                                onClick={handlenewOrder} type="submit">Start new Order</button>
                              </div>
                        </div>}
                         />                                             
              )}
              
          </div>
      </main>
    </div>
  );
}
