"use client"
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"

type CreateBillDrawerProps = {
  date: Date;
};

const formSchema = z.object({
  billType: z.enum(["Rent", "Power", "Internet", "Gas", "Water", "Phone Bill", "Cable",
    "Security Deposit", "Other"]),
  billDescription: z.string().optional(),
  amount: z.number(),
  recurrence: z.enum(["Monthly", "Bi-weekly", "Weekly", "Annually"]).optional(),
  includeUserInSplit: z.boolean().optional(),
  roommates: z.array(z.object({
    userID: z.string(),
    includeInSplit: z.boolean(),
  })).optional(),
});

export default function CreateBillDrawer({date}: CreateBillDrawerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billType: "Rent",
      recurrence: "Monthly",
      includeUserInSplit: true,
    },
  });
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center md:text-2xl">
          {date.toDateString()}
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-row w-full mx-auto">
        <div className="w-1/2 mx-auto text-center">
          <h3>Test</h3>
        </div>
        <div className="w-1/2 mx-auto text-center">
          <h3>Test</h3>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose />
      </DrawerFooter>
    </DrawerContent>
  );
}
