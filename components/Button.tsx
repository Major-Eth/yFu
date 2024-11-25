import { ReactNode } from 'react';

export default function Button({ children, className, ...rest }: { children: ReactNode, className?: string } & Record<string, any>) {
  return <button type="button" className={`button-glowing relative my-4 bg-white text-black ${className}`} {...rest}>
    {children}
    <div className={'glow absolute -inset-0 rotate-180 rounded-full'}/>
    <div className={'glow absolute -inset-0 rotate-180 rounded-full'}/>
  </button>
}
