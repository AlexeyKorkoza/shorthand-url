import { z } from 'zod';

import { signUpSchema } from '@/modules/auth/schemas/sign-up.schema';

export type SignUpDto = z.infer<typeof signUpSchema>;
