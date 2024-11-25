import {useEffect, useMemo, useState} from 'react';
import {parseAbi, zeroAddress} from 'viem';
import {useAccount, useReadContract} from 'wagmi';

const NFT_CONTRACT_ADDRESS = process.env.MINT_CONTRACT_ADDRESS as `0x${string}`;
const MINT_ID = 1n;

export function useNft(): {balanceOf: bigint, ownedByUser: number[]} {
	const {isConnected, address} = useAccount();
	const [ownedByUser, set_ownedByUser] = useState<number[]>([]);

	const {data: _balanceOf} = useReadContract({
		address: NFT_CONTRACT_ADDRESS,
		abi: parseAbi(['function balanceOf(address, uint256) view returns (uint256)']),
		functionName: 'balanceOf',
		args: [address ?? zeroAddress, MINT_ID],
		query: {
			enabled: isConnected
		}
	});

	const {data: token, error: tokenError, isError: isTokenError} = useReadContract({
		address: NFT_CONTRACT_ADDRESS,
		abi: parseAbi(['function tokenOfOwnerByIndex(address, uint256, uint256) view returns (uint256)']),
		functionName: 'tokenOfOwnerByIndex',
		args: [address ?? zeroAddress, 0n, MINT_ID],
		query: {
			enabled: isConnected
		}
	});

	useEffect((): void => {
		console.log('isTokenError', isTokenError);
		if (isTokenError) {
			console.error('tokenError', isTokenError, tokenError);
		}
	}, [isTokenError]);

	useEffect((): void => {
		set_ownedByUser([Number(token)]);
	}, [token]);

	const balanceOf = useMemo((): bigint => _balanceOf ?? 0n, [_balanceOf]);

	return {
		balanceOf,
		ownedByUser
	};
}
