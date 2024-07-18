import Charge from "../../../componnets/Charge";
import ComponnetsName from "../../../componnets/ComponnetsName";
import Marque from "../../../componnets/Marque";
import { useForm } from "react-hook-form";
import { singnCopy } from "../../../healper/Healper";
import toast from "react-hot-toast";
import useContexts from "../../../hooks/useContexts";
import { useState } from "react";
import useAprovedPayments from "../../../hooks/useAprovedPayment";
import axios from "axios";
import { FaCircleArrowDown } from "react-icons/fa6";
import useALlBkash from "../../../hooks/useAllBksah";

const Bekash = () => {
  const { bkash, refetch } = useALlBkash();
  const [disable] = useState(false);
  const { payments } = useAprovedPayments();
  const [error, setError] = useState("");
  const { user } = useContexts();
  const currentCharge = 1700;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const identifier = "bkash";
    const { formNumber, selectType, signCopyDetails } = data;
    const sendData = {
      formNumber,
      selectType,
      signCopyDetails,
      userEmail: user?.email,
    };
    if (payments?.data?.amount < currentCharge) {
      setError("আপনার একাউন্টে পর্যাপ্ত টাকা নেই । দয়াকরে রিচার্জ করুন");
      return;
    }
    const datas = await singnCopy(sendData, identifier);

    if (datas.data.success) {
      toast.success("nid added wait for admin response");
      const response = await axios.patch(
        `https://telent-finder.vercel.app/api/v1/update-payments?email=${user?.email}`,
        {
          amount: currentCharge,
        }
      );

      if (response.data.success) {
        refetch();
        reset();
        toast.success("success please wait for admin");
      }
    }
  };
  return (
    <div>
      <Marque />
      <ComponnetsName title={"বিকাশ ইনফো অর্ডার করুন"} />
      <Charge title={`বিকাশ ইনফোর জন্য ${currentCharge} টাকা কাটা হবে।`} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="formNumber"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            বিকাশ নাম্বার দেন *
          </label>
          <input
            id="formNumber"
            type="number"
            {...register("formNumber", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.formNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="signCopyDetails"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            বিকাশ ইনফো সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার থাকে)
          </label>
          <textarea
            id="signCopyDetails"
            {...register("signCopyDetails")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <p className="text-red-500">{error}</p>
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
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-xl text-[#0b3558] ">
                <th>No</th>
                <th>State</th>

                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody className="">
              {bkash?.data?.map((sign, index) => (
                <tr className="text-[#0066FF]" key={sign._id}>
                  <td>{index + 1}</td>
                  <td>
                    {sign.state === "pending" ? (
                      "pending"
                    ) : (
                      <button className={"flex items-center   btn-primary"}>
                        <FaCircleArrowDown />
                      </button>
                    )}
                  </td>

                  <td>{sign.formNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bekash;
