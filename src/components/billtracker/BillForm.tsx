"use server"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const schema = z.object({
  billType: z.enum(["Rent", "Power", "Internet", "Gas", "Water", "Phone Bill", "Cable",
    "Security Deposit", "Other"]),
  billDescription: z.string().optional(),
  amount: z.number(),
  recurrence: z.enum(["No recurrence", "Monthly", "Bi-weekly", "Weekly", "Annually"]),
  includeUserInSplit: z.boolean().optional(),
  roommates: z.array(z.object({
    userID: z.string(),
    includeInSplit: z.boolean(),
  })).optional(),
});

export async function createBill(formData: FormData) {
  const validateFields = schema.safeParse({
    billType: formData.get("billType"),
    billDescription: formData.get("billDescription"),
    amount: formData.get("amount"),
    recurrence: formData.get("recurrence"),
    includeUserInSplit: formData.get("includeUserInSplit"),
    roommates: formData.get("roommates"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    }
  }
}

export default async function BillForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      //billType: "Rent",
      recurrence: "No recurrence",
      includeUserInSplit: true,
    },
  });
  return (
    <div className="">
      <form action={createBill}>
        <div>
          <label htmlFor="billType">Bill Type</label>
          <select id="billType" name="billType" required className="">
            <option value="Rent">Rent</option>
            <option value="Power">Power</option>
            <option value="Internet">Internet</option>
            <option value="Gas">Gas</option>
            <option value="Water">Water</option>
            <option value="Phone Bill">Phone Bill</option>
            <option value="Cable">Cable</option>
            <option value="Security Deposit">Security Deposit</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="billDescription">Bill Description</label>
          <input type="text" id="billDescription" name="billDescription" className="" />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" required className="" />
        </div>
        <div>
          <label htmlFor="recurrence">Recurrence</label>
          <select id="recurrence" name="recurrence" required className="">
            <option value="No recurrence">No recurrence</option>
            <option value="Monthly">Monthly</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Weekly">Weekly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>
        <div>
          <label htmlFor="includeUserInSplit">Include Yourself in Bill Split?</label>
          <input type="checkbox" id="includeUserInSplit" name="includeUserInSplit" className="" />
        </div>
      </form>
    </div>
  );
}
