import axios from "axios";
import { FaCircleArrowDown } from "react-icons/fa6";

export const base_url = "https://telent-finder.vercel.app/api/v1";
export const singnCopy = async (data, identifier) => {
  const { formNumber, selectType, signCopyDetails, userEmail } = data;
  const singDatas = {
    formNumber,
    selectType,
    signCopyDetails,
    identifier,
    userEmail,
  };
  const response = await axios.post(`${base_url}/create-sign-copy`, {
    singDatas,
  });
  return response;
};
