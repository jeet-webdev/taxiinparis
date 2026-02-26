// import { PrismaClient } from '@/src/generated/prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from '@/src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

async function createPrismaClient() {
  // If we are in the browser, don't even try to load pg
  if (typeof window !== 'undefined') return {} as PrismaClient;

  // Use dynamic import to hide 'pg' from the client-side bundler
  const { Pool } = await import('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ['query'],
  });
}

// Check environment to export the instance
if (typeof window === 'undefined') {
  prismaInstance = globalForPrisma.prisma ?? (await createPrismaClient());
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} else {
  prismaInstance = {} as PrismaClient;
}

export const prisma = prismaInstance;