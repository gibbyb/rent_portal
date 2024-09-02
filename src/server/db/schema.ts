import {
  boolean,
  timestamp,
  pgTable,
  text,
  pgEnum,
  primaryKey,
  integer,
  numeric,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"
 
const connectionString = process.env.DATABASE_URL ?? "";
const pool = postgres(connectionString, { max: 1 })
export const db = drizzle(pool)
 
export const frequencyEnum = pgEnum("frequency", ["Monthly", "Bi-weekly", "Weekly"]);
export const workOrderStatusEnum = pgEnum("workOrderStatus", ["Pending", "Open", "Closed"]);
export const paymentTypeEnum = pgEnum("paymentType", ["Security Deposit", "Rent", "Late Fee", "Other"]);
export const paymentStatusEnum = pgEnum("paymentStatus", ["Pending", "Complete", "Late", "Refunded"]);
export const preferredDaysofWeekEnum = pgEnum("preferredDaysofWeek", 
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
);
export const propertyTypeEnum = pgEnum("propertyType", ["Apartment", "Condominium",
  "Mobile Home", "Multi-Unit Home", "Single-Family Residence", "Townhouse"]
);
export const workOrderPriorityEnum = pgEnum("workOrderPriority", ["Low", "High"]
);
export const workOrderTypeEnum = pgEnum("workOrderType",
  ["Appliance Repair", "Carbon Monoxide Detector Installation", "Ceiling Fan Repair", 
   "Carpentry Repair", "Door Installation/Repair", "Drywall Installation/Repair", 
   "Electrical Repair", "Extermination", "Fire Alarm Maintenance", "Fencing Repair", 
   "Gutter Cleaning", "HVAC Repair", "Light Fixture Repair", "Mold Remediation", 
   "Painting", "Pest Control", "Pool/Hot Tub Maintenance", "Plumbing Repair", 
   "Roof Repair/Maintenance", "Septic System Maintenance", "Smoke Detector Replacement", 
   "Tile Flooring", "Tree Trimming/Cutting", "Water Treatment", "Well/Water Testing", 
   "Window Repair/Installation"]
);
export const billStatusEnum = pgEnum("billStatus",
  ["Awaiting Payment", "Paid", "Scheduled", "Late", "Refunded"]
);
export const billTypeEnum = pgEnum("billType",
  ["Rent", "Power", "Internet", "Gas", "Water", "Phone Bill", "Cable",
  "Security Deposit", "Other"]
);
export const billPaymentTypeEnum = pgEnum("billPaymentType",
  ["Paid Online", "Zelle", "Cash", "Cash App", "Apple Pay"]
);
export const billRecurrenceEnum = pgEnum("billRecurrence",
  ["Monthly", "Bi-weekly", "Weekly", "Annually"]
);

export const users = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    phoneNumber: text("phoneNumber"),
    propertyID: text("propertyID").references(() => properties.id, { onDelete: "cascade" }),
    stripeCustomerID: text("stripeCustomerID"),
  }
)
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  }
)
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const admins = pgTable(
  "admin",
  {
    id: text("id").primaryKey(),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
  }
)

export const properties = pgTable(
  "property",
  {
    id: text("id").primaryKey(),
    address1: text("address1").unique().notNull(),
    address2: text("address2"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zip: text("zip").notNull(),
    monthlyRent: numeric("monthlyRent").notNull(),
    securityDeposit: numeric("securityDeposit"),
    leaseStartDate: timestamp("leaseStartDate").notNull(),
    leaseEndDate: timestamp("leaseEndDate").notNull(),
    propertyType: propertyTypeEnum("propertyType").notNull(),
  }
)

export const payments = pgTable(
  "payment",
  {
    id: text("id").primaryKey(),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
    stripePaymentID: text("stripeID"),
    amount: numeric("amount").notNull(),
    paymentDate: timestamp("paymentDate").notNull(),
    paymentType: paymentTypeEnum("paymentType").notNull(),
    paymentStatus: paymentStatusEnum("paymentStatus").notNull(),
  }
)

export const autoPayments = pgTable(
  "autoPayment",
  {
    id: text("id").primaryKey(),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
    amount: numeric("amount").notNull(),
    frequency: frequencyEnum("frequency").notNull(),
    preferredDayofWeek: preferredDaysofWeekEnum("preferredDayofWeek").notNull(),
    startDate: timestamp("startDate").notNull(),
    nextPaymentDate: timestamp("nextPaymentDate").notNull(),
    stripePaymentMethodID: text("stripePaymentMethodID").notNull(),
  }
)

export const workorders = pgTable(
  "workorder",
  {
    id: text("id").primaryKey(),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
    date: timestamp("date").notNull(),
    type: workOrderTypeEnum("type").notNull(),
    status: workOrderStatusEnum("status").notNull().default("Pending"),
    priority: workOrderPriorityEnum("priority").notNull().default("Low"),
    title: text("title").notNull(),
    description: text("description"),
  }
)

export const documents = pgTable(
  "document",
  {
    id: text("id").primaryKey(),
    propertyID: text("propertyID").notNull().references(() => properties.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: text("type").notNull(),
    file: text("file").notNull(),
  }
)

export const emergencyContacts = pgTable(
  "emergencyContact",
  {
    id: text("id").primaryKey(),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    mobilePhoneNumber: text("mobilePhoneNumber"),
    workPhoneNumber: text("workPhoneNumber"),
    email: text("email"),
  }
)

export const bills = pgTable(
  "bill",
  {
    id: text("id").primaryKey(),
    billType: billTypeEnum("billType").notNull(),
    billDescription: text("billDescription"),
    createdBy: text("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    dueDate: timestamp("dueDate").notNull(),
    amount: numeric("amount").notNull(),
    currency: text("currency").notNull().default("USD"),
    recurrence: billRecurrenceEnum("recurrence"),
    attachmentUrl: text("attachmentUrl"),
  }
)

export const billsSplitBetween = pgTable(
  "billSplitBetween",
  {
    id: text("id").primaryKey(),
    billID: text("billID").notNull().references(() => bills.id, { onDelete: "cascade" }),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
    amount: numeric("amount").notNull(),
    status: billStatusEnum("status").notNull(),
    paymentType: billPaymentTypeEnum("paymentType"),
    paidAt: timestamp("paidAt"),
    attachmentUrl: text("attachmentUrl"),
  }
)

export const billReminders = pgTable(
  "billReminders",
  {
    id: text("id").primaryKey(),
    billID: text("billID").notNull().references(() => bills.id, { onDelete: "cascade" }),
    userID: text("userID").notNull().references(() => users.id, { onDelete: "cascade" }),
    reminderDate: timestamp("reminderDate").notNull(),
    reminderSent: boolean("reminderSent").notNull().default(false),
  }
)
