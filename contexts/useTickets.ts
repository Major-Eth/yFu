import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import {z} from 'zod';
import snapshotJson from './useTickets.json';

export const SnapshotSchema = z.object({
  owner: z.string(),
  tokens: z.array(z.number({coerce: true}))
}).array();

export function useTickets() {
	const {address} = useAccount();

  const tickets = useMemo(() => {
    const snapshot = SnapshotSchema.parse(snapshotJson);
    const entry = snapshot.find(ticket => ticket.owner === address);
    return entry?.tokens ?? [];
  }, [address]);

  return tickets;
}
