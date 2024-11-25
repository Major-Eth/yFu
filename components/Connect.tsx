import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ReactNode } from 'react'
import Button from './Button'

export default function Connect({ 
  label = <>Connect</>,
  className
}: { 
  label?: ReactNode
  className?: string 
}) {
  return <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated')
        return (() => {
          if (!connected) {
            return <Button onClick={openConnectModal} className={className}>{label}</Button>
          }
          if (chain.unsupported) {
            return (
              <Button onClick={openChainModal} className={className}>{'Wrong network'}</Button>
            );
          }
          return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-4">
              <Button onClick={openChainModal} className={`flex items-center gap-8 ${className}`}>
                {chain.hasIcon && (
                  <div 
                    style={{
                      background: chain.iconBackground,
                      width: 32, height: 32,
                      borderRadius: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? 'Chain icon'}
                        src={chain.iconUrl}
                        width={32}
                        height={32}
                      />
                    )}
                  </div>
                )}
                <div>{chain.name}</div>
              </Button>
              <Button onClick={openAccountModal} className={className}>
                {account.displayName}
                {account.displayBalance
                  ? ` (${account.displayBalance})`
                  : ''}
              </Button>
            </div>
          );
        })()
      }}
    </ConnectButton.Custom>
}
