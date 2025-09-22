import z from "zod";
import { ApiRes } from "../ApiResponse";
import STATUS from "../Statuses";

//Function to validate the zod schema while storing data in database
const ZodFormValidator = ({ payload, formSchema }) => {
  // Validate payload with Zod
  const parseResult = payload?.formData
    ? formSchema.safeParse(payload.formData)
    : formSchema.safeParse(payload);

  if (!parseResult.success) {
    return ApiRes(
      false,
      STATUS.BAD_REQUEST,
      "Zod Validation failed",
      parseResult.error.flatten()
    );
  }

  return parseResult;
};

// Portal Form schema
const portalFormSchema = z.object({
  portalName: z.string().min(1, { message: "This field is required" }),
  appName: z.string().min(1, { message: "This field is required" }),
  userName: z.string(),
  password: z.string(),
  memorableWord: z.string(),
  portalUrl: z.string().url().optional(),
});

// User form Schema
//NI Number regex
const niRegex = /^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/i;

const userFormSchema = z.object({
  eMemberId: z.number().optional().nullable(),
  xpsId: z.number().optional().nullable(),
  userHashId: z.string().min(0).optional(),
  // uuid: z.string().uuid().optional(),
  userName: z.string().min(0).optional(),
  password: z
    .string()
    .min(0)
    .optional()
    .refine((v) => (v ? v.length >= 6 : true), {
      message: "Password must be at least 6 characters",
    }),
  memorableWord: z.string().min(0).optional(),
  xpsSchemeId: z.number().optional().nullable(),
  eMemberSchemeId: z.number().optional().nullable(),
  statusId: z.number().optional().nullable(),
  dob: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v === "") return true;
        // basic ISO date check
        return !Number.isNaN(Date.parse(v));
      },
      { message: "Invalid date" }
    )
    .nullable(),
  niNumber: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v.trim() === "") return true;
        return niRegex.test(v);
      },
      { message: "NI must be in format AA123456A" }
    )
    .nullable(),
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
    )
    .nullable(),
});

const userFormSchema2 = z.object({
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
  niNumber: z.string(),
  userEmail: z.string(),
});

export { ZodFormValidator, portalFormSchema, userFormSchema, userFormSchema2 };
