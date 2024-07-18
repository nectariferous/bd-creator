import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddPaymentManualy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const { email, amount } = data;
    const amounts = Number(amount);
    const fetchData = async () => {
      const response = await axios.post(
        `https://telent-finder.vercel.app/api/v1/set-payments?email=${email}`,
        {
          userEmail: email,
          amount: amounts,
        }
      );
    };

    toast
      .promise(fetchData(), {
        loading: "Processing...",
        success: "Success! Please wait for admin.",
        error: "Error fetching data.",
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      });
    console.log();

    reset();
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
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

export default AddPaymentManualy;
