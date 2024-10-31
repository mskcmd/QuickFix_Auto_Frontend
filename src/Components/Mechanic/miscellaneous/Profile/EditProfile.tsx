import { useEffect, useState } from "react";
import { fetchMechData } from "../../../../Api/mechanic";
import { useAppSelector } from "../../../../app/store";
import Header from "../../Heder";

function EditProfile() {
  const mechanicData: any = useAppSelector((state) => state.auth.mechanicData);
  const id: string = mechanicData.mechnicId;

  const [data, setData] = useState([]);
  console.log("data", data);

  const fetchAllMechData = async () => {
    try {
      const result = await fetchMechData(id);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMechData();
  }, []);

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-6xl">
        

          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Type Selection */}
            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Are you
              </label>
              <select className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="">Select...</option>
                <option value="shop">Shop</option>
                <option value="freelancer">Freelancer</option>
                <option value="company">Company</option>
              </select>
            </div>

            {/* License Number */}
            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                License Number
              </label>
              <input
                type="text"
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Experience */}
            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Name{" "}
              </label>
              <input
                type="number"
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Email{" "}
              </label>
              <input
                type="email"
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number{" "}
              </label>
              <input
                type="number"
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Specialization */}
            <div className="col-span-1 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Location */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  readOnly
                />
                <button
                  type="button"
                  className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Choose
                </button>
              </div>
            </div>

            {/* Services */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Services
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                  Example Service
                  <button
                    type="button"
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter a service and press Enter"
                />
                <button
                  type="button"
                  className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Working Hours */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Hours
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Select working days:
                  </p>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day) => (
                      <label
                        key={day}
                        className="inline-flex items-center mr-4 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">{day}</span>
                      </label>
                    )
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Start Time
                      </label>
                      <input
                        type="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        End Time
                      </label>
                      <input
                        type="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2 md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-2 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Images
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-3 pb-2">
                      <svg
                        className="w-6 h-6 mb-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-xs text-gray-500">Add Images</p>
                    </div>
                    <input type="file" className="hidden" multiple />
                  </label>
                </div>
              </div>

              {/* Certificate Upload */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Certificate
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-3 pb-2">
                      <svg
                        className="w-6 h-6 mb-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-xs text-gray-500">
                        Upload Certificate
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 md:col-span-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
