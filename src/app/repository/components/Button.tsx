import { ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  active?: boolean
}

const Button = ({ active, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={` text-white rounded py-1 px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${
        active ? 'bg-blue-600' : "bg-gray-900"   
      }`}/>
  )
}

export default Button
