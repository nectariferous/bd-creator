/* eslint-disable react/no-unescaped-entities */
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./styels.css";
import logo from "../assets/map-logo.jpg";
import flower from "../assets/flower-logo.png";
import durdon from "../assets/duddron.png";
import sign from "../assets/sign2.png";
import { useReactToPrint } from "react-to-print";
const CreateNidComponnets = () => {
  const componentRef = useRef();
  const location = useLocation();
  const { data, imageUrl, signature, principalDates, addresses } =
    location.state || {};
  const title = data?.idNumber;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: title,
  });
  useEffect(() => {
    handlePrint();
  }, [handlePrint]);
  const {
    nameEnglish,
    nameBangla,
    motherName,
    fatherName,
    birthDate,
    idNumber,
    address,
    bloodGroup,
    pinNumber,
    principalDate,
    birthPlace,
    name,
    nameEn,
    father,
    mother,
    nationalId,
    dateOfBirth,
  } = data;

  const principalDat = principalDate ? principalDate : principalDates;
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  // Example usage
  const dateOfBirths = dateOfBirth;
  const formattedDateOfBirth = formatDate(dateOfBirths);
  return (
    <div
      ref={componentRef}
      className="container w-full py-12 lg:flex lg:items-start"
      style={{ paddingTop: 0 }}
    >
      <div className="w-full lg:pl-6">
        <div className="flex items-center justify-center">
          <div className="w-full">
            <div
              className="flex items-start gap-x-2 bg-transparent mx-auto w-fit"
              id="nid_wrapper"
              style={{ transform: "scale(1)", marginTop: "10px" }}
            >
              <div
                id="nid_front"
                className="w-full border-[1.999px] border-black"
              >
                <header className="px-1.5 flex items-start gap-x-2 justify-between relative">
                  <img
                    className="w-[38px] absolute top-1.5 left-[4.5px]"
                    src={logo}
                    alt="Map Logo"
                  />
                  <div className="w-full h-[60px] flex flex-col justify-center">
                    <h3
                      style={{ fontSize: "20px" }}
                      className="text-center font-medium tracking-normal pl-11 bn leading-5"
                    >
                      <span
                        style={{ marginTop: "1px", display: "inline-block" }}
                      >
                        গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                      </span>
                    </h3>
                    <p
                      className="text-[#007700] text-right tracking-[-0rem] leading-3"
                      style={{
                        fontSize: "11.46px",
                        fontFamily: "arial",
                        marginBottom: "-0.02px",
                      }}
                    >
                      Government of the People's Republic of Bangladesh
                    </p>
                    <p
                      className="text-center font-medium pl-10 leading-4"
                      style={{ paddingTop: "0px" }}
                    >
                      <span
                        className="text-[#ff0002]"
                        style={{ fontSize: "10px", fontFamily: "arial" }}
                      >
                        National ID Card
                      </span>
                      <span
                        style={{
                          marginLeft: "2px",
                          fontSize: "13px",
                          fontFamily: "arial",
                        }}
                      >
                        /
                      </span>
                      <span
                        className="bn ml-1"
                        style={{ marginLeft: "2px", fontSize: "13.33px" }}
                      >
                        জাতীয় পরিচয় পত্র
                      </span>
                    </p>
                  </div>
                </header>
                <div
                  className="w-[101%] -ml-[0.5%] border-b-[1.9999px] border-black"
                  style={{ width: "100%", marginLeft: "0" }}
                ></div>
                <div className="pt-[3.8px] pr-1 pl-[2px] bg-center w-full flex justify-between gap-x-2 pb-5 relative">
                  <div className="absolute inset-x-0 top-[2px] mx-auto z-10 flex items-start justify-center">
                    <img
                      style={{
                        background: "transparent",
                        width: "116px",
                        height: "116px",
                        marginLeft: "15px",
                      }}
                      className="ml-[20px] w-[125px] h-[116px"
                      src={flower}
                      alt="Flower Logo"
                    />
                  </div>
                  <div className="relative z-50">
                    <img
                      style={{ marginTop: "-2px" }}
                      id="userPhoto"
                      className="w-[68.2px] h-[78px]"
                      alt="User Photo"
                      src={imageUrl}
                    />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "68px",
                      }}
                      className="signeture"
                    >
                      <img
                        style={{
                          marginTop: "3px",
                          width: "100%",
                          maxHeight: "42px",
                        }}
                        src={signature}
                        alt="Signature"
                      />
                    </span>
                  </div>
                  <div className="w-full relative z-50">
                    <div style={{ height: "5px" }}></div>
                    <div
                      className="flex flex-col gap-y-[10px]"
                      style={{ marginTop: "1px" }}
                    >
                      <div>
                        <p
                          className="space-x-4 leading-3"
                          style={{ paddingLeft: "1px" }}
                        >
                          <span className="bn" style={{ fontSize: "16.53px" }}>
                            নাম:
                          </span>
                          <span
                            className=""
                            style={{
                              fontSize: "16.6px",
                              paddingLeft: "3px",
                              WebkitTextStroke: "0.4px black",
                            }}
                            id="nameBn"
                          >
                            {nameBangla}
                          </span>
                        </p>
                      </div>
                      <div style={{ marginTop: "1px" }}>
                        <p
                          className="space-x-2 leading-3"
                          style={{
                            marginBottom: "-5.5px",
                            marginTop: "1.4px",
                            paddingLeft: "1px",
                          }}
                        >
                          <span style={{ fontSize: "10px" }}>Name: </span>
                          <span
                            style={{ fontSize: "12.73px", paddingLeft: "1px" }}
                            id="nameEn"
                          >
                            {nameEnglish}
                          </span>
                        </p>
                      </div>
                      <div style={{ marginTop: "1px" }}>
                        <p
                          className="bn space-x-3 leading-3"
                          style={{ paddingLeft: "1px" }}
                        >
                          <span
                            id="fatherOrHusband"
                            style={{ fontSize: "14px" }}
                          >
                            পিতা:{" "}
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              transform: "scaleX(0.724)",
                            }}
                            id="card_father_name"
                          >
                            {fatherName}
                          </span>
                        </p>
                      </div>
                      <div style={{ marginTop: "1px" }}>
                        <p
                          className="bn space-x-3 leading-3"
                          style={{ marginTop: "-2.5px", paddingLeft: "1px" }}
                        >
                          <span style={{ fontSize: "14px" }}>মাতা: </span>
                          <span
                            style={{
                              fontSize: "14px",
                              transform: "scaleX(0.724)",
                            }}
                            id="card_mother_name"
                          >
                            {motherName}
                          </span>
                        </p>
                      </div>
                      <div
                        className="leading-4"
                        style={{ fontSize: "12px", marginTop: "-1.2px" }}
                      >
                        <p style={{ marginTop: "-2px" }}>
                          <span>Date of Birth: </span>
                          <span
                            id="card_date_of_birth"
                            className="text-[#ff0000]"
                            style={{ marginLeft: "-1px" }}
                          >
                            {birthDate}
                          </span>
                        </p>
                      </div>
                      <div
                        className="-mt-0.5 leading-4"
                        style={{ fontSize: "12px", marginTop: "-5px" }}
                      >
                        <p style={{ marginTop: "-2px" }}>
                          <span>ID NO: </span>
                          <span
                            className="text-[#ff0000] font-bold"
                            id="card_nid_no"
                          >
                            {idNumber}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="nid_back"
                className="w-full border-[1.999px] border-[#000]"
              >
                <header className=" h-[32px] flex items-center px-2 tracking-wide text-left">
                  <p
                    className="bn"
                    style={{
                      lineHeight: "13px",
                      fontSize: "11.33px",
                      letterSpacing: "0.05px",
                      marginBottom: "0px",
                    }}
                  >
                    এই কার্ডটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের সম্পত্তি। কার্ডটি
                    ব্যবহারকারী ব্যতীত অন্য কোথাও পাওয়া গেলে নিকটস্থ পোস্ট অফিসে
                    জমা দেবার জন্য অনুরোধ করা হলো।
                  </p>
                </header>
                <div
                  className="w-[101%] -ml-[0.5%] border-b-[1.999px] border-black"
                  style={{ width: "100%", marginLeft: "0" }}
                ></div>
                <div
                  className="px-1 pt-[3px] h-[66px] grid grid-cols-12 relative"
                  style={{ fontSize: "12px" }}
                >
                  <div
                    className="col-span-1 bn px-1 leading-[11px]"
                    style={{
                      fontSize: "11.73px",
                      letterSpacing: "-0.12px",
                    }}
                  >
                    ঠিকানা:
                  </div>
                  <div
                    className="bn col-span-11 px-2 text-left bn leading-[11px]"
                    id="card_address"
                    style={{
                      fontSize: "11.73px",
                      letterSpacing: "-0.12px",
                    }}
                  >
                    {address
                      ? address
                      : `বাসা/হোল্ডিং: -, গ্রাম/রাস্তা: ${addresses?.area}, ডাকঘর: ${addresses?.union} - ${addresses?.postcode},${addresses?.upazila},${addresses?.district}`}
                  </div>
                  <div className="col-span-12 mt-auto flex justify-between">
                    <p
                      className="bn flex items-center font-medium"
                      style={{
                        marginBottom: "-5px",
                        paddingLeft: "0px",
                      }}
                    >
                      <span style={{ fontSize: "11.6px" }}>রক্তের গ্রুপ</span>
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: "3px",
                          marginRight: "3px",
                        }}
                      >
                        <span>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "11.33px",
                              fontFamily: "arial",
                              marginTop: "2px",
                              marginBottom: "3px",
                            }}
                          >
                            /
                          </span>
                        </span>
                      </span>
                      <span style={{ fontSize: "9px" }}>Blood Group:</span>
                      <b
                        style={{
                          fontSize: "11.6px",
                          marginBottom: "-3px",
                          display: "inline-block",
                        }}
                        className="text-[#ff0000] mx-1 font-bold sans w-5"
                        id="card_blood"
                      >
                        {bloodGroup}
                      </b>
                      <span style={{ fontSize: "10.66px" }}>জন্মস্থান: </span>
                      <span
                        className="ml-1"
                        id="card_birth_place"
                        style={{ fontSize: "10.66px" }}
                      >
                        {birthPlace}
                      </span>
                    </p>
                    <div
                      className="text-gray-100 absolute -bottom-[2px] w-[30.5px] h-[13px] -right-[2px] overflow-hidden"
                      style={{
                        marginRight: "1px",
                        marginBottom: "1px",
                      }}
                    >
                      <img src={durdon} alt="" />
                      <span
                        className="hidden absolute inset-0 m-auto bn items-center text-[#fff] z-50"
                        style={{ fontSize: "10.66px" }}
                      >
                        <span className="pl-[0.2px]">মূদ্রণ:</span>
                        <span className="block ml-[3px]">০১</span>
                      </span>
                      <div className="hidden w-full h-full absolute inset-0 m-auto border-[20px] border-black z-30"></div>
                    </div>
                  </div>
                </div>
                <div
                  className="w-[101%] -ml-[0.5%] border-b-[1.999px] border-black"
                  style={{ width: "100%", marginLeft: "0" }}
                ></div>
                <div className="py-1 pl-2 pr-1">
                  <img
                    className="w-[78px] ml-[18px] -mb-[3px]"
                    style={{ marginBottom: "3px" }}
                    src={sign}
                  />
                  <div className="flex justify-between items-center -mt-[5px]">
                    <p className="bn" style={{ fontSize: "14px" }}>
                      প্রদানকারী কর্তৃপক্ষের স্বাক্ষর
                    </p>
                    <span
                      className="pr-4 bn"
                      style={{ fontSize: "12px", paddingTop: "1px" }}
                    >
                      প্রদানের তারিখ:
                      <span className="ml-2.5" id="card_date">
                        {principalDat}
                      </span>
                    </span>
                  </div>
                  <div
                    id="barcode"
                    className="w-full h-[39px] mt-1"
                    alt="NID Card Generator"
                    style={{ marginTop: "1.5px", marginLeft: "-3px" }}
                  >
                    <style>
                      {`
            canvas {
              width: 102%;
              height: 100%;
            }
          `}
                    </style>
                    <img
                      id="card_qr_code"
                      className="w-full h-[39px] mt-1"
                      alt="NID Card Generator"
                      src={`https://barcode.tec-it.com/barcode.ashx?data=%3Cpin%3E${pinNumber}%3C%2Fpin%3E%3Cname%3c${nameEnglish}%3C%2Fname%3E%3CDOB%3E${birthDate}%3C%2FDOB%3E%3CFP%3E%3C%2FFP%3E%3CF%3ERight+Index%3C%2FF%3E%3CTYPE%3EA%3C%2FTYPE%3E%3CV%3E2.0%3C%2FV%3E%3Cds%3E302c02140de59e4371ec653b01eec9cf97f5ed55a284c5bd021456ea4da285b340c532586808b61fd1046cc005e7%3C%2Fds%3E&code=PDF417`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNidComponnets;
