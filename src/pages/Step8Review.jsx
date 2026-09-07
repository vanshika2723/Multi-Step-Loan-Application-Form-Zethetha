
const Step8Review = ({
  formData,
  setCurrentStep,
  documents,
  signature,
}) => {
  const loanAmount = Number(formData.loanAmount) || 0;
  const loanTenure = Number(formData.loanTenure) || 0;

  // Annual interest rate
  const annualInterestRate = 10;

  // Monthly interest rate
  const monthlyRate = annualInterestRate / 12 / 100;

  // Loan tenure in months
  const totalMonths = loanTenure * 12;

  let emi = 0;

  if (loanAmount > 0 && totalMonths > 0) {
    emi =
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const InfoItem = ({ label, value }) => (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="mb-1 text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="break-words text-sm font-semibold text-slate-700">
        {value || "Not provided"}
      </p>
    </div>
  );

  const ReviewSection = ({
    title,
    icon,
    step,
    children,
  }) => (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
            {icon}
          </div>

          <h3 className="text-base font-bold text-slate-800">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep(step)}
          className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-100 active:scale-95"
        >
          Edit
        </button>
      </div>

      {children}
    </div>
  );

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* ================================
          HEADER
      ================================= */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
            📋
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Review Your Application
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Almost there! Review your details before submitting.
            </p>
          </div>
        </div>
      </div>

      {/* ================================
          PERSONAL DETAILS
      ================================= */}
      <div className="space-y-5">

        <ReviewSection
          title="Personal Details"
          icon="👤"
          step={1}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="Full Name"
              value={formData.fullName}
            />

            <InfoItem
              label="Email"
              value={formData.email}
            />

            <InfoItem
              label="Phone"
              value={formData.phone}
            />

            <InfoItem
              label="Date of Birth"
              value={formData.dateOfBirth}
            />
          </div>
        </ReviewSection>

        {/* ================================
            LOAN DETAILS
        ================================= */}
        <ReviewSection
          title="Loan Details"
          icon="💰"
          step={2}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              label="Loan Type"
              value={formData.loanType}
            />

            <InfoItem
              label="Loan Amount"
              value={formatCurrency(loanAmount)}
            />

            <InfoItem
              label="Loan Tenure"
              value={
                loanTenure
                  ? `${loanTenure} years`
                  : "Not provided"
              }
            />
          </div>
        </ReviewSection>

        {/* ================================
            KYC DETAILS
        ================================= */}
        <ReviewSection
          title="KYC Details"
          icon="🪪"
          step={3}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="PAN Number"
              value={formData.panNumber}
            />

            <InfoItem
              label="Aadhaar Number"
              value={formData.aadhaarNumber}
            />
          </div>
        </ReviewSection>

        {/* ================================
            ADDRESS
        ================================= */}
        <ReviewSection
          title="Address Details"
          icon="📍"
          step={4}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="Address"
              value={formData.address}
            />

            <InfoItem
              label="City"
              value={formData.city}
            />

            <InfoItem
              label="State"
              value={formData.state}
            />

            <InfoItem
              label="PIN Code"
              value={formData.pincode}
            />
          </div>
        </ReviewSection>

        {/* ================================
            EMPLOYMENT
        ================================= */}
        <ReviewSection
          title="Employment Details"
          icon="💼"
          step={5}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              label="Employment Type"
              value={formData.employmentType}
            />

            <InfoItem
              label="Monthly Income"
              value={
                formData.monthlyIncome
                  ? formatCurrency(
                      Number(formData.monthlyIncome)
                    )
                  : "Not provided"
              }
            />

            <InfoItem
              label="Company Name"
              value={formData.companyName}
            />
          </div>
        </ReviewSection>

        {/* ================================
            CO-APPLICANT
        ================================= */}
        <ReviewSection
          title="Co-Applicant Details"
          icon="👥"
          step={6}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              label="Co-Applicant"
              value={
                formData.hasCoApplicant
                  ? "Yes"
                  : "No"
              }
            />

            {formData.hasCoApplicant && (
              <>
                <InfoItem
                  label="Name"
                  value={formData.coApplicantName}
                />

                <InfoItem
                  label="Phone"
                  value={formData.coApplicantPhone}
                />
              </>
            )}
          </div>
        </ReviewSection>

        {/* ================================
            DOCUMENTS
        ================================= */}
        <ReviewSection
          title="Documents & E-Signature"
          icon="📄"
          step={7}
        >
          <div className="space-y-3">

            {/* Identity */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                  🪪
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Identity Document
                  </p>

                  <p className="mt-0.5 break-all text-xs text-slate-400">
                    {documents?.identity
                      ? documents.identity.name
                      : "Not uploaded"}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  documents?.identity
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {documents?.identity
                  ? "✓ Uploaded"
                  : "✗ Missing"}
              </span>
            </div>

            {/* Income */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                  💼
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Income Document
                  </p>

                  <p className="mt-0.5 break-all text-xs text-slate-400">
                    {documents?.income
                      ? documents.income.name
                      : "Not uploaded"}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  documents?.income
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {documents?.income
                  ? "✓ Uploaded"
                  : "✗ Missing"}
              </span>
            </div>

            {/* Signature */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                  ✍️
                </span>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Electronic Signature
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    {signature
                      ? "Signature captured successfully"
                      : "Signature not provided"}
                  </p>
                </div>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  signature
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {signature
                  ? "✓ Completed"
                  : "✗ Missing"}
              </span>
            </div>
          </div>

          {/* Signature Preview */}
          {signature && (
            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="mb-3 text-xs font-semibold text-emerald-700">
                Signature Preview
              </p>

              <div className="overflow-hidden rounded-lg border border-emerald-100 bg-white p-3">
                <img
                  src={signature}
                  alt="Electronic signature"
                  className="h-24 w-full object-contain"
                />
              </div>
            </div>
          )}
        </ReviewSection>

        {/* ================================
            EMI CALCULATOR
        ================================= */}
        <div className="rounded-2xl bg-indigo-50 p-6 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🧮</span>

                <h3 className="text-base font-bold text-slate-800">
                  Estimated EMI
                </h3>
              </div>

              <div className="mt-3">
                <p className="text-3xl font-bold tracking-tight text-indigo-600">
                  {emi > 0
                    ? formatCurrency(Math.round(emi))
                    : "₹0"}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Estimated monthly payment
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[480px]">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <span className="text-xs text-slate-400">
                  Loan Amount
                </span>

                <strong className="mt-1 block text-sm font-bold text-slate-700">
                  {formatCurrency(loanAmount)}
                </strong>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <span className="text-xs text-slate-400">
                  Interest Rate
                </span>

                <strong className="mt-1 block text-sm font-bold text-slate-700">
                  {annualInterestRate}% p.a.
                </strong>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <span className="text-xs text-slate-400">
                  Tenure
                </span>

                <strong className="mt-1 block text-sm font-bold text-slate-700">
                  {loanTenure
                    ? `${loanTenure} years`
                    : "0 years"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* ================================
            FINAL NOTE
        ================================= */}
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-4">
          <div className="flex gap-3">
            <span className="text-lg">⚠️</span>

            <div>
              <p className="text-sm font-bold text-amber-800">
                Before submitting
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-700">
                Please make sure all the information provided
                above is correct. You can use the Edit buttons
                to update any section.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Step8Review;
