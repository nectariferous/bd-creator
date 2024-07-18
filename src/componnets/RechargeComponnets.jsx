import { useForm } from "react-hook-form";
import useContexts from "../hooks/useContexts";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import usePayment from "../hooks/usePayments";
const RechargeComponnets = () => {
  const { user } = useContexts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { payments } = usePayment();
  console.log(payments);
  const onSubmit = async (data) => {
    const userName = user.displayName;
    const userEmail = user.email;

    console.log();
    const { phoneNumber, transactionId, amount } = data;
    const id = uuidv4();
    const requests = await axios.post(
      "https://telent-finder.vercel.app/api/v1/createPayment",
      { userName, userEmail, phoneNumber, transactionId, amount, id }
    );

    if (requests.data.success) {
      reset();
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4"></div>
        <div className="mb-4">
          <label
            htmlFor="mobileNumber"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            নাম্বারঃ *
          </label>
          <input
            id="mobileNumber"
            type="number"
            {...register("mobileNumber", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.mobileNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            amount
          </label>
          <input
            id="amount"
            type="number"
            {...register("amount", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.amount && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="transactionId"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            Transition id
          </label>
          <textarea
            id="transactionId"
            {...register("transactionId")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RechargeComponnets;
