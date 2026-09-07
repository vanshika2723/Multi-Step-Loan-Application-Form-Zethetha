
import { z } from "zod";

export const loanSchema = z
  .object({
    // =========================
    // Step 1 - Personal Details
    // =========================

    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name is too long"),

    email: z
      .string()
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),

    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required"),

    // =========================
    // Step 2 - Loan Details
    // =========================

    loanType: z
      .string()
      .min(1, "Please select a loan type"),

    loanAmount: z
      .number()
      .min(10000, "Minimum loan amount is ₹10,000")
      .max(10000000, "Maximum loan amount is ₹1 crore"),

    loanTenure: z
      .number()
      .min(1, "Minimum tenure is 1 year")
      .max(30, "Maximum tenure is 30 years"),

    // =========================
    // Step 3 - KYC
    // =========================

    panNumber: z
      .string()
      .regex(
        /^[A-Z]{5}[0-9]{4}[A-Z]$/,
        "Please enter a valid PAN number"
      ),

    aadhaarNumber: z
      .string()
      .regex(
        /^\d{12}$/,
        "Aadhaar number must contain exactly 12 digits"
      ),

    // =========================
    // Step 4 - Address
    // =========================

    address: z
      .string()
      .min(5, "Address must be at least 5 characters"),

    city: z
      .string()
      .min(2, "City is required"),

    state: z
      .string()
      .min(2, "State is required"),

    pincode: z
      .string()
      .regex(
        /^[1-9][0-9]{5}$/,
        "Please enter a valid 6-digit pincode"
      ),

    // =========================
    // Step 5 - Employment
    // =========================

    employmentType: z
      .string()
      .min(1, "Please select employment type"),

    monthlyIncome: z
      .number()
      .min(1000, "Monthly income must be at least ₹1,000"),

    companyName: z
      .string()
      .min(2, "Company name is required"),

    // =========================
    // Step 6 - Co-Applicant
    // =========================

    hasCoApplicant: z.boolean(),

    coApplicantName: z.string().optional(),

    coApplicantPhone: z.string().optional(),
  })

  // =========================
  // Conditional Validation
  // =========================

  .superRefine((data, ctx) => {
    if (data.hasCoApplicant) {
      // Co-applicant name required
      if (!data.coApplicantName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coApplicantName"],
          message: "Co-applicant name is required",
        });
      } else if (data.coApplicantName.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coApplicantName"],
          message: "Name must be at least 3 characters",
        });
      }

      // Co-applicant phone required
      if (!data.coApplicantPhone?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coApplicantPhone"],
          message: "Co-applicant phone is required",
        });
      } else if (
        !/^[6-9]\d{9}$/.test(data.coApplicantPhone)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coApplicantPhone"],
          message: "Please enter a valid 10-digit phone number",
        });
      }
    }
  });

