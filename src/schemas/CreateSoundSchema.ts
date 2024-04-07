import { z } from 'zod';

enum Creator {
  David = 'David',
  Jeremiah = 'Jeremiah',
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_MIME_TYPES = [
  'audio/wav',
  'audio/mpeg',
  'audio/webm',
  'video/webm',
];

export const createSoundSchemaClient = z.object({
  name: z.string({
    required_error: 'Name Required',
  }),
  creator: z.nativeEnum(Creator, {
    required_error: 'Creator Required',
  }),
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
