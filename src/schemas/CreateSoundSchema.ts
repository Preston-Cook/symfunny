import { z } from 'zod';

enum Creator {
  David = 'David',
  Jeremiah = 'Jeremiah',
}

export const createSoundSchemaClient = z.object({
  name: z.string().min(1, {
    message: 'Title Required',
  }),
  description: z.string().optional(),
  creator: z
    .string()
    .min(1, {
      message: 'Creator Required',
    })
    .refine((s) => s in Creator),
  soundFile: z.any().optional(),
});

export const createSoundSchemaServer = z.object({
  name: z.string({
    required_error: 'Name Required',
  }),
  creator: z.nativeEnum(Creator, {
    required_error: 'Creator Required',
  }),
  url: z
    .string({
      required_error: 'URL Required',
    })
    .url({
      message: 'Invalid URL',
    }),
});
