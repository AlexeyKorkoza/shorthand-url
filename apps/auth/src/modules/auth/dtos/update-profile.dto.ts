import { z } from 'zod';

import { updateProfileSchema } from '@/modules/auth/schemas/update-profile.schema';

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
