const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
        <input 
          type="date" 
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          className="input-field [color-scheme:dark]"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
        <input 
          type="date" 
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          className="input-field [color-scheme:dark]"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
