import { useEffect, useState } from "react";
import useData from "./hooks/useData";
import moment from "moment";

interface FoodCatagoryProps {
  name: string;
}



const FoodCatagory = ({ name }: FoodCatagoryProps) => {
  const { data, getData } = useData(name);
  const today = moment().format('YYYY-MM-DD');
  const [entry, setEntry] = useState<any>({});
     
  useEffect(() => {
    async function onPageLoad() {
      await getData(name);
    }
    onPageLoad();
  }, []);

  useEffect(() => {
    const todayEntry = data.filter((record) => {
      const date = record.fields.Date;
       console.log(date, today);
      return date === today;
      
    });
    console.log('todayEntry: ', todayEntry);
    if (todayEntry.length !== 0) {
      const fields = Object.keys(todayEntry[0].fields);
      const parsedEntry = {};
      fields.forEach((field) => {
        if (field !== "Date") {
          // @ts-ignore
          parsedEntry[field] = todayEntry[0].fields[field];
        }
      });
      console.log('PE: ', parsedEntry);
      setEntry(parsedEntry);
    };
  }, [data, today]);

  console.log(name, 'data: ', data);
  return (
    <>
      <div>{name}</div>
      <div>{data.length > 0 ? 'Success!' : 'Fuck!'}</div>
      <ul>{Object.keys(entry).map((subCatagory) => {
        console.log(entry);
        return (
          <li><span>{subCatagory}</span><span>-</span><span>{entry[subCatagory]}</span><span>+</span></li>
        )
      })}</ul>
    </>
  );
}

export default FoodCatagory;
