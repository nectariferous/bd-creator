/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCircleArrowDown } from "react-icons/fa6";

const AdminTable = ({ data, title }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async (id) => {
    if (!selectedFile) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await axios.post(
        `https://telent-finder.vercel.app/api/v1/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (response.data.success) {
        toast.success("file uploaded successfully");
      }

      // Optionally, display a success message to the user
    } catch (error) {
      // Optionally, display an error message to the user
    }
  };
  return (
    <div>
      <div className="border bg-[#0066FF] text-white uppercase my-4">
        <h1 className="text-4xl text-center font-bold my-4  ">{title}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-xl text-[#0b3558] ">
              <th>No</th>
              <th>State</th>
              <th>Issue For</th>
              <th>Issue Number</th>
              <th>send file</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.data?.map((sign, index) => (
              <tr className="text-[#0066FF]" key={sign._id}>
                <td>{index + 1}</td>
                <td>{sign.state}</td>
                <td>{sign.selectType}</td>
                <td>{sign.formNumber}</td>
                <td>
                  <input
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <button
                    className="btn-primary ml-4 mt-4 md:mt-0"
                    onClick={() => handleUpload(sign._id)}
                  >
                    Upload
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
