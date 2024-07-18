import { useForm } from "react-hook-form";
import Charge from "../../../componnets/Charge";
import ComponnetsName from "../../../componnets/ComponnetsName";
import Marque from "../../../componnets/Marque";
import { singnCopy } from "../../../healper/Healper";
import toast from "react-hot-toast";
import axios from "axios";
import useContexts from "../../../hooks/useContexts";
import useAprovedPayments from "../../../hooks/useAprovedPayment";
import { useState } from "react";
import useAllSinCopy from "../../../hooks/useALlSinCoppy";
import { saveAs } from "file-saver";
import { FaCircleArrowDown } from "react-icons/fa6";
const SingnCopy = () => {
  const [disable] = useState(false);
  const { payments } = useAprovedPayments();
  const [error, setError] = useState("");

  const { user } = useContexts();
  const { sinCopy, refetch } = useAllSinCopy();
  console.log(sinCopy);
  const handleDownload = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Important to get the response as a Blob
      });
      const fileBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(fileBlob, "suhanur-rohoman-sumon-resume.pdf");
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const currentCharge = 100;
  const onSubmit = async (data) => {
    const identifier = "sign";
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
  const downloadPdf = async (pdfName, id) => {
    try {
      const response = await axios.get(
        `https://telent-finder.vercel.app/api/v1/pdfs/${pdfName}?id=${id}`,
        {
          responseType: "blob",
        }
      );

      saveAs(response.data, pdfName);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  return (
    <div>
      <Marque />
      <ComponnetsName title={"সাইন কপি অর্ডার করুন।"} />
      <Charge title={`সাইন কপির জন্য ${currentCharge} টাকা কাটা হবে।`} />
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
            <option value="nidNo">NID No</option>
            <option value="formNo">Form No</option>

            <option value="birthCertificate">Birth Certificate No</option>
            <option value="votar number">Votar Number No</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="formNumber"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            আইডি/ভোটার/ফর্ম নাম্বারঃ *
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
            NAME/DOB
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
            disabled={disable}
          >
            Submit
          </button>
        </div>
        <p className="text-red-500">{`${
          disable ? "New Order Currently Off By Admin" : ""
        }`}</p>
      </form>
      <div>
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-xl text-[#0b3558] ">
                <th>No</th>
                <th>State</th>
                <th>Issue For</th>
                <th>Issue Number</th>
              </tr>
            </thead>
            <tbody className="">
              {sinCopy?.data?.map((sign, index) => (
                <tr className="text-[#0066FF]" key={payments._id}>
                  <td>{index + 1}</td>
                  <td>
                    {sign.state === "pending" ? (
                      "pending"
                    ) : (
                      <button
                        onClick={() => downloadPdf(sign.fileName, sign._id)}
                        className={"flex items-center   btn-primary"}
                      >
                        <FaCircleArrowDown />
                      </button>
                    )}
                  </td>
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

export default SingnCopy;
