
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Step8Review from "./pages/Step8Review";
import ProgressBar from "./components/ProgressBar";
import { loanSchema } from "./schemas/loanSchema";

import Step1Personal from "./pages/Step1Personal";
import Step2Loan from "./pages/Step2Loan";
import Step3KYC from "./pages/Step3KYC";
import Step4Address from "./pages/Step4Address";
import Step5Employment from "./pages/Step5Employment";
import Step6CoApplicant from "./pages/Step6CoApplicant";
import Step7Documents from "./pages/Step7Documents";

// ==========================================
// INITIAL FORM VALUES
// ==========================================

const initialFormValues = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",

  loanType: "",
  loanAmount: undefined,
  loanTenure: undefined,

  panNumber: "",
  aadhaarNumber: "",

  address: "",
  city: "",
  state: "",
  pincode: "",

  employmentType: "",
  monthlyIncome: undefined,
  companyName: "",

  hasCoApplicant: false,
  coApplicantName: "",
  coApplicantPhone: "",
};

// ==========================================
// LOAD SAVED DATA
// ==========================================

const getSavedData = () => {
  try {
    const saved = localStorage.getItem("loanApplicationData");

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("Invalid saved form data:", error);

    localStorage.removeItem("loanApplicationData");

    return null;
  }
};

