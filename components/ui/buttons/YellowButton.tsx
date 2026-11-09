import React, { ButtonHTMLAttributes, ReactNode } from 'react'


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonTextProps={
    children:ReactNode
}
type ButtonIconProps={
    children:ReactNode
}

const Button = ({
    children,
    className = "",
    ...props
}:ButtonProps)=>{
    return(
        <button 
            className={`bg-yellow-400 text-black px-2 py-2 flex items-center justify-center gap-1 rounded-xl hover:bg-yellow-500 hover:scale-101 transition-all duration-200 ${className}`}
           {...props}
        >
         {children}
        </button>
    )
}

const ButtonText = ({ children }: ButtonTextProps) => {
  return <span>{children}</span>;
};

const ButtonIcon = ({ children }: ButtonIconProps) => {
  return <span>{children}</span>;
};

export const YellowButton = Object.assign(Button, {
  Text: ButtonText,
  Icon: ButtonIcon,
});