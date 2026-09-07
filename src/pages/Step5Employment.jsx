
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

const Step5Employment = ({ register, errors }) => {
  const employmentTypes = [
    {
      value: "salaried",
      label: "Salaried",
    },
    {
      value: "self-employed",
      label: "Self Employed",
    },
    {
      value: "business",
      label: "Business Owner",
    },
    {
      value: "student",
      label: "Student",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Employment Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please provide your employment and income details.
        </p>
      </div>

      {/* Employment Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormSelect
          label="Employment Type"
          name="employmentType"
          options={employmentTypes}
          register={register}
          error={errors.employmentType}
        />

        <FormInput
          label="Monthly Income"
          name="monthlyIncome"
          type="number"
          placeholder="Enter monthly income"
          register={register}
          error={errors.monthlyIncome}
        />

        <FormInput
          label="Company Name"
          name="companyName"
          placeholder="Enter company/business name"
          register={register}
          error={errors.companyName}
        />
      </div>
    </div>
  );
};

export default Step5Employment;

