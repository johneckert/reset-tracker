import React, { useEffect } from "react";
import useData from "./hooks/useData";
import { tables } from "./constants";
import FoodCatagory from "./FoodCatagory";

export default function Landing() {
  // const { data, getData } = useData();
  // useEffect(() => {
  //   async function onPageLoad() {
  //     await getData();
  //   }
  //   onPageLoad();
  // }, []);

  // console.log(data);
  return (
    <div className="page">
      <h3>Airtable data</h3>
      {tables.map((table) => <FoodCatagory key={table} name={table}/>)}
    </div>
  );
}
