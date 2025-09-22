"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Eye,
  EyeClosed,
  Hash,
  Link,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/**
 * User form for Prisma User model fields:
 *   eMemberId       Int?
 *   xpsId           Int?
 *   userHashId      String?
 *   userName        String?
 *   password        String?
 *   memorableWord   String?
 *   xpsSchemeId     Int?
 *   eMemberSchemeId Int?
 *   statusId        Int?
 *   dob             DateTime?
 *   niNumber        String?
 *   userEmail       String?
 *
 * Behavior / validation choices (reasonable defaults):
 * - All fields optional (matching ?), but if provided must satisfy format checks:
 *   - eMemberId, xpsId, xpsSchemeId, eMemberSchemeId, statusId -> optional positive ints
 *   - userEmail -> optional email format
 *   - niNumber -> optional, if provided must match UK NI pattern AA123456A (9 chars)
 *   - dob -> optional date (ISO string)
 *   - password -> optional but min length 6 if provided
 *   - userHashId -> optional string with min 6 chars
 *
 * Adjust validation rules to your project's requirements if you need stricter rules.
 */

const niRegex = /^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/i;

const positiveInt = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val === "") return true;

      return /^\d+$/.test(String(val)) && Number(val) >= 0;
    },
    { message: "Must be a non-negative integer" }
  );

const formSchema = z.object({
  eMemberId: positiveInt,
  xpsId: positiveInt,
  userHashId: z.string().min(0).optional(), // optional; if you want uuid: z.string().uuid().optional()
  userName: z.string().min(0).optional(),
  password: z
    .string()
    .min(0)
    .optional()
    .refine((v) => (v ? v.length >= 6 : true), {
      message: "Password must be at least 6 characters",
    }),
  memorableWord: z.string().min(0).optional(),
  xpsSchemeId: positiveInt,
  eMemberSchemeId: positiveInt,
  statusId: positiveInt,
  dob: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v === "") return true;

        return !Number.isNaN(Date.parse(v));
      },
      { message: "Invalid date" }
    ),
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
  userEmail: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v.trim() === "") return true;
        // simple email check
        return /^\S+@\S+\.\S+$/.test(v);
      },
      { message: "Invalid email address" }
    ),
});

export default function UserForm({ onFormSubmit, editingData }) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: editingData || {
      eMemberId: "",
      xpsId: "",
      userHashId: "",
      userName: "",
      password: "",
      memorableWord: "",
      xpsSchemeId: "",
      eMemberSchemeId: "",
      statusId: "",
      dob: "",
      niNumber: "",
      userEmail: "",
    },
  });

  function onSubmit(values) {
    // convert integer-like string fields to numbers if present
    const normalized = {
      ...values,
      eMemberId: values.eMemberId === "" ? null : Number(values.eMemberId),
      xpsId: values.xpsId === "" ? null : Number(values.xpsId),
      xpsSchemeId:
        values.xpsSchemeId === "" ? null : Number(values.xpsSchemeId),
      eMemberSchemeId:
        values.eMemberSchemeId === "" ? null : Number(values.eMemberSchemeId),
      statusId: values.statusId === "" ? null : Number(values.statusId),
      dob: values.dob === "" ? null : new Date(values.dob).toISOString(),
    };

    onFormSubmit(normalized);
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
          {/* eMemberId */}
          <FormField
            control={form.control}
            name="eMemberId"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>EMember ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter eMemberId (optional)"
                        id="eMemberId"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* xpsId */}
          <FormField
            control={form.control}
            name="xpsId"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>XPS ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter xpsId (optional)"
                        id="xpsId"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userHashId */}
          <FormField
            control={form.control}
            name="userHashId"
            render={({ field }) => (
              <FormItem className="col-span-12 flex flex-col gap-2">
                <FormLabel>User Hash ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter userHashId (optional)"
                        id="userHashId"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <LockKeyhole className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userName */}
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>User Name</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter userName (optional)"
                        id="userName"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <User className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>Password</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <LockKeyhole className="size-4" strokeWidth={2} />
                      </div>
                      <Input
                        placeholder="Enter Password (optional)"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="ps-9 pr-10"
                      />
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

          {/* memorableWord */}
          <FormField
            control={form.control}
            name="memorableWord"
            render={({ field }) => (
              <FormItem className="col-span-12 flex flex-col gap-2">
                <FormLabel>Memorable Word</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter memorable word (optional)"
                      id="memorableWord"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* xpsSchemeId */}
          <FormField
            control={form.control}
            name="xpsSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-4 flex flex-col gap-2">
                <FormLabel>XPS Scheme ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="xpsSchemeId (opt.)"
                      id="xpsSchemeId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* eMemberSchemeId */}
          <FormField
            control={form.control}
            name="eMemberSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-4 flex flex-col gap-2">
                <FormLabel>EMember Scheme ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="eMemberSchemeId (opt.)"
                      id="eMemberSchemeId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* statusId (example select with a few statuses) */}
          <FormField
            control={form.control}
            name="statusId"
            render={({ field }) => (
              <FormItem className="col-span-4 flex flex-col gap-2">
                <FormLabel>Status</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="statusId (opt.)"
                      id="statusId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* dob */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>Date of Birth</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="YYYY-MM-DD (optional)"
                        id="dob"
                        type="date"
                        {...field}
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Calendar className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* niNumber */}
          <FormField
            control={form.control}
            name="niNumber"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>NI Number</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="AA123456A (optional)"
                        id="niNumber"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Link className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userEmail */}
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="col-span-12 flex flex-col gap-2">
                <FormLabel>User Email</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter email (optional)"
                        id="userEmail"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Mail className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="col-span-6">
            <Button type="reset" variant="outline" className="w-full">
              Reset
            </Button>
          </div>
          <div className="col-span-6">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
