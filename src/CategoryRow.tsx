import { useState } from "react";
import axios from "axios";

interface CategoryRowProps {
  catagory: string;
  subCategory: string;
  value: number;
  updateTable: (subCatagory: string, value: number) => void;
}

const CategoryRow = ({ catagory, subCategory, value, updateTable }: CategoryRowProps) => {
  const [newValue, setNewValue] = useState(value);
  const formattedName = subCategory.match(/([A-Z]?[^A-Z]*)/g)?.slice(0,-1).join(" ") ;
  
  const handleIncrement = () => {
    if (newValue < 10) {
      setNewValue(newValue + 1);
      updateTable(subCategory, newValue + 1);
    }

  };

  const handleDecrement = () => {
    if (newValue > 0) {
      setNewValue(newValue - 1);
      updateTable(subCategory, newValue - 1);
    }
  };

  return (
    <div className="category-row">
      <span className="category-name">{formattedName}</span>
      <span>
        <button onClick={handleDecrement}>-</button>
        <span className={`${catagory} value`}>{newValue}</span>
        <button onClick={handleIncrement}>+</button>
      </span>
    </div>
  );
};

export default CategoryRow;
