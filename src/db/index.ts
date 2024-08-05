import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();
// db.snippet.create({ data: { title: "test", code: "const demo=()=>{ console.log('Demo code');}" } });

