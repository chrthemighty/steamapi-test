import { Application } from 'express'

import InventoryController from '@/components/inventory/inventory.controller'

export default (app: Application) => {
	app.get('/api/inventory', InventoryController.getItems)
}
