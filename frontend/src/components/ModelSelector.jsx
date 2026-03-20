const ModelSelector = ({ selected, onChange, availableModels = [] }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-300">Prediction Model</label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none input-field cursor-pointer pr-10"
        >
          {availableModels.length > 0 ? (
            availableModels.map(model => (
              <option key={model} value={model} className="bg-dark-navy text-white">
                {model}
              </option>
            ))
          ) : (
            <>
              <option value="LSTM" className="bg-dark-navy text-white">LSTM (Deep Learning)</option>
              <option value="Random Forest" className="bg-dark-navy text-white">Random Forest</option>
              <option value="Linear Regression" className="bg-dark-navy text-white">Linear Regression</option>
            </>
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
