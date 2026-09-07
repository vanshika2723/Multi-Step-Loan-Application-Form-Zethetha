
import FormInput from "../components/FormInput";

const Step1Personal = ({ register, errors }) => {
  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* Heading */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Personal Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please enter your basic personal information.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          register={register}
          error={errors.fullName}
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          register={register}
          error={errors.phone}
        />

        <FormInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          register={register}
          error={errors.dateOfBirth}
        />
      </div>
    </div>
  );
};

export default Step1Personal;

