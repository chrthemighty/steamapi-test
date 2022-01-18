import express from 'express';

import InventoryService from '@/components/inventory/inventory.service';
import { Inventory, GetInventoryRequest, ApiEndpointHandler } from '@/components/inventory/inventory.model';

class InventoryController {
	/**
	 * Responses to users search request
	 * @param  {express.Request} request with ?query=
	 * @param  {express.Response} response
	 * @returns Promise
	 */
	getItems: ApiEndpointHandler<GetInventoryRequest, Inventory> = async ({ query }, res) => {
		try {
			const inventory = await InventoryService.findItems(query)
			res.status(200).send(inventory)
		} catch (error: any) {
			res.status(error.response ? error.response.status : 500).json(error);
		}
	};
}

export default new InventoryController();
