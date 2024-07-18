/* eslint-disable react/prop-types */

const Charge = ({ title }) => {
  return (
    <div>
      <h1 className="text-center text-xs border bg-slate-600 text-white rounded-md m-4 p-4">
        {title}
      </h1>
    </div>
  );
};

export default Charge;
