import { z } from 'zod';

import { signInSchema } from '@/modules/auth/schemas/sign-in.schema';

export type SignInDto = z.infer<typeof signInSchema>;
