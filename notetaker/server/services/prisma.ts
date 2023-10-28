import {PrismaClient} from '@prisma/client';

const client = new PrismaClient()

export function usePrisma(){
  return client;
}