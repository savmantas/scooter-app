import PropTypes from "prop-types";
import { useState } from "react";
import AddScooterForm from "./AddScooter";
import backgroundImg from "/src/assets/svgviewer-output.svg";

export default function Top({
  notifyScooterAddition,
  setFilter,
  setSelectFilter,
}) {
  const [selectFilter, setSelectFilterState] = useState("priceLowest");

  const handleSelectChange = (e) => {
    setSelectFilterState(e.target.value);
    setSelectFilter(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container mx-auto min-h-[400px] p-4 top relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          opacity: 0.2,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "40%",
          height: "100%",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          opacity: 0.2,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",

          width: "40%",
          height: "100%",
          transform: "scaleX(-1)",
          left: "60%",
        }}
      ></div>

      <div className="relative z-10">
        <h2 className="text-center text-warning  my-20 text-xl md:text-2xl lg:text-3xl xl:text-5xl title text-blue-800 titles">
          SCOOTER ADMIN
        </h2>
        <AddScooterForm
          notifyScooterAddition={notifyScooterAddition}
          className="add-scooter-form"
        />
        <div className="flex flex-wrap justify-center  gap-20 filters">
          <select onChange={handleFilterChange} className="selects">
            <option className="option" value="all">
              Show All
            </option>
            <option className="option" value="busy">
              Show Busy
            </option>
            <option className="option" value="free">
              Show Available
            </option>
          </select>
          <select
            value={selectFilter}
            onChange={handleSelectChange}
            className="selects"
          >
            <option className="option" value="priceLowest">
              Price (low to high)
            </option>
            <option className="option" value="priceHighest">
              Price (high to low)
            </option>
            <option className="option" value="rideLowest">
              Mileage (low to high)
            </option>
            <option className="option" value="rideHighest">
              Mileage (high to low)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

Top.propTypes = {
  notifyScooterAddition: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setSelectFilter: PropTypes.func.isRequired,
};
