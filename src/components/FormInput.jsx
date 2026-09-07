
const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          valueAsNumber: type === "number",
        })}
        className={`
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          text-sm
          text-slate-700
          placeholder-slate-400
          shadow-sm
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
          }
        `}
      />

      {/* Error Message */}
      {error && (
        <p className="text-xs font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;

