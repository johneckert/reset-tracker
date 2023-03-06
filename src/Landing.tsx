import { tables } from "./constants";
import FoodCatagory from "./FoodCatagory";
import moment from "moment";

export default function Landing() {
  const today = moment().format("dddd MMMM Do");
  return (
    <div className="page">
      <h3>{today}</h3>
      {tables.map((table) => <FoodCatagory key={table} name={table}/>)}
    </div>
  );
}
