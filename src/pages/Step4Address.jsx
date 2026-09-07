
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

const Step4Address = ({ register, errors }) => {
  const states = [
    { value: "rajasthan", label: "Rajasthan" },
    { value: "delhi", label: "Delhi" },
    { value: "haryana", label: "Haryana" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "gujarat", label: "Gujarat" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">
          Address Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your current residential address.
        </p>
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="Address"
          name="address"
          placeholder="House No., Street, Area"
          register={register}
          error={errors.address}
        />

        <FormInput
          label="City"
          name="city"
          placeholder="Enter your city"
          register={register}
          error={errors.city}
        />

        <FormSelect
          label="State"
          name="state"
          options={states}
          register={register}
          error={errors.state}
        />

        <FormInput
          label="PIN Code"
          name="pincode"
          type="text"
          placeholder="Enter 6-digit PIN code"
          register={register}
          error={errors.pincode}
        />
      </div>
    </div>
  );
};

export default Step4Address;

