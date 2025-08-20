export interface GetAnalyticsDto {
  ipAddresses: Array<{
    id: number;
    ipAddress: string;
    shortUrlId: number;
  }>;
}
