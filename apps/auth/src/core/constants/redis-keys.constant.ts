export const REDIS_KEYS = {
  SESSION: (sessionId: string) => `session:${sessionId}`,
  USER_SESSIONS: (userId: UserId) => `user_sessions:${userId}`,
} as const;
