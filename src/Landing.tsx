import { TABLES } from "./constants";
import FoodCatagory from "./FoodCatagory";
import moment from "moment";
import Airtable from "airtable";
import { API_KEY, BASE_ID } from "./ENV";

const Landing = () => {
  const BASE = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
  const today = moment().format("dddd MMMM Do");
  return (
    <div className="page">
      <h3>{today}</h3>
      {TABLES.map((table: any) => {
        return <FoodCatagory key={table.name} name={table.name} base={BASE}/>
      })};
    </div>

  );
}

export default Landing;
