import { Link } from "react-router-dom";
import PaymentMarque from "../../../componnets/PaymentMarque";

const Recharge = () => {
  return (
    <div className="hero ">
      <div className="hero-content text-center">
        <div className="">
          <PaymentMarque />
          <div className="mt-32 ">
            <h1 className="text-primary">Hello there</h1>

            <Link to={"/dashboard/sendRequest"}>
              <button className=" btn-primary ml-4">send request</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
