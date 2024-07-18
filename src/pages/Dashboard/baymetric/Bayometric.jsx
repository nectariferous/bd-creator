import { useForm } from "react-hook-form";
import Marque from "../../../componnets/Marque";
import ComponnetsName from "../../../componnets/ComponnetsName";
import Charge from "../../../componnets/Charge";
import useContexts from "../../../hooks/useContexts";
import { useState } from "react";
import useAprovedPayments from "../../../hooks/useAprovedPayment";
import { singnCopy } from "../../../healper/Healper";
import toast from "react-hot-toast";
import axios from "axios";
import useAllBioMatrics from "../../../hooks/useAllBIoMatrics";
import { FaCircleArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Bayometric = () => {
  const [disable, setDisable] = useState(false);
  const [nidData, setNidData] = useState({});
  console.log(nidData);
  const { payments } = useAprovedPayments();
  const { biometric, refetch } = useAllBioMatrics();
  const [error, setError] = useState("");
  const { user } = useContexts();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const currentCharge = 99;

  const onSubmit = async (data) => {
    const identifier = "biometric";
    const { formNumber, selectType, signCopyDetails } = data;
    if (payments?.data?.amount < currentCharge) {
      setError("আপনার একাউন্টে পর্যাপ্ত টাকা নেই । দয়াকরে রিচার্জ করুন");
      return;
    }
    const fetchData = async () => {
      const sendData = {
        formNumber,
        selectType,
        signCopyDetails,
        userEmail: user?.email,
      };
      const datas = await singnCopy(sendData, identifier);

      try {
        if (datas.data.success) {
          const response = await axios.get(
            `/biometric-api/number/number.php?key=vipclient&number=${formNumber}`
          );
          const { number, nid, dob, success } = response.data;
          console.log(response);
          if (success) {
            toast.success("nid added wait for admin response");
            const updateResponse = await axios.patch(
              `https://telent-finder.vercel.app/api/v1/update-payments?email=${user?.email}`,
              { amount: currentCharge }
            );

            if (updateResponse.data.success) {
              refetch();
              reset();
              toast.success("success please wait for admin");
              setNidData({ number, nid, dob });
              singnCopy(identifier, formNumber, selectType, signCopyDetails);
              navigate("/dashboard/biometrics-details", {
                state: { data: response.data },
              });
            }
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while processing your request.");
      }
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
  };

  return (
    <div>
      <Marque />
      <ComponnetsName title={"বায়োমেট্রিক অর্ডার করুন।"} />
      <Charge title={`বায়োমেট্রিক এর জন্য ${currentCharge} টাকা কাটা হবে ।`} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="selectType"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            Select Type:
          </label>
          <select
            id="selectType"
            {...register("selectType")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Banglalink-biometric">Banglalink biometric</option>
            <option value="Grameen-biometric">Grameen biometric</option>
            <option value="Robi-biometric">Robi biometric</option>
            <option value="airtel-biometric">airtel biometric</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="formNumber"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            বায়োমেট্রিক নাম্বার লিখুন *
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

                <th>Issue For</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody className="">
              {biometric?.data?.map((sign, index) => (
                <tr className="text-[#0066FF]" key={payments._id}>
                  <td>{index + 1}</td>

                  <td>{sign.selectType}</td>
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

export default Bayometric;
