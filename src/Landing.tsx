import React, { useEffect } from "react";
import useData from "./hooks/useData";

export default function Landing() {
  const { data, getData } = useData();
  useEffect(() => {
    async function onPageLoad() {
      await getData();
    }
    onPageLoad();
  }, []);

  console.log(data);
  return (
    <div className="page">
      <h3>Airtable data</h3>
    </div>
  );
}
