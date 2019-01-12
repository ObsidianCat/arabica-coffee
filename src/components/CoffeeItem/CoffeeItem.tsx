import * as React from 'react';
import { ICoffee } from "../../interfaces/ICoffee";
import { Card } from 'antd';

interface CoffeeItemProps {
  coffee: ICoffee
}

const CoffeeItem: React.FunctionComponent<CoffeeItemProps> = ({coffee}) => {
  return (<p>{coffee.name}</p>)
};


export default CoffeeItem;