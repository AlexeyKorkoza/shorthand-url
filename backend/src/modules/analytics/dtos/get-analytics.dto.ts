export interface GetAnalyticsDto {
  clickCount: number;
  ipAddresses: Array<{
    id: number;
    ipAddress: string;
    shortUrlId: number;
  }>;
}
