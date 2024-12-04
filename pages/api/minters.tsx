import {SnapshotSchema} from 'contexts/useTickets';
import {ethers} from 'ethers';
import {redis} from 'utils/redis';

import snapshotJson from '../../contexts/useTickets.json';

import type {NextApiRequest, NextApiResponse} from 'next';

const snapshot = SnapshotSchema.parse(snapshotJson);

function getOwnerOfTokenId(tokenId: number) {
	const entry = snapshot.find(ticket => ticket.tokens.includes(tokenId));
	return entry?.owner ?? '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const {tokenID, walletAddress, signature} = JSON.parse(req.body.body);
	if (!tokenID || !walletAddress || !signature) {
		res.status(200).json('error: missing token, address or signature');
		return;
	}

	const signer = ethers.utils.verifyMessage('I own edition #' + tokenID, signature || '');
	if (signer !== walletAddress) {
		res.status(200).json('error: invalid signature');
		return;
	}

	const ownerOfTokenID = getOwnerOfTokenId(tokenID);

	if (ownerOfTokenID !== walletAddress) {
		res.status(200).json('error: you are not the owner of this token');
		return;
	}

	if (await redis.get(tokenID)) {
		res.status(200).json('error: token already claimed');
		return;
	}

	const form = JSON.parse(req.body.body);
	console.log('process.env.SCRIPT_SHIPPING_URL', process.env.SCRIPT_SHIPPING_URL);
	console.log('form', form);

	try {
		const response = await fetch(process.env.SCRIPT_SHIPPING_URL as string, {
			method: 'POST',
			body: JSON.stringify(form),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	
		if (response.ok) {
			await redis.set(tokenID, walletAddress);
			res.status(200).json('success');
		} else {
			throw new Error('Failed to post form');
		}
	} catch (e) {
		console.log(e);
		res.status(200).json('error: impossible to save info');
	}
}
