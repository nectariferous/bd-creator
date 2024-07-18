import axios from "axios";
import usePayment from "../../../hooks/usePayments";
import { MdOutlineDoneOutline } from "react-icons/md";
import useContexts from "../../../hooks/useContexts";
const AdminPaymentRequests = () => {
  const { user } = useContexts();
  const { payments, refetch } = usePayment();
  if (!payments.data || !Array.isArray(payments.data)) {
    return <h1>No payment data available.</h1>;
  }

  const handlePaymentApproved = async (data) => {
    const response = await axios.post(
      `https://telent-finder.vercel.app/api/v1/set-payments?email=${user.email}`,
      {
        userEmail: data.userEmail,
        amount: data.amount,
      }
    );
    console.log(response.data);
    if (response.data.success === true) {
      const response = await axios.delete(
        `https://telent-finder.vercel.app/api/v1/delete-payments?id=${data.id}`
      );
      refetch();
      console.log(response);
    }
    console.log(data);
  };
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-2xl text-[#0b3558] ">
              <th>No</th>
              <th>User name</th>
              <th>User email</th>
              <th>transactionId</th>
              <th>amount</th>

              <th>approve</th>
            </tr>
          </thead>
          <tbody className="">
            {payments?.data?.map((payments, index) => (
              <tr className="text-secondary" key={payments._id}>
                <td>{index + 1}</td>
                <td>{payments.userName}</td>
                <td>{payments.userEmail}</td>
                <td>{payments.transactionId}</td>
                <td>{payments.amount}</td>

                <td>
                  <button
                    onClick={() => handlePaymentApproved(payments)}
                    className={"flex items-center   btn-primary"}
                  >
                    <MdOutlineDoneOutline />
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

export default AdminPaymentRequests;
