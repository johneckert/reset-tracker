import { useState } from "react";

interface CategoryRowProps {
  catagory: string;
  subCategory: string;
  value: number;
}

const CategoryRow = ({ catagory, subCategory, value }: CategoryRowProps) => {
  const [newValue, setNewValue] = useState(value);

  const handleIncrement = () => {
    if (newValue < 10) {
      setNewValue(newValue + 1);
    }

  };

  const handleDecrement = () => {
    if (newValue > 0) {
      setNewValue(newValue - 1);
    }
  };

  return (
    <li>
      <span className="category-name">{subCategory}</span>
      <button onClick={handleDecrement}>-</button>
      <span className={`${catagory} value`}>{newValue}</span>
      <button onClick={handleIncrement}>+</button>
    </li>
  );
};

export default CategoryRow;
