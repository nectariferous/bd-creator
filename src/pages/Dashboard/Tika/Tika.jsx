import { useState } from "react";
import Charge from "../../../componnets/Charge";
import { useForm } from "react-hook-form";

const Tika = () => {
  const currentCharge = 200;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    reset();
  };

  const [placeholder, setPlaceholder] = useState(`
  পাসপোর্ট নাম্বার:
  (OTP) ফোন নাম্বার:
  পাসপোর্ট এর ছবি WhatsApp এ দিন
    `);

  const [userText, setUserText] = useState("");

  const handleTextareaClick = () => {
    if (userText === "") {
      setUserText(placeholder);
      setPlaceholder("");
    }
  };

  const handleTextareaChange = (e) => {
    setUserText(e.target.value);
  };
  return (
    <div>
      <Charge title={`আইডি কার্ড এর জন্য ${currentCharge} টাকা কাটা হবে ।`} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="signCopyDetails"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            আইডি কার্ড সম্পর্কে বিস্তারিত লিখুন।(যদি কিছু বলার থাকে) *
          </label>
          <textarea
            id="signCopyDetails"
            {...register("signCopyDetails")}
            value={userText}
            onClick={handleTextareaClick}
            onChange={handleTextareaChange}
            className="shadow appearance-none border h-52 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={placeholder}
          />
        </div>
        {errors.signCopyDetails && (
          <span className="text-red-500">This field is required</span>
        )}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl text-[#0b3558]">
                <th>No</th>
                <th>State</th>
                <th>Issue For</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>{/* Data rows should be here */}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tika;
