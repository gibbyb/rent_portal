import "server-only"
import { db } from "~/server/db"
import * as schema from "~/server/db/schema"
import { eq } from "drizzle-orm"
//import { sql } from "drizzle-orm"

export const set_users_name_by_email = async (users_name: string, users_email: string) => {
  try {
    console.log('Updating user:', users_email, 'with name:', users_name); // Log input
    await db.update(schema.users)
      .set({ name: users_name })
      .where(eq(schema.users.email, users_email))
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;  // Ensure we rethrow to be caught by the calling function
  }
};

export const get_users_name_by_id = async (users_id: string) => {
  const result = await db.select({
    users_name: schema.users.name,
  }).from(schema.users)
  .where(eq(schema.users.id, users_id))
  return result;
}
