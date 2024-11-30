import React from "react";
import {
  Drawer,
  DrawerTrigger,
} from "~/components/ui/drawer"
import CreateBillDrawer from "~/components/portal/billtracker/CreateBillDrawer"
import { Button } from "~/components/ui/button"

type CreateBillFormProps = {
  date: Date;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create Bill Form. Get date from calendar
export default function CreateBillForm({date, setIsOpen}: CreateBillFormProps) {
  return (
    <div>
      <div className="flex flex-row w-full">
        <h3 className="font-medium leading-none
          text-center mx-auto mt-2 py-2 md:text-xl">
          {date.toDateString()}
        </h3>
        <button className="justify-self-end ml-auto bg-none
          text-primary text-m md:text-xl"
          onClick={() => setIsOpen(false)}
        >
          x
        </button>
      </div>
      <Drawer>
        <DrawerTrigger className="w-full">
          <Button variant="outline" size="icon"
            className="border-none w-full"
          >
            Create new Bill
          </Button>
        </DrawerTrigger>
        <CreateBillDrawer date={date} />
      </Drawer>
    </div>
  );
}
