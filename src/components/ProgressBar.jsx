
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8 w-full">
      {/* Progress Information */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Step {currentStep} of {totalSteps}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            Keep going, you're doing great!
          </p>
        </div>

        {/* Percentage */}
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

