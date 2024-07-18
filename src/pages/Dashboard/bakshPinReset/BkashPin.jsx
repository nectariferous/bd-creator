import Marque from "../../../componnets/Marque";
import ComponnetsName from "../../../componnets/ComponnetsName";
import Charge from "../../../componnets/Charge";
import { useForm } from "react-hook-form";
import { singnCopy } from "../../../healper/Healper";
import toast from "react-hot-toast";
import useAprovedPayments from "../../../hooks/useAprovedPayment";
import { useState } from "react";
import useContexts from "../../../hooks/useContexts";
import axios from "axios";
import useAllBkashPin from "../../../hooks/useAllBlashPin";
import { FaCircleArrowDown } from "react-icons/fa6";

const BkashPin = () => {
  const { bkashPin, refetch } = useAllBkashPin();
  const { payments } = useAprovedPayments();
  const [error, setError] = useState("");
  const { user } = useContexts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const currentCharge = 700;
  const onSubmit = async (data) => {
    const identifier = "bkashPin";
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
      <ComponnetsName title={"বিকাশ পিন রিসেট এর জন্য অর্ডার করুন"} />
      <Charge
        title={`বিকাশ পিন রিসেট এর জন্য ${currentCharge} টাকা কাটা হবে।`}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="formNumber"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            বিকাশ পিন রিসেট এর জন্য নাম্বার দেন *
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
            আপনার WhatsApp নাম্বার লিখুন
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
                <th>bkash Number</th>
              </tr>
            </thead>
            <tbody className="">
              {bkashPin?.data?.map((sign, index) => (
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

export default BkashPin;
