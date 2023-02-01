import { Cource } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CourceClear
  extends Pick<Cource, 'id' | 'title' | 'ownerId' | 'isDeleted'> {}
