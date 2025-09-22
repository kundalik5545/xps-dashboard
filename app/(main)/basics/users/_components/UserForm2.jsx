"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Hash,
  User,
  LockKeyhole,
  ALargeSmall,
  CalendarIcon,
  Mail,
  RefreshCw,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { logger } from "@/lib/Log";

export default function UserForm2({ onFormSubmit, editingData }) {
  const [showPassword, setShowPassword] = useState(false);

  const niRegex = /^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/i;

  const formSchema = z.object({
    eMemberId: z.coerce.number().optional(),
    xpsId: z.coerce.number().optional(),
    userHashId: z.string(),
    userName: z.string(),
    password: z.string(),
    memorableWord: z.string(),
    xpsSchemeId: z.coerce.number().optional(),
    eMemberSchemeId: z.coerce.number().optional(),
    statusId: z.coerce.number().optional(),
    dob: z.date().optional().nullable(),
    niNumber: z
      .string()
      .optional()
      .refine(
        (v) => {
          if (!v || v.trim() === "") return true;
          return niRegex.test(v);
        },
        { message: "NI must be in format AA123456A" }
      ),
    userEmail: z.email().optional().nullable(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: editingData || {
      eMemberId: 0,
      xpsId: 0,
      userHashId: "",
      userName: "",
      password: "",
      memorableWord: "",
      xpsSchemeId: 0,
      eMemberSchemeId: 0,
      statusId: 0,
      dob: "",
      niNumber: "",
      userEmail: "",
    },
  });

  function onSubmit(values) {
    logger.front(values);
    onFormSubmit(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container"
      >
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="eMemberId"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">EMember ID*</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-0"
                        placeholder="Enter EMember ID"
                        type="number"
                        id="eMemberId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="xpsId"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">XPS ID*</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-1"
                        placeholder="Enter XPS ID"
                        type="number"
                        id="xpsId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userHashId"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Hash ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="Enter User Hash ID (Opt.)"
                        type="text"
                        id="userHashId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-1"
                        placeholder="Enter User Name (Opt.)"
                        type="text"
                        id="userName"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <User className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Password</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-2"
                        placeholder="Enter Password (Opt.)"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <LockKeyhole className="size-4" strokeWidth={2} />
                      </div>
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 end-0 flex items-center px-3 text-muted-foreground focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <Eye className="size-4" strokeWidth={2} />
                        ) : (
                          <EyeClosed className="size-4" strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="memorableWord"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Memorable Word</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-3"
                        placeholder="Enter Memorable Word (Opt.)"
                        type="text"
                        id="memorableWord"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <ALargeSmall className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="xpsSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">XPS Scheme ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-2"
                        placeholder="Enter XPS Scheme ID (Opt.)"
                        type="number"
                        id="xpsSchemeId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eMemberSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">
                  EMember Scheme ID
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-3"
                        placeholder="Enter EMember Schemem ID (Opt.)"
                        type="number"
                        id="eMemberSchemeId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-4 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Status ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-4"
                        placeholder="Enter Status ID (Opt.)"
                        type="number"
                        id="statusId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => {
              const [open, setOpen] = useState(false);
              return (
                <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">Date Picker</FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="justify-start text-left font-normal w-full"
                            id="dob"
                            name="dob"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-muted-foreground">
                                Pick a date
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                            initialFocus
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="niNumber"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">NI Number</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-4"
                        placeholder="Enter NI Number (Opt.)"
                        type="text"
                        id="niNumber"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Email</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="email-input-0"
                        placeholder="Enter User Email (Opt.)"
                        type="email"
                        id="userEmail"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Mail className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reset-button-0"
            render={({ field }) => (
              <FormItem className="col-span-6 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">Reset</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Button
                      key="reset-button-0"
                      id="reset-button-0"
                      name=""
                      className="w-full"
                      type="reset"
                      variant="outline"
                    >
                      <RefreshCw className="size-4" strokeWidth="2" />
                      Reset
                    </Button>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="submit-button-0"
            render={({ field }) => (
              <FormItem className="col-span-6 @5xl:col-span-6 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">Submit</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Button
                      key="submit-button-0"
                      id="submit-button-0"
                      name=""
                      className="w-full"
                      type="submit"
                      variant="default"
                    >
                      <Send className="size-4" strokeWidth="2" />
                      Submit
                    </Button>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
