import { useEffect } from "react";
import useData from "./hooks/useData";

interface FoodCatagoryProps {
  name: string;
}

const FoodCatagory = ({ name }: FoodCatagoryProps) => {
  const { data, getData } = useData(name);
  useEffect(() => {
    async function onPageLoad() {
      await getData(name);
    }
    onPageLoad();
  }, []);

  console.log(name, 'data: ', data);
  return (
    <>
      <div>{name}</div>
      <div>{data.length > 0 ? 'Success!' : 'Fuck!'}</div>
    </>
  );
}

export default FoodCatagory;
