import axios from 'axios';

import { GetInventoryRequest, Inventory, InventoryItem } from '@/components/inventory/inventory.model';
import { createFiltersApplier, parseBoolean } from '@/utils/helpers';

const filtersList = {
	isTradable:
		(value: boolean) =>
		({ tradable }: InventoryItem) =>
			value === tradable,
};

const applyFilters = createFiltersApplier<InventoryItem>(filtersList);

class InventoryService {
	/**
	 * Gets inventory data through steam API
	 * @param  {string} steamId
	 * @param  {boolean} isTradable
	 * @param  {number} appId
	 * @returns Promise<Inventory>
	 */
	findItems = async ({ steamId, isTradable, appId = 730 }: GetInventoryRequest): Promise<Inventory> => {
		const { data } = await axios.get(`https://steamcommunity.com/inventory/${steamId}/${appId}/2?l=en`);
		const items = data.descriptions.map(({ market_hash_name, tradable }: any) => ({ market_hash_name, tradable: Boolean(tradable) }));
		return applyFilters(items, [{ property: 'isTradable', value: isTradable === undefined ? isTradable : parseBoolean(isTradable) }])
			.sort((a, b) => {
				if (a.tradable && !b.tradable) return 1;
				if (!a.tradable && b.tradable) return -1;
				return 0;
			})
			.sort((a, b) => {
				if (a.market_hash_name < b.market_hash_name) return -1;
				if (a.market_hash_name > b.market_hash_name) return 1;
				return 0;
			});
	};
}

export default new InventoryService();
