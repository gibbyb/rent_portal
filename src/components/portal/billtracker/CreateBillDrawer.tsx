"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "~/lib/utils"
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
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Checkbox } from "~/components/ui/checkbox"

type CreateBillDrawerProps = {
  date: Date;
};

type ComboOption = {
  label: string;
  value: string;
};

const FormSchema = z.object({
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

const billTypeCombo: ComboOption[] = 
  FormSchema.shape.billType._def.values.map((billType: string) => ({
  value: billType,
  label: billType,
}));
const recurrenceCombo: ComboOption[] =
  FormSchema.shape.recurrence._def.values.map((recurrence: string) => ({
  value: recurrence,
  label: recurrence,
}));

export default function CreateBillDrawer({date}: CreateBillDrawerProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      //billType: "Rent",
      recurrence: "No recurrence",
      includeUserInSplit: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('API received data:', data);
    try {
      console.log('API received data:', data);
      //const res = await fetch("/api/bills/createBill", {
        //method: "POST",
        //headers: {
          //"Content-Type": "application/json",
        //},
        //body: JSON.stringify({
          //date: date,
          //billType: data.billType,
          //billDescription: data.billDescription,
          //amount: data.amount,
          //recurrence: data.recurrence,
          //includeUserInSplit: data.includeUserInSplit,
          //roommates: data.roommates,
        //}),
      //});
      //if (!res.ok) {
        //throw new Error("Failed to create bill");
      //}
    } catch (error) {
      console.error("Could not create bill", error);
    }
  };

  return (
    <DrawerContent className="w-full mx-auto items-center justify-center">
      <DrawerHeader>
        <DrawerTitle className="text-center md:text-2xl">
          {date.toDateString()}
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-row w-full mx-auto justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row mt-4">
            <FormField
              control={form.control}
              name="billType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-auto">
                    Bill Type
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[160px] justify-between mr-2",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? billTypeCombo.find(
                                (billType) => billType.value === field.value
                              )?.label
                            : "Select bill type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No bill type found.</CommandEmpty>
                          <CommandGroup>
                            {billTypeCombo.map((billType) => (
                              <CommandItem
                                value={billType.label}
                                key={billType.value}
                                onSelect={() => {
                                  form.setValue("billType", billType.value as typeof field.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    billType.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {billType.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            >
            </FormField>
            <FormField
              control={form.control}
              name="billDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional Bill Description or any additional notes"
                      {...field}
                      className="md:w-[400px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            >
            </FormField>
          </div>
          <div className="flex flex-row my-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="mr-2">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>
                </FormItem>
              )}
            >
            </FormField>
            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-auto">Recurrence</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[160px] justify-between mr-2",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? recurrenceCombo.find(
                                (recurrence) => recurrence.value === field.value
                              )?.label
                            : "Select recurrence"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No recurrence found.</CommandEmpty>
                          <CommandGroup>
                            {recurrenceCombo.map((recurrence) => (
                              <CommandItem
                                value={recurrence.label}
                                key={recurrence.value}
                                onSelect={() => {
                                  form.setValue("recurrence", recurrence.value as typeof field.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    recurrence.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {recurrence.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            >
            </FormField>
            <FormField
              control={form.control}
              name="includeUserInSplit"
              render={({ field }) => (
                <FormItem className="mt-10">
                  <div className="flex flex-row">
                    <FormLabel>Include Yourself in Bill Split?</FormLabel>
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="ml-2"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            >
            </FormField>
          </div>
          <FormField
            control={form.control}
            name="roommates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roommates</FormLabel>
                <FormControl>
                </FormControl>
              </FormItem>
            )}
          >
          </FormField>
          <div className="w-full flex justify-end">
            <Button type="submit" variant="secondary"
              className="mt-2"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      </div>
      <DrawerFooter>
        <DrawerClose />
      </DrawerFooter>
    </DrawerContent>
  );
}