// ==========================================
// APP
// ==========================================

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [documents, setDocuments] = useState({
    identity: null,
    income: null,
  });

  const [signature, setSignature] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [saveStatus, setSaveStatus] = useState("saved");

  // ==========================================
  // REACT HOOK FORM
  // ==========================================

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loanSchema),
    mode: "onTouched",

    defaultValues: getSavedData() || initialFormValues,
  });

  // Watch all form data
  const formData = watch();

  // ==========================================
  // AUTO SAVE
  // ==========================================

  useEffect(() => {
    if (isSubmitted) {
      return;
    }

    setSaveStatus("saving");

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          "loanApplicationData",
          JSON.stringify(formData)
        );

        setSaveStatus("saved");
      } catch (error) {
        console.error("Failed to save form:", error);
        setSaveStatus("error");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [formData, isSubmitted]);

  // ==========================================
  // FINAL SUBMIT
  // ==========================================

  const onSubmit = (data) => {
    // Identity document
    if (!documents.identity) {
      alert("Please upload your identity document.");
      setCurrentStep(7);
      return;
    }

    // Income document
    if (!documents.income) {
      alert("Please upload your income document.");
      setCurrentStep(7);
      return;
    }

    // Signature
    if (!signature) {
      alert("Please provide and save your e-signature.");
      setCurrentStep(7);
      return;
    }

    // Final application
    const finalApplication = {
      ...data,

      documents: {
        identity: {
          name: documents.identity.name,
          type: documents.identity.type,
          size: documents.identity.size,
        },

        income: {
          name: documents.income.name,
          type: documents.income.type,
          size: documents.income.size,
        },
      },

      signature,

      submittedAt: new Date().toISOString(),
    };

    console.log(
      "Final Loan Application:",
      finalApplication
    );

    // Stop auto-save
    setIsSubmitted(true);

    // Remove saved draft
    localStorage.removeItem("loanApplicationData");

    // Reset form
    reset(initialFormValues);

    // Reset documents
    setDocuments({
      identity: null,
      income: null,
    });

    // Reset signature
    setSignature(null);

    // Go back to Step 1
    setCurrentStep(1);

    alert("Loan application submitted successfully!");

    // Allow saving for next application
    setTimeout(() => {
      setIsSubmitted(false);
    }, 100);
  };

  // ==========================================
  // NEXT STEP
  // ==========================================

  const nextStep = async () => {
    // Step 7 does not use React Hook Form fields.
    // Therefore directly move to Step 8.

    if (currentStep === 7) {
      setCurrentStep(8);
      return;
    }

    const fieldsByStep = {
      1: [
        "fullName",
        "email",
        "phone",
        "dateOfBirth",
      ],

      2: [
        "loanType",
        "loanAmount",
        "loanTenure",
      ],

      3: [
        "panNumber",
        "aadhaarNumber",
      ],

      4: [
        "address",
        "city",
        "state",
        "pincode",
      ],

      5: [
        "employmentType",
        "monthlyIncome",
        "companyName",
      ],

      6: [
        "hasCoApplicant",
        "coApplicantName",
        "coApplicantPhone",
      ],
    };

    const fields = fieldsByStep[currentStep] || [];

    const isValid = await trigger(fields);

    if (isValid) {
      setCurrentStep((step) => step + 1);
    }
  };

  // ==========================================
  // PREVIOUS STEP
  // ==========================================

  const previousStep = () => {
    setCurrentStep((step) => step - 1);
  };

  // ==========================================
  // SAVE STATUS
  // ==========================================

  const SaveStatus = () => {
    if (saveStatus === "saving") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          Saving...
        </span>
      );
    }

    if (saveStatus === "error") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          Save failed
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px]">
          ✓
        </span>
        Draft saved
      </span>
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-5xl">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                🏦
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                  Loan Application
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Complete your application in a few simple steps.
                </p>
              </div>

            </div>

            {/* SAVE STATUS */}

            <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-2">

              <span className="text-sm">
                💾
              </span>

              <SaveStatus />

            </div>

          </div>

        </div>

        {/* ======================================
            PROGRESS
        ====================================== */}

        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

          <ProgressBar
            currentStep={currentStep}
            totalSteps={8}
          />

        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6"
        >

          {/* STEP INDICATOR */}

          <div className="mb-4 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                Application Progress
              </p>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Step {currentStep} of 8
              </p>

            </div>

            <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
              {Math.round((currentStep / 8) * 100)}% Complete
            </div>

          </div>

          {/* ======================================
              STEP 1
          ====================================== */}

          {currentStep === 1 && (
            <Step1Personal
              register={register}
              errors={errors}
            />
          )}

          {/* ======================================
              STEP 2
          ====================================== */}

          {currentStep === 2 && (
            <Step2Loan
              register={register}
              errors={errors}
            />
          )}

          {/* ======================================
              STEP 3
          ====================================== */}

          {currentStep === 3 && (
            <Step3KYC
              register={register}
              errors={errors}
            />
          )}

          {/* ======================================
              STEP 4
          ====================================== */}

          {currentStep === 4 && (
            <Step4Address
              register={register}
              errors={errors}
            />
          )}

          {/* ======================================
              STEP 5
          ====================================== */}

          {currentStep === 5 && (
            <Step5Employment
              register={register}
              errors={errors}
            />
          )}

          {/* ======================================
              STEP 6
          ====================================== */}

          {currentStep === 6 && (
            <Step6CoApplicant
              register={register}
              errors={errors}
              watch={watch}
            />
          )}

          {/* ======================================
              STEP 7
          ====================================== */}

          {currentStep === 7 && (
            <Step7Documents
              documents={documents}
              setDocuments={setDocuments}
              signature={signature}
              setSignature={setSignature}
            />
          )}

          {/* ======================================
              STEP 8
          ====================================== */}

          {currentStep === 8 && (
            <Step8Review
              formData={formData}
              setCurrentStep={setCurrentStep}
              documents={documents}
              signature={signature}
            />
          )}

          {/* ======================================
              NAVIGATION
          ====================================== */}

          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">

            {/* PREVIOUS */}

            {currentStep > 1 ? (
              <button
                type="button"
                onClick={previousStep}
                className="
                  rounded-xl
                  border border-slate-200
                  bg-white
                  px-5 py-3
                  text-sm font-semibold
                  text-slate-600
                  shadow-sm
                  transition-all duration-200
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:text-indigo-600
                  active:scale-95
                "
              >
                ← Previous
              </button>
            ) : (
              <div />
            )}

            {/* NEXT */}

            {currentStep < 8 && (
              <button
                type="button"
                onClick={nextStep}
                className="
                  rounded-xl
                  bg-indigo-500
                  px-7 py-3
                  text-sm font-semibold
                  text-white
                  shadow-md
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-indigo-600
                  hover:shadow-lg
                  active:scale-95
                "
              >
                Next →
              </button>
            )}

            {/* SUBMIT */}

            {currentStep === 8 && (
              <button
                type="submit"
                className="
                  rounded-xl
                  bg-emerald-500
                  px-7 py-3
                  text-sm font-semibold
                  text-white
                  shadow-md
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:bg-emerald-600
                  hover:shadow-lg
                  active:scale-95
                "
              >
                Submit Application ✓
              </button>
            )}

          </div>

        </form>

        {/* ======================================
            FOOTER
        ====================================== */}

        <div className="mt-5 flex items-center justify-center gap-2 text-center">

          <span className="text-xs">
            🔒
          </span>

          <p className="text-xs text-slate-400">
            Your information is securely saved while you complete the application.
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;

