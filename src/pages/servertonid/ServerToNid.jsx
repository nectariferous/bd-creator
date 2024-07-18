import { useState } from "react";
import useAprovedPayments from "../../hooks/useAprovedPayment";
import useContexts from "../../hooks/useContexts";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Marque from "../../componnets/Marque";
import ComponnetsName from "../../componnets/ComponnetsName";
import Charge from "../../componnets/Charge";

const ServerToNid = () => {
  const { refetch, payments } = useAprovedPayments();
  const [customSignature, setCustomSignature] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContexts();
  const navigate = useNavigate();
  const handleSignatureFileChange = (event) => {
    const file = event.target.files[0];
    // Process the Signature file
    setCustomSignature(URL.createObjectURL(file));
    console.log("Signature file selected:", file);
  };

  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  // Function to convert English digits to Bangla digits
  const convertToBanglaDigits = (englishDate) => {
    const finalEnlishToBanglaNumber = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
    };

    return englishDate.replace(
      /\d/g,
      (digit) => finalEnlishToBanglaNumber[digit]
    );
  };

  const formattedDate = getFormattedDate();
  const formattedBanglaDate = convertToBanglaDigits(formattedDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const currentCharge = 10;
  const onSubmit = async (data) => {
    if (payments?.data?.amount < currentCharge) {
      setError("আপনার একাউন্টে পর্যাপ্ত টাকা নেই । দয়াকরে রিচার্জ করুন");
      return;
    }
    const { nidNo, dob } = data;

    const fetchData = async () => {
      const response = await axios.get(
        `/api/unofficial/apiown.php?key=signCopy&nid=${nidNo}&dob=${dob}`
      );
      console.log(response.data.data);
      if (response.data.data.response === "success") {
        navigate("/create-nid-download", {
          state: {
            data: response.data.data.data,
            imageUrl: response.data.data.data?.photo,
            signature: customSignature,
            principalDates: formattedBanglaDate,
            addresses: response.data.data.data?.presentAddr,
          },
        });
        await axios.patch(
          `https://telent-finder.vercel.app/api/v1/update-payments?email=${user?.email}`,
          {
            amount: currentCharge,
          }
        );
        refetch();
        reset();
      } else {
        throw new Error("Data fetch failed");
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
  const validateDate = (value) => {
    // Regex pattern for yyyy-mm-dd format
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return pattern.test(value) || "Invalid date format, use YYYY-MM-DD";
  };
  return (
    <div>
      <Marque />
      <ComponnetsName title={" Server Copy to nid"} />

      <form
        className=" w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex items-center justify-center">
          <input
            id="signatureFile"
            type="file"
            accept="image/*"
            {...register("signature", { required: true })}
            onChange={handleSignatureFileChange}
            className="hidden"
          />
          <label htmlFor="signatureFile" className="">
            <span
              style={{ fontFamily: "'SolaimanLipi', Arial, sans-serif" }}
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Signature
            </span>
          </label>
          <img
            src={customSignature}
            className="w-16 h-16 ml-4 mt-4 md:mt-0"
            alt=""
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
            htmlFor="nidNo"
          >
            NID NUMBER (10/17 DIGIT)
          </label>
          <input
            id="nidNo"
            type="text"
            {...register("nidNo", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.nidNo && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
            htmlFor="dob"
          >
            DATE OF BIRTH (YYYY-MM-DD)
          </label>
          <input
            id="dob"
            type="text"
            {...register("dob", {
              required: true,
              validate: validateDate,
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Example: 1990-11-30"
          />
          {errors.dob && (
            <span className="text-red-500">{errors.dob.message}</span>
          )}
        </div>
        <Charge title={`আপনার একাউন্ট থেকে ${currentCharge} টাকা কাটা হবে।`} />
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
    </div>
  );
};

export default ServerToNid;
