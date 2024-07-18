import { useForm } from "react-hook-form";

const UpdateBalance = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="components"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            components
          </label>
          <input
            id="components"
            type="components"
            {...register("components", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.components && (
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

export default UpdateBalance;
