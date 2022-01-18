import { SteamApp } from "@/utils/consts"
import { Request, Response } from "express"

type ApiRequest<T> = Request<unknown, unknown, unknown, T>
type ApiResponse<T> = Response<T>
export type ApiEndpointHandler<T, S> = (req: ApiRequest<T>, res: ApiResponse<S>) => Promise<void>

export type Inventory = InventoryItem[]

export interface InventoryItem {
	market_hash_name: string
	tradable: boolean
}

export interface GetInventoryRequest {
	steamId: string
	isTradable?: boolean
	appId?: SteamApp
}
