import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { WorldView, InventoryView } from '../backend';

export function useWorldBlocks() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<WorldView | null>({
    queryKey: ['worldBlocks', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return null;
      const principal = identity.getPrincipal();
      return actor.getWorldBlocks(principal);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useInventory() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<InventoryView>({
    queryKey: ['inventory', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) {
        return { items: [] };
      }
      try {
        const principal = identity.getPrincipal();
        return await actor.getInventory(principal);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        return { items: [] };
      }
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
