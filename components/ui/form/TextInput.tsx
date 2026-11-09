import {InputHTMLAttributes, ReactNode} from 'react'

type InputRootProps = InputHTMLAttributes<HTMLInputElement>
type InputIconProps = {
  children:ReactNode,
  className?:string
}


const InputRoot = ({children,className = '',...props}:InputRootProps)=>{
  return(
    <div className={`bg-white px-2 p-2 rounded-xl flex items-center jusitfy-center gap-1 ${className}`}>
      <input
        className='border-none outline-none flex-1'
        {...props}
      />
      {
        children ? 
        <>
          <hr className='w-[1px] h-5 bg-neutral-300 border-none outline-none'/>
          {children}
        </>
        : false
      }
    </div>
  )
}

const InputIcon = ({children,className = ""}:InputIconProps)=>{
  return(
    <span className={className}>
      {children}
    </span>
  )
}

export const TextInput = Object.assign(InputRoot,{
  Icon:InputIcon
})