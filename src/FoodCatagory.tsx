import { useEffect, useState } from "react";
import { TABLES } from "./constants";
import CategoryRow from "./CategoryRow";
import moment from "moment";

interface FoodCatagoryProps {
  name: string;
  base: any;
  servings: string;
  setNeedStart: (needStart: boolean) => void;
}



const FoodCatagory = ({ name, servings, base, setNeedStart }: FoodCatagoryProps) => {
  const [todayRecord, setTodayRecord] = useState<any>({});
  const [id, setId] = useState<any>(null); // this is the id of the record for today
  const [data, setData] = useState<any>([]); // this is the data from the airtable
  const today = moment().format("YYYY-MM-DD");
  const tableInfo = TABLES.find((table: any) => table.name === name);
  const defaultFieldValues = {};
  tableInfo?.fields.forEach((field: any) => {
    // @ts-ignore
    defaultFieldValues[field] = 0;
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredRecord = data.filter((record: any) => record?.fields?.Date === today)[0];
    console.log("filter: ", filteredRecord);
    if (filteredRecord) {
      setTodayRecord(filteredRecord?.fields);
      setId(filteredRecord?.id);
      setNeedStart(false);
    }
  }, [data]);

  const fetchData = () => {
    base(name)
    .select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view",
    })
    .eachPage(
      function page(records: any, fetchNextPage: any) {
        // This function (`page`) will get called for each page of records.
        const fetchedRecords = records.map((record: any) => ({ fields: record.fields, id: record.id }));
        setData(fetchedRecords);

        fetchNextPage();
      },
      function done(err: any) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  };

  const updateTable = (subname:string, value: number) => {
    console.log('update: ', data);
    const recordData = {
      "id": id,
      "fields": {
        "Date": todayRecord.Date,
        [`${subname}`]: value,
      },
    };
    base(name).update([recordData]);
  };
  console.log(today);
  console.log(data);

  console.log('TR: ', todayRecord);

  return (
    <div className={`container ${name}`}>
      <div className={name}>{name}</div>
      <div className="servings">{servings}</div>
      <div className="card-body">
        {todayRecord && Object.keys(todayRecord).map((subCatagory) => {
          if (subCatagory === "Date") return null;
          return (
            <CategoryRow
              key={subCatagory}
              catagory={name}
              subCategory={subCatagory || "Loading..."}
              value={todayRecord[subCatagory]}
              updateTable={updateTable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FoodCatagory;
