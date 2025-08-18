import type { IpAddressItemModel } from "./ip-address-item.model.ts";

export interface GetAnalyticsDto {
	clickCount: number;
	ipAddresses: IpAddressItemModel[];
}
