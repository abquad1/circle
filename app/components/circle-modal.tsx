import React from 'react'

type CircleModalProps = {
    showModal: boolean;
    cancelModal: (value: boolean) => void;
    children: React.ReactNode;
  };
  
const CircleModal = ({showModal,cancelModal, children}:CircleModalProps) => {
  return (
    <>
        <div className="fixed inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>

            <div className={`fixed inset-0 md:inset-0 flex items-end md:items-center md:justify-center
                z-50 transition-transform ease-in duration-700 ${showModal? 'translate-y-0' : 'translate-y-full'} md:transform-none`}>
                <div className="rounded-lg bg-white w-full md:w-auto px-8 py-8 md:py-4 ">
                <div className="flex justify-end w-full" onClick={()=>cancelModal(false)}>
                <img src="/assets/images/icon-remove-item.svg" alt="" 
                                className="cursor-pointer h-7 w-7 border border-amber-700 rounded-full p-1 " />
                </div>
                    {children}
                </div>
            </div>
    </>

  )
}

export default CircleModal
