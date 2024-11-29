"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

const formSchema = z.object({
  users_name: z.string().min(2, {
    message: "Really? Your name is one letter? You expect me to believe that?",
  }),
  users_profile_image: z.string().url().optional(),
});

export default function First_Sign_In_Form({ users_name, users_email }: { users_name: string, users_email: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const update_users_name = async (users_name: string, users_email: string) => {
    try {
      const res = await fetch("/api/users/set_users_name_by_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users_name: users_name,
          users_email: users_email,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update user's name");
      }
    } catch (error) {
      console.error("Could not update user's name", error);
    }
  };

  const update_users_pfp = async (users_pfp: string, users_email: string) => {
    try {
      const res = await fetch("/api/users/set_users_pfp_by_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users_pfp: users_pfp,
          users_email: users_email,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update user's name");
      }
    } catch (error) {
      console.error("Could not update user's name", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.users_profile_image === undefined) {
      data.users_profile_image = "";
    }
    await update_users_name(data.users_name, users_email);
    await update_users_pfp(data.users_profile_image, users_email);
    setIsOpen(false);
};

  useEffect(() => {
    if (users_name === "New User") {
      setIsOpen(true);
    }
  }, [users_name]);


  if (users_name === "New User") {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to the Tenant Portal</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill out the form to complete your account setup.
            </AlertDialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="users_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your name</FormLabel>
                      <FormControl>
                        <Input placeholder="First & Last Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                >
                </FormField>
                <FormField
                  control={form.control}
                  name="users_profile_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter a URL path to your profile picture</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/profile.jpg" {...field} />
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
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else {
    return (
      <div/>
    );
  }
};
