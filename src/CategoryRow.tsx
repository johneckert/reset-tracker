import { useState } from "react";

interface CategoryRowProps {
  catagory: string;
  subCategory: string;
  value: number;
  updateTable: (subCatagory: string, value: number) => void;
}

const CategoryRow = ({ catagory, subCategory, value, updateTable }: CategoryRowProps) => {
  console.log('CR: ', catagory, subCategory, value);
  const [newValue, setNewValue] = useState(value);
  const formattedName = subCategory.split('-').join(', ').match(/([A-Z]?[^A-Z]*)/g)?.slice(0,-1).join(" ") ;
  
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
        <span className={`value`}>{newValue}</span>
        <button onClick={handleIncrement}>+</button>
      </span>
    </div>
  );
};

export default CategoryRow;
