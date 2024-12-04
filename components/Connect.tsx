import {ConnectButton} from '@rainbow-me/rainbowkit';

import Button from './Button';

import type {ReactNode} from 'react';

export default function Connect({ 
	label = <>{'Connect'}</>,
	className
}: { 
	label?: ReactNode
	className?: string 
}) {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted
			}) => {
				const isReady = mounted && authenticationStatus !== 'loading';
				const isConnected =
						isReady &&
						account &&
						chain &&
						(!authenticationStatus ||
							authenticationStatus === 'authenticated');
				return (() => {
					if (!isConnected) {
						return <Button onClick={openConnectModal} className={className}>{label}</Button>;
					}
					if (chain.unsupported) {
						return (
							<Button onClick={openChainModal} className={className}>{'Wrong network'}</Button>
						);
					}
					return (
						<div className={'flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-4'}>
							<Button onClick={openChainModal} className={`flex items-center gap-8 ${className}`}>
								{chain.hasIcon && (
									<div 
										style={{
											background: chain.iconBackground,
											width: 32,
											height: 32,
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
				})();
			}}
		</ConnectButton.Custom>
	);
}
