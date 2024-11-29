"use client"
import * as React from "react"
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer"
import BillForm from "~/components/billtracker/BillForm"

type CreateBillDrawerProps = {
  date: Date;
};

export default function CreateBillDrawer({date}: CreateBillDrawerProps) {

  return (
    <DrawerContent className="w-full mx-auto items-center justify-center">
      <DrawerHeader>
        <DrawerTitle className="text-center md:text-2xl">
          {date.toDateString()}
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-row w-full mx-auto justify-center">
        <BillForm />
      </div>
      <DrawerFooter>
        <DrawerClose />
      </DrawerFooter>
    </DrawerContent>
  );
}
