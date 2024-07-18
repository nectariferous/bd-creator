import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./styels.css";
import cbimage from "../assets/last bg server copy.jpg";
import axios from "axios";
const Nid = () => {
  const [imge, setImage] = useState();
  console.log(imge);
  const location = useLocation();
  const { data, nidNo, serial } = location.state || {};
  console.log(data.data, nidNo, serial);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    name,
    nameEn,
    nationalId,
    gender,
    bloodGroup,
    dateOfBirth,
    father,
    mother,
    spouse,
    voterArea,
    pin,
    religion,
    photo,
    permanentAddr,
    birthPlace,
    presentAddr,
  } = data.data;
  const { division, district, upazila, union, village, postcode, area } =
    presentAddr;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/qr/?data=${nameEn}+${nationalId}+${dateOfBirth}`,
          {
            responseType: "blob",
          }
        );
        const imageBlob = response.data;
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImage(imageObjectURL);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };
    if (data && data.data) {
      fetchData();
    }
  }, [nameEn, nationalId, dateOfBirth, data]);
  if (!data) {
    return <div>No data found.</div>;
  }
  return (
    <div className="relative ">
      <div
        ref={componentRef}
        className="relative bg-gray-200 mt-10 w-[750px] h-[930px] mx-auto"
      >
        <img
          src={cbimage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Background"
        />
        <div
          style={{ fontFamily: "'SolaimanLipi', Arial, sans-serif" }}
          className="absolute left-[31.5%] top-[6%] text-[14px] text-yellow-400 "
        >
          National Identity Registration Wing (NIDW)
        </div>
        <div className="absolute left-[39%] font-bold top-[8.8%] text-pink-500 text-[14px] ">
          Select Your Search Category
        </div>
        <div className="absolute  left-[45%] top-[10.8%] text-green-500  text-[12px]">
          Search By NID / Voter No.
        </div>
        <div className="absolute  left-[45%] top-[12%] text-blue-400 text-[12px]">
          Search By Form No.
        </div>
        <div className="absolute font-bold left-[29%] top-[14.5%] text-red-500 text-[12px] ">
          NID or Voter No*
        </div>
        <div className="absolute left-[46%] top-[14.7%] text-gray-600 text-[12px]">
          NID
        </div>
        <div className="absolute left-[60.9%] top-[15%] text-white text-[10px] ">
          Submit
        </div>
        <div className="absolute left-[83.2%] top-[9.5%] text-white  text-[10px]">
          Home
        </div>

        <div className="absolute left-[39%] top-[21.9%] font-bold text-[16px]  text-black">
          জাতীয় পরিচিতি তথ্য
        </div>
        <div className="absolute left-[38.7%] top-[25%] text-[11px]  text-black">
          জাতীয় পরিচয় পত্র নম্বর
        </div>
        <div className="absolute left-[55%] top-[25%] text-[11px] text-black">
          {nationalId}
        </div>
        <div className="absolute left-[39%] top-[27.6%] text-[11px]  text-black">
          পিন নম্বর
        </div>
        <div className="absolute left-[55%] top-[27.6%]  text-[11px]  text-black">
          {pin}
        </div>
        <div className="absolute left-[39%] top-[30%] text-[11px]  text-black">
          ভোটার সিরিয়াল
        </div>
        <div className="absolute left-[55%] top-[30%] text-[11px]  text-black">
          {nidNo}
        </div>
        <div className="absolute left-[39%] top-[32.8%] text-[11px]  text-black">
          ভোটার এলাকা
        </div>
        <div className="absolute left-[55%] top-[32.8%] text-[11px]  text-black">
          {voterArea}
        </div>
        <div className="absolute left-[39%] top-[35%] text-[11px]  text-black">
          জন্মস্থান
        </div>
        <div className="absolute left-[55%] top-[35%] text-[11px]  text-black">
          {birthPlace}
        </div>
        <div className="absolute left-[39%] top-[37.5%] font-bold text-[16px]  text-black">
          ব্যক্তিগত তথ্য
        </div>
        <div className="absolute left-[39%] top-[40.6%] text-[11px]  text-black">
          নাম (বাংলা)
        </div>
        <div className="absolute left-[55%] top-[40.6%] text-[11px]   text-black">
          {name}
        </div>
        <div className="absolute left-[39%] top-[43.5%] text-[11px]  text-black">
          নাম (ইংরেজি)
        </div>
        <div className="absolute left-[55%] top-[43.5%] text-[11px]  text-black">
          {nameEn}
        </div>
        <div className="absolute left-[39%] top-[46%] text-[11px]  text-black">
          জন্ম তারিখ
        </div>
        <div className="absolute left-[55%] top-[46%] text-[11px]  text-black">
          {dateOfBirth}
        </div>
        <div className="absolute left-[39%] top-[48.5%] text-[11px]  text-black">
          পিতার নাম
        </div>
        <div className="absolute left-[55%] top-[48.5%] text-[11px]  text-black">
          {father}
        </div>
        <div className="absolute left-[39%] top-[51%] text-[11px]  text-black">
          মাতার নাম
        </div>
        <div className="absolute left-[55%] top-[51%] text-[11px]  text-black">
          {mother}
        </div>
        <div className="absolute left-[39%] top-[54%] text-[11px]  text-black">
          স্বামী/স্ত্রী
        </div>
        <div className="absolute left-[55%] top-[54%] text-[11px]  text-black">
          {spouse ? spouse : ""}
        </div>
        <div className="absolute left-[39%] top-[56.5%] text-[16px] font-bold  text-black">
          অন্যান্য তথ্য
        </div>
        <div className="absolute left-[39%] top-[59.5%] text-[11px]  text-black">
          লিঙ্গ
        </div>
        <div className="absolute left-[55%] top-[59.5%] text-[11px]  text-black">
          {gender}
        </div>
        <div className="absolute left-[39%] top-[62%] text-[11px]  text-black">
          রক্তের গ্রুপ
        </div>
        <div className="absolute left-[55%] top-[62%] text-[11px]  text-black">
          {bloodGroup}
        </div>
        <div className="absolute left-[39%] top-[64.9%] text-[11px]  text-black">
          সিরিয়াল নং
        </div>
        <div className="absolute left-[55%] top-[64.9%] text-[11px]  text-black">
          {serial}
        </div>
        <div className="absolute left-[39%] top-[67.5%] text-[11px]  text-black">
          ধর্ম
        </div>
        <div className="absolute left-[55%] top-[66.5%] text-[11px]  text-black">
          {religion ? religion : ""}
        </div>
        <div className="absolute left-[39%] top-[70%] text-[16px]  font-bold text-black">
          বর্তমান ঠিকানা
        </div>
        <div
          style={{
            lineHeight: "12px",
          }}
          className="bn absolute left-[39%] top-[73.2%] text-[14px]  whitespace-normal  w-[42%] text-black break-words "
        >
          {`বাসা/হোল্ডিং: -, গ্রাম/রাস্তা: ${village}, মৌজা/মহল্লা:${area} , পোস্ট অফিস:
