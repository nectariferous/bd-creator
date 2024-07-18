import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";

const BioMetric = () => {
  const location = useLocation();
  const { data } = location.state || {};
  console.log(data);

  if (!data) {
    return <div>No data available</div>;
  }

  const { number, nid, dob } = data;

  const textToCopy = `👤 NUMBER INFO 👤\n❏ NUMBER ➦ ${number}\n❏ NID ➦ ${nid}\n❏ DATE OF BIRTH ➦ ${dob}`;

  return (
    <div className="md:flex justify-center items-center md:mt-28 flex-col border md:mx-8">
      <div className="  mb-4 p-16 shadow-2xl">
        <p>👤 NUMBER INFO 👤</p>
        <p>{`❏ NUMBER ➦ ${number} `}</p>
        <p>{`❏ NID ➦ ${nid}`}</p>
        <p>{`❏ DATE OF BIRTH ➦${dob}`}</p>
        <CopyToClipboard text={textToCopy}>
          <button className="bg-blue-500 mt-8 hover:bg-blue-700 text-white font-bold mx-auto py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <FaCopy className="inline-block mr-2" /> Copy Text
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default BioMetric;
