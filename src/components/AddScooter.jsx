import { useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

export default function AddScooterForm({ notifyScooterAddition }) {
  const [scooter, setScooter] = useState({
    title: "",
    ride: '',
    registrationCode: "",
    hourlyPrice: 0,
  });

  const handleRideChange = (e) => {
    const newValue = +e.target.value;
    if (newValue < 0) alert("The mileage value cannot be less than zero");
    else setScooter({ ...scooter, ride: newValue });
  };
  const handleNameChange = (e) => {
    setScooter({ ...scooter, title: e.target.value });
  };
  const handleNationalNumberChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length > 5)
      alert("The license plate number cannot be longer than 5 characters");
    else setScooter({ ...scooter, registrationCode: newValue });
  };
  const handlePricingChange = (e) => {
    const newValue = +e.target.value;
    if (newValue < 0) alert("The price value cannot be less than 0");
    else if (newValue > 100)
      alert("The price value cannot be greater than 100");
    else setScooter({ ...scooter, hourlyPrice: newValue });
  };
  const saveNewScooter = () => {
    if (!/[A-Z]{3}[\d]{2}/.test(scooter.registrationCode)) {
      alert("Registration code must contain 3 uppercase letters and 2 numbers");
      return;
    }
    notifyScooterAddition(scooter);
    setScooter({
      title: "",
      ride: '',
      registrationCode: "",
      hourlyPrice: 0,
    });
  };
  return (
    <div className="flex flex-wrap gap-4 w-4/5 justify-center mx-auto add-scooter-form">
      <input
        type="text"
        value={scooter.title}
        onChange={handleNameChange}
        className="rounded px-2 py-1 outline-sky-200 outline-2 min-w-[100px] details max-w-[200px]"
        placeholder="Scooter Title"
      />
      <input
        type="text"
        value={scooter.registrationCode}
        onChange={handleNationalNumberChange}
        className="rounded px-2 py-1 outline-sky-200 outline-2 min-w-[100px] details max-w-[200px]"
        placeholder="Registration Code"
      />
      <input
        type="number"
        value={scooter.hourlyPrice === 0 ? "" : scooter.hourlyPrice.toString()}
        onChange={handlePricingChange}
        className="rounded px-2 py-1 outline-sky-200 outline-2 min-w-[100px] details max-w-[200px]"
        placeholder="Price/h"
      />
     <input
  type="number"
  value={scooter.ride.toString()}
  onChange={handleRideChange}
  placeholder="Mileage"
  className="rounded px-2 py-1 outline-sky-200 outline-2 min-w-[100px] details max-w-[200px]"
/>
      <div>
        <Button onClick={saveNewScooter} text="ADD SCOOTER" />
      </div>
      <h2 className="text-center text-warning  my-20 text-xl  md:text-2xl lg:text-3xl xl:text-5xl title text-blue-800 titles">
        FILTER UPDATE DELETE
      </h2>
    </div>
  );
}

AddScooterForm.propTypes = {
  notifyScooterAddition: PropTypes.func,
};
