
import FormInput from "../components/FormInput";

const Step3KYC = ({ register, errors }) => {
  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          KYC Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your identity details for verification.
        </p>
      </div>

      {/* KYC Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="PAN Number"
          name="panNumber"
          placeholder="ABCDE1234F"
          register={register}
          error={errors.panNumber}
        />

        <FormInput
          label="Aadhaar Number"
          name="aadhaarNumber"
          type="text"
          placeholder="Enter 12-digit Aadhaar number"
          register={register}
          error={errors.aadhaarNumber}
        />
      </div>
    </div>
  );
};

export default Step3KYC;

