
const NavigationButtons = ({
  onPrevious,
  onNext,
  isFirstStep = false,
  isLastStep = false,
}) => {
  return (
    <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
      
      {/* Previous Button */}
      {!isFirstStep && (
        <button
          type="button"
          onClick={onPrevious}
          className="
            rounded-xl
            border border-slate-200
            bg-white
            px-6 py-3
            text-sm font-semibold
            text-slate-600
            shadow-sm
            transition-all duration-200
            hover:border-indigo-200
            hover:bg-indigo-50
            hover:text-indigo-600
            active:scale-95
          "
        >
          ← Previous
        </button>
      )}

      {/* Next / Submit Button */}
      <button
        type="submit"
        className={`
          rounded-xl
          px-7 py-3
          text-sm font-semibold
          text-white
          shadow-md
          transition-all duration-200
          hover:-translate-y-0.5
          hover:shadow-lg
          active:scale-95
          ${
            isLastStep
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-indigo-500 hover:bg-indigo-600"
          }
          ${isFirstStep ? "ml-auto" : ""}
        `}
      >
        {isLastStep ? "Submit Application ✓" : "Next →"}
      </button>
    </div>
  );
};

export default NavigationButtons;

