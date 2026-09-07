
const FormSelect = ({
  label,
  name,
  options,
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

      {/* Select */}
      <select
        id={name}
        {...register(name)}
        className={`
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          text-sm
          text-slate-700
          shadow-sm
          outline-none
          transition-all
          duration-200
          cursor-pointer

          ${
            error
              ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
          }
        `}
      >
        <option value="" className="text-slate-400">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && (
        <p className="text-xs font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormSelect;

