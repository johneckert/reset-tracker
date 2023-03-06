import { useEffect, useState } from "react";
import useData from "./hooks/useData";
import moment from "moment";
import CategoryRow from "./CategoryRow";
import { API_KEY, BASE_ID } from "./ENV";
import Airtable from "airtable";

interface FoodCatagoryProps {
  name: string;
}



const FoodCatagory = ({ name }: FoodCatagoryProps) => {
  const { data, getData } = useData(name);
  const today = moment().format('YYYY-MM-DD');
  const [record, setRecord] = useState<any>(null);
  const [entry, setEntry] = useState<any>({});
     
  useEffect(() => {
    async function onPageLoad() {
      await getData(name);
    }
    onPageLoad();
  }, []);

  const updateTable = (subCatagory:string, value: number) => {
    const recordData = {
      "id": record.id,
      "fields": {
        "Date": record.fields.Date,
        [`${subCatagory}`]: value,
      },
    };
    var base = new Airtable({apiKey: API_KEY}).base(BASE_ID);
    base('Green').update([recordData]);
  };


  useEffect(() => {
    const todayEntry = data.filter((record) => {
      const date = record.fields.Date;
      return date === today;
      
    });
    if (todayEntry.length !== 0) {
      setRecord(todayEntry[0]);
      const fields = Object.keys(todayEntry[0].fields);
      const parsedEntry = {};
      fields.forEach((field) => {
        if (field !== "Date") {
          // @ts-ignore
          parsedEntry[field] = todayEntry[0].fields[field];
        }
      });
      setEntry(parsedEntry);
    };
  }, [data, today]);

  return (
    <div className={`container ${name}`}>
      <div className={name}>{name}</div>
      <div className="card-body">
        {Object.keys(entry).map((subCatagory) => {
          return (
            <CategoryRow
              key={subCatagory}
              catagory={name}
              subCategory={subCatagory || "Loading..."}
              value={entry[subCatagory]}
              updateTable={updateTable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FoodCatagory;
