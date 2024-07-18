import { useState } from "react";
import { useForm } from "react-hook-form";
import Marque from "../../../componnets/Marque";
import Charge from "../../../componnets/Charge";
import toast, { Toaster } from "react-hot-toast";
import pdf from "../../../assets/pdf.png";
import { useNavigate } from "react-router-dom";
import useAprovedPayments from "../../../hooks/useAprovedPayment";
import axios from "axios";
import useContexts from "../../../hooks/useContexts";
const CreateNid = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [signature, setSignature] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState(null);
  const [customSignature, setCustomSignature] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContexts();

  const { refetch, payments } = useAprovedPayments();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  // Function to format the date as dd/mm/yyyy
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

  // Function to handle NID image file change
  const handleNidFileChange = (event) => {
    const file = event.target.files[0];
    // Process the NID file
    setCustomImageUrl(URL.createObjectURL(file));
    console.log("NID file selected:", file);
  };

  // Function to handle Signature file change
  const handleSignatureFileChange = (event) => {
    const file = event.target.files[0];
    // Process the Signature file
    setCustomSignature(URL.createObjectURL(file));
    console.log("Signature file selected:", file);
  };
  const imageUrls = imageUrl ? imageUrl : customImageUrl;
  const signatures = signature ? signature : customSignature;
  const currentCharge = 10;
  const onSubmit = async (data) => {
    if (payments?.data?.amount < currentCharge) {
      setError("আপনার একাউন্টে পর্যাপ্ত টাকা নেই । দয়াকরে রিচার্জ করুন");
      return;
    }
    console.log(data);

    const response = await axios.patch(
      `https://telent-finder.vercel.app/api/v1/update-payments?email=${user?.email}`,
      {
        amount: currentCharge,
      }
    );

    refetch();
    console.log(response);
    navigate("/create-nid-download", {
      state: {
        data: data,
        imageUrl: imageUrls,
        signature: signatures,
      },
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      const response = await fetch("/crete-nid-api/ext/onlineserviceguru", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.message === "balance") {
        toast.error("No Balance");
      } else if (responseData.message === "wrong") {
        toast.error("Wrong file");
      } else if (responseData.message === "ext") {
        console.log("Extracted Data:", responseData);
        setValue("nameBangla", responseData.nameBen);
        setValue("nameEnglish", responseData.nameEng);
        setValue("idNumber", responseData.national_id);
        setValue("pinNumber", responseData.pin);
        setValue("fatherName", responseData.father);
        setValue("motherName", responseData.mother);
        setValue("birthPlace", responseData.birth_place);
        setValue("birthDate", responseData.birth);
        setValue("bloodGroup", responseData.blood);
        setValue("address", responseData.address);
        setImageUrl(responseData.photo);
        setSignature(responseData.sign);
      }
    } catch (error) {
      console.error("There was a problem with the file upload:", error.message);
      toast.error("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border">
      <Marque />

      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className=" flex items-center justify-center md:mx-96">
          <input
            id="file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file"
            className=" flex items-center justify-center cursor-pointer w-full p-8  border border-dashed  border-gray-400  hover:bg-gray-100"
          >
            <div>
              <img
                src={pdf}
                className=" h-24 flex items-center justify-center w-7/12 mx-auto"
                alt=""
              />
              <span
                style={{ fontFamily: "'SolaimanLipi', Arial, sans-serif" }}
                className=" text-[16px] font-bold text-[#0066FF]"
              >
                সাইন কপি আপলোড করুন
              </span>
            </div>
          </label>
        </div>

        <div className="divider">OR</div>
        <div className="md:flex items-center justify-center gap-8 ">
          <div className="flex items-center ">
            <input
              id="nidFile"
              type="file"
              accept="image/*"
              onChange={handleNidFileChange}
              className="hidden"
            />
            <label htmlFor="nidFile" className="">
              <span
                style={{ fontFamily: "'SolaimanLipi', Arial, sans-serif" }}
                className=" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                NID Image
              </span>
            </label>
            <img
              src={imageUrl ? imageUrl : customImageUrl}
              className="w-14 h-14 ml-4 "
              alt=""
            />
          </div>
          <div className=" flex items-center ">
            <input
              id="signatureFile"
              type="file"
              accept="image/*"
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
              src={signature ? signature : customSignature}
              className="w-16 h-16 ml-4 mt-4 md:mt-0"
              alt=""
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="nameBangla"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            নামঃ (বাংলা)
          </label>
          <input
            id="nameBangla"
            type="text"
            {...register("nameBangla")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nameEnglish"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            নামঃ (ইংরেজী)
          </label>
          <input
            id="nameEnglish"
            type="text"
            {...register("nameEnglish")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="idNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            আইডি নাম্বারঃ
          </label>
          <input
            id="idNumber"
            type="text"
            {...register("idNumber")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pinNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            পিন নাম্বারঃ
          </label>
          <input
            id="pinNumber"
            type="text"
            {...register("pinNumber")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fatherName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            পিতার নামঃ
          </label>
          <input
            id="fatherName"
            type="text"
            {...register("fatherName")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="spouseName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            স্বামী অথবা স্ত্রীর নামঃ
          </label>
          <input
            id="spouseName"
            type="text"
            {...register("spouseName")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="motherName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            মাতার নামঃ
          </label>
          <input
            id="motherName"
            type="text"
            {...register("motherName")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthPlace"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            জন্ম স্থানঃ
          </label>
          <input
            id="birthPlace"
            type="text"
            {...register("birthPlace")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            জন্ম তারিখঃ
          </label>
          <input
            id="birthDate"
            type="text"
            {...register("birthDate")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="principalDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            প্রধানের তারিখঃ
          </label>
          <input
            id="principalDate"
            type="text"
            value={formattedBanglaDate}
            {...register("principalDate")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bloodGroup"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            রক্তের গ্রপঃ
          </label>
          <input
            id="bloodGroup"
            type="text"
            {...register("bloodGroup")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ঠিকানাঃ
          </label>
          <textarea
            id="address"
            {...register("address")}
            className="shadow appearance-none border rounded w-full py-8 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ঠিকানা: বাসা/হোল্ডিং: (Holding), গ্রাম/রাস্তা: (গ্রাম, মৌজা), ডাকঘর: (Post Office - Postal Code), উপজেলা, সিটি কর্পোরেশন/পৌরসভা, জেলা"
          />
        </div>
        {/* Other form fields */}
        <Charge title={"আপনার একাউন্ট থেকে 5 টাকা কাটা হবে।"} />
        <p className="text-red-500">{error}</p>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNid;
