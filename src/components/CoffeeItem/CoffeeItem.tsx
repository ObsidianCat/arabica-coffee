import * as React from "react";
import { ICoffee } from "../../interfaces/ICoffee";
import { Card } from "antd";

interface CoffeeItemProps {
  coffee: ICoffee;
}

const CoffeeItem: React.FunctionComponent<CoffeeItemProps> = ({ coffee }) => {
  return (
    <div>
      <h4>variety name: {coffee.name}</h4>
      <p>description: {coffee.description}</p>
    </div>


  );
};

export default CoffeeItem;
