
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

const Step2Loan = ({ register, errors }) => {
  const loanTypes = [
    {
      value: "personal",
      label: "Personal Loan",
    },
    {
      value: "home",
      label: "Home Loan",
    },
    {
      value: "education",
      label: "Education Loan",
    },
    {
      value: "car",
      label: "Car Loan",
    },
    {
      value: "business",
      label: "Business Loan",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* Heading */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Loan Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Tell us about the loan you are looking for.
        </p>
      </div>

      {/* Loan Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormSelect
          label="Loan Type"
          name="loanType"
          options={loanTypes}
          register={register}
          error={errors.loanType}
        />

        <FormInput
          label="Loan Amount"
          name="loanAmount"
          type="number"
          placeholder="Enter loan amount"
          register={register}
          error={errors.loanAmount}
        />

        <FormInput
          label="Loan Tenure (Years)"
          name="loanTenure"
          type="number"
          placeholder="Enter tenure in years"
          register={register}
          error={errors.loanTenure}
        />
      </div>
    </div>
  );
};

export default Step2Loan;

