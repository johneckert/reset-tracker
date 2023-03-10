import { TABLES, API_KEY, BASE_ID } from "./constants";
import { useState } from "react";
import FoodCatagory from "./FoodCatagory";
import moment from "moment";
import Airtable from "airtable";

const Landing = () => {
  const [needStart, setNeedStart] = useState(true);
  const BASE = new Airtable({ apiKey: API_KEY }).base(BASE_ID);
  const today = moment().format("YYYY-MM-DD");

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleStartDay = () => {
    TABLES.forEach((table: any) => {
      const defaultFieldValues = {};
      table?.fields.forEach((field: any) => {
        // @ts-ignore
        defaultFieldValues[field] = 0;
      });
      BASE(table.name).create(
        [
          {
            fields: {
              ...defaultFieldValues,
              Date: today,
            },
          },
        ],
        // @ts-ignore
        function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          // @ts-ignore
          records.forEach(function (record) {
            console.log(record.getId());
          });
        }
      );
    });
    setNeedStart(false);
  };

  return (
    <div className="page">
      <h3>{today}</h3>
      {needStart && (
        <button className="startDay" onClick={handleStartDay}>
          Start Day
        </button>
      )}
      {TABLES.map((table: any) => {
        return (
          <FoodCatagory
            key={table.name}
            name={table.name}
            servings={table.servings}
            base={BASE}
            setNeedStart={setNeedStart}
          />
        );
      })}
      <button className="startDay" onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );
}

export default Landing;
