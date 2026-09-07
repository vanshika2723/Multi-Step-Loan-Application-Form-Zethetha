
import FormInput from "../components/FormInput";

const Step6CoApplicant = ({ register, errors, watch }) => {
  const hasCoApplicant = watch("hasCoApplicant");

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Co-Applicant Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add a co-applicant if required for your loan application.
        </p>
      </div>

      {/* Co-Applicant Selection */}
      <div className="mb-6 flex flex-col gap-2">
        <label
          htmlFor="hasCoApplicant"
          className="text-sm font-semibold text-slate-700"
        >
          Do you have a co-applicant?
        </label>

        <select
          id="hasCoApplicant"
          {...register("hasCoApplicant", {
            setValueAs: (value) => value === "true",
          })}
          className={`
            w-full
            cursor-pointer
            rounded-xl
            border
            bg-white
            px-4 py-3
            text-sm
            text-slate-700
            shadow-sm
            outline-none
            transition-all duration-200
            ${
              errors.hasCoApplicant
                ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            }
          `}
        >
          <option value="" className="text-slate-400">
            Select an option
          </option>

          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        {errors.hasCoApplicant && (
          <p className="text-xs font-medium text-red-500">
            Please select an option
          </p>
        )}
      </div>

      {/* Co-Applicant Fields */}
      {hasCoApplicant === true && (
        <div className="grid grid-cols-1 gap-5 border-t border-slate-100 pt-6 md:grid-cols-2">
          <FormInput
            label="Co-Applicant Name"
            name="coApplicantName"
            placeholder="Enter co-applicant name"
            register={register}
            error={errors.coApplicantName}
          />

          <FormInput
            label="Co-Applicant Phone"
            name="coApplicantPhone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            register={register}
            error={errors.coApplicantPhone}
          />
        </div>
      )}
    </div>
  );
};

export default Step6CoApplicant;

