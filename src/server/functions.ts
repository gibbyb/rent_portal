import "server-only"
import { db } from "~/server/db"
import * as schema from "~/server/db/schema"
import { eq } from "drizzle-orm"
//import { sql } from "drizzle-orm"

export const set_users_name_by_email = async (users_name: string, users_email: string) => {
  try {
    await db.update(schema.users)
      .set({ name: users_name })
      .where(eq(schema.users.email, users_email))
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;  // Ensure we rethrow to be caught by the calling function
  }
};

export const get_users_name_by_email = async (users_email: string) => {
  const result = await db.select({
    users_name: schema.users.name,
  }).from(schema.users)
  .where(eq(schema.users.email, users_email))
  return result;
}

export const set_users_pfp_by_email = async (users_pfp: string, users_email: string) => {
  try {
    await db.update(schema.users)
      .set({ image: users_pfp })
      .where(eq(schema.users.email, users_email))
  } catch (error) {
    console.error('Error updating user pfp:', error);
    throw error;
  }
};

export const get_users_pfp_by_email = async (users_email: string) => {
  const result = await db.select({
    users_pfp: schema.users.image,
  }).from(schema.users)
  .where(eq(schema.users.email, users_email))
  return result;
}
