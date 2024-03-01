import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal";

export default function Middle({ newScooter, filter, selectFilter }) {
  const [scooters, setScooters] = useState(getAllScooters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editScooter, setEditScooter] = useState(null);

  useEffect(() => {
    if (newScooter === null) return;
    if (newScooter) {
      const newId = +localStorage.getItem("currentId");
      localStorage.setItem("currentId", String(newId + 1));
      const newScooterAddition = {
        ...newScooter,
        id: newId || 1,
        lastUseTime: 1,
        isBusy: false,
      };
      setScooters((prevScooters) => [...prevScooters, newScooterAddition]);
    }
  }, [newScooter]);

  useEffect(() => {
    localStorage.setItem("scooters", JSON.stringify(scooters));
  }, [scooters]);

  function getAllScooters() {
    const data = JSON.parse(localStorage.getItem("scooters")) || [];
    if (data.length === 0) {
      localStorage.setItem("scooters", JSON.stringify([]));
    }
    return data;
  }

  const handleDeleteScooter = (id) => {
    setScooters((prevScooters) =>
      prevScooters.filter((scooter) => scooter.id !== id)
    );
  };

  const handleToggleStatus = (id) => {
    const scooterToUpdate = scooters.find((scooter) => scooter.id === id);

    if (!scooterToUpdate) {
      return;
    }

    if (scooterToUpdate.isBusy) {
      const newMileageInput = prompt("Enter kilometers ridden.");

      if (newMileageInput === null) {
        return;
      }

      const newMileage = parseInt(newMileageInput);

      if (isNaN(newMileage) || newMileage < 0) {
        alert("Invalid input. Please enter a valid number.");
        return;
      }

      const currentMileage = parseInt(scooterToUpdate.ride);
      const totalMileage = currentMileage + newMileage;

      setScooters((prevScooters) =>
        prevScooters.map((scooter) =>
          scooter.id === id
            ? {
                ...scooter,
                isBusy: false,
                ride: totalMileage,
                lastUseTime: new Date().getTime(),
              }
            : scooter
        )
      );
    } else {
      setScooters((prevScooters) =>
        prevScooters.map((scooter) =>
          scooter.id === id
            ? {
                ...scooter,
                isBusy: !scooter.isBusy,
                lastUseTime: new Date().getTime(),
              }
            : scooter
        )
      );
    }
  };

  const handleSortScooters = (scooterA, scooterB) => {
    switch (selectFilter) {
      case "priceLowest":
        return scooterA.hourlyPrice - scooterB.hourlyPrice;
      case "priceHighest":
        return scooterB.hourlyPrice - scooterA.hourlyPrice;
      case "rideLowest":
        return scooterA.ride - scooterB.ride;
      case "rideHighest":
        return scooterB.ride - scooterA.ride;
      default:
        return 0;
    }
  };

  const filteredScooters = scooters
    .filter((scooter) => {
      if (filter === "all") return true;
      return (
        (filter === "free" && !scooter.isBusy) ||
        (filter === "busy" && scooter.isBusy)
      );
    })
    .sort(handleSortScooters);

  const handleEditScooter = (scooter) => {
    setEditScooter(scooter);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (updatedData) => {
    const updatedScooters = scooters.map((scooter) =>
      scooter.id === editScooter.id ? { ...scooter, ...updatedData } : scooter
    );
    setScooters(updatedScooters);
    setIsModalOpen(false);
    setEditScooter(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditScooter(null);
  };

  return (
    <div className="container mx-auto min-h-[400px] flex flex-col gap-4  middle">
      {filteredScooters.map((scooter) => (
        <div
          key={scooter.id}
          className="rounded p-4 flex flex-wrap justify-between gap-x-10 gap-y-8 details"
        >
          <div>
            <h3 className="font-bold about ">{scooter.title}</h3>
            <div>Mileage {scooter.ride} km</div>
          </div>
          <div>
            <h3 className="font-bold about">Reg. Code</h3>
            <div>{scooter.registrationCode}</div>
          </div>
          <div>
            <h3 className="font-bold about">Price/h</h3>
            <div>{scooter.hourlyPrice} €</div>
          </div>
          <div>
            <h3 className="font-bold about">Date Last Used</h3>
            <div>
              {scooter.lastUseTime === 1
                ? "Never been used"
                : new Date(scooter.lastUseTime).toLocaleDateString("lt")}
            </div>
          </div>
          <div>
            <h3 className="font-bold about">Status</h3>
            <div className="indicator">
              <div
                className="rounded-full inline-block cursor-pointer status"
                style={{ background: scooter.isBusy ? "red" : "lime" }}
                onClick={() => handleToggleStatus(scooter.id)}
              ></div>
              {scooter.isBusy ? " Busy" : " Free"}
            </div>
          </div>
          <div className="flex gap-4 text-3xl items-center">
            <FaPencilAlt
              className="text-blue-700 hover:text-blue-400 cursor-pointer"
              onClick={() => handleEditScooter(scooter)}
            />
            <FaTrashAlt
              className="text-red-700 hover:text-red-400 cursor-pointer"
              onClick={() => handleDeleteScooter(scooter.id)}
            />
          </div>
        </div>
      ))}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
          title="Edit Scooter"
          initialData={editScooter}
        />
      )}
    </div>
  );
}

Middle.propTypes = {
  newScooter: PropTypes.object,
  filter: PropTypes.string.isRequired,
  selectFilter: PropTypes.string.isRequired,
};