${union}, পোষ্ট কোড: ${postcode}, ইউনিয়ন: ${union}, উপজেলা: ${upazila}, জেলা:
${district}, বিভাগ: ${division}

`}
        </div>
        <div className="absolute left-[39%] font-bold top-[78.5%] text-[16px]  text-black">
          স্থায়ী ঠিকানা
        </div>
        <div
          style={{
            lineHeight: "12px",
          }}
          className="bn absolute left-[39%] top-[82.2%] text-[14px]   whitespace-normal  w-[42%] text-black break-words "
        >
          {`বাসা/হোল্ডিং: -, গ্রাম/রাস্তা: ${permanentAddr.village}, মৌজা/মহল্লা:${permanentAddr.area} , পোস্ট অফিস:
${permanentAddr.union}, পোষ্ট কোড: ${permanentAddr.postcode}, ইউনিয়ন: ${permanentAddr.union}, উপজেলা: ${permanentAddr.upazila}, জেলা:
${permanentAddr.district}, বিভাগ: ${permanentAddr.division}

`}
        </div>

        <div className="absolute bottom-20  text-center text-[11px]   left-[15.8%]">
          <span className="text-red-500">
            {" "}
            উপরে প্রদর্শিত তথ্যসমূহ জাতীয় পরিচয়পত্র সংশ্লিষ্ট, ভোটার তালিকার
            সাথে সরাসরি সম্পর্কযুক্ত নয়।
          </span>{" "}
          <br />
          This is Software Generated Report From Bangladesh Election Commission,
          Signature & Seal Arent Required.
        </div>

        <div className="absolute top-[23.6%] left-[20.9%] w-[14.9%] h-[13%] ">
          <img
            src={photo}
            alt="User"
            className="w-full h-full  rounded-md"
            onError={(e) => {
              e.target.src = "fallback-image.png"; // Fallback image URL
            }}
          />
          <p className=" text-[13px] text-center mt-2">{nameEn}</p>
        </div>
        <div className="absolute top-[41%] left-[21.9%] w-[12.9%] h-[10%] ">
          <img
            src={imge}
            alt="User"
            className="w-full h-full "
            onError={(e) => {
              e.target.src = "fallback-image.png"; // Fallback image URL
            }}
          />
        </div>
        <button
          onClick={handlePrint}
          className="absolute bottom-1 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline no-print"
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Nid;
