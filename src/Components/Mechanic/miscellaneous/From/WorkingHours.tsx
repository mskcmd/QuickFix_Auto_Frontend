import React, { useState } from 'react';

interface WorkingHours {
  days: string[];
  startTime: string;
  endTime: string;
}

interface WorkingHoursComponentProps {
  workingHours: WorkingHours[];
  onWorkingHoursChange: (workingHours: WorkingHours[]) => void;
  error?: string;
}

const WorkingHoursComponent: React.FC<WorkingHoursComponentProps> = ({
  workingHours,
  onWorkingHoursChange,
  error
}) => {
  const [workDays, setWorkDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleWorkDayChange = (day: string) => {
    setWorkDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "startTime") setStartTime(value);
    if (name === "endTime") setEndTime(value);
  };

  const addWorkingHours = () => {
    if (workDays.length && startTime && endTime) {
      const newWorkingHours: WorkingHours = {
        days: workDays,
        startTime,
        endTime,
      };
      onWorkingHoursChange([...workingHours, newWorkingHours]);
      setWorkDays([]);
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Working Hours
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Select working days:</p>
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <label key={day} className="inline-flex items-center mr-4 mb-2">
              <input
                type="checkbox"
                checked={workDays.includes(day)}
                onChange={() => handleWorkDayChange(day)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">{day}</span>
            </label>
          ))}
        </div>
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div>
              <label htmlFor="startTime" className="block text-sm text-gray-600">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={handleTimeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm text-gray-600">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={handleTimeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addWorkingHours}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Working Hours
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Current Working Hours:
        </h4>
        {workingHours.map((schedule, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-2 mb-2">
            {schedule.days.join(", ")} from {schedule.startTime} to{" "}
            {schedule.endTime}
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default WorkingHoursComponent;