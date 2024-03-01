import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Modal({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest(".modalContent")) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div
        className="modalContent bg-gray-900 p-8 rounded-lg text-white relative"
        style={{ width: "90%", maxWidth: "600px" }}
      >
        <button
          className="absolute top-2 right-1 text-white text-lg cursor-pointer mx-4 "
          onClick={onClose}
          style={{ fontSize: "1.5rem" }}
        >
          X
        </button>
        <h2 className="text-3xl font-bold mb-4 modalTitle text-purple-800">
          Scooter Update
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-xl font-bold mb-2 text-purple-800"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-gray-800 text-white hover:bg-gray-700"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-xl font-bold mb-2 text-purple-800"
              htmlFor="ride"
            >
              Ride
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-gray-800 text-white hover:bg-gray-700"
              type="number"
              id="ride"
              name="ride"
              value={formData.ride}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-xl font-bold mb-2 text-purple-800"
              htmlFor="registrationCode"
            >
              Registration Code
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-gray-800 text-white hover:bg-gray-700"
              type="text"
              id="registrationCode"
              name="registrationCode"
              value={formData.registrationCode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-xl font-bold mb-2 text-purple-800"
              htmlFor="hourlyPrice"
            >
              Price/h
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-gray-800 text-white hover:bg-gray-700"
              type="number"
              id="hourlyPrice"
              name="hourlyPrice"
              value={formData.hourlyPrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-xl font-bold mb-2 text-purple-800"
              htmlFor="lastUseTime"
            >
              Date Last Used
            </label>
            <input
              className="rounded w-full py-2 px-3 bg-gray-800 text-white hover:bg-gray-700"
              type="date"
              id="lastUseTime"
              name="lastUseTime"
              value={formData.lastUseTime}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-xl font-bold mb-2 text-purple-800"
              htmlFor="isBusy"
            >
              Status
            </label>
            <select
              className="rounded w-full py-2 px-3 bg-gray-800 text-white hover:bg-gray-700"
              id="isBusy"
              name="isBusy"
              value={formData.isBusy}
              onChange={handleChange}
            >
              <option value={true}>Busy</option>
              <option value={false}>Free</option>
            </select>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 modalBtn"
            onClick={handleSave}
            style={{ width: "100%" }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired,
};

export default Modal;
