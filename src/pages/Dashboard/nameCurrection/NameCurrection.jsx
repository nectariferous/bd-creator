import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Marque from "../../../componnets/Marque";
import ComponnetsName from "../../../componnets/ComponnetsName";
import Charge from "../../../componnets/Charge";

const NameCurrection = () => {
  const [disable, setDisable] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <div>
      <Marque />
      <ComponnetsName title={"নিবন্ধন নাম সংশোধন"} />
      <Charge title={"নাম সংশোধনের জন্য 900 টাকা কাটা হবে।"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="nidNumber"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            জন্ম নিবন্ধন নাম্বার *
          </label>
          <input
            id="nidNumber"
            type="text"
            {...register("nidNumber", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.nidNumber && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            জন্ম তারিখঃ mm/dd/yyyy *
          </label>
          <input
            id="dob"
            type="text"
            {...register("dob", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dob && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="banglaName"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            চাহিত বাংলা নাম *
          </label>
          <input
            id="banglaName"
            type="text"
            {...register("banglaName", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.banglaName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="englishName"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            চাহিত ইংরেজী নাম *
          </label>
          <input
            id="englishName"
            type="text"
            {...register("englishName", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.englishName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="modificationDetails"
            className="block text-gray-700 text-sm font-bold mb-2 text-center"
          >
            জন্ম নিবন্ধন নাম সংশোধন সম্পর্কে বিস্তারিত লিখুনঃ(যদি কিছু বলার
            থাকে)
          </label>
          <textarea
            id="modificationDetails"
            {...register("modificationDetails")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
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
    </div>
  );
};

export default NameCurrection;
