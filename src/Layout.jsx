import { useState } from "react";
import Bottom from "./components/Bottom";
import Middle from "./components/Middle";
import Top from "./components/Top";

export default function Layout() {
  const [newScooter, setNewScooter] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectFilter, setSelectFilter] = useState("priceLowest");

  function notifyScooterAddition(scooter) {
    setNewScooter(scooter);
  }

  function updateFilter(newFilter) {
    if (typeof newFilter !== "string") {
      console.error("Invalid filter type:", typeof newFilter);
      return;
    }
    setFilter(newFilter);
  }

  return (
    <div className="border-8 border-gray-700" >
      <Top
        notifyScooterAddition={notifyScooterAddition}
        setFilter={updateFilter}
        setSelectFilter={setSelectFilter}
      />
      <Middle
        newScooter={newScooter}
        filter={filter}
        selectFilter={selectFilter}
      />
      <Bottom />
    </div>
  );
}
