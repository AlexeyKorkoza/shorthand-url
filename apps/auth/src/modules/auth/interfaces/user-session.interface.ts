export interface UserSession {
  userId: string;
  email: string;
  createdAt: Date;
  lastActivity: Date;
  userAgent?: string;
  ipAddress?: string;
}
