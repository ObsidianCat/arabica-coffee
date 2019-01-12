import * as React from "react";
import { ICoffee } from "../../interfaces/ICoffee";
import "./CoffeeItem.css";
import { Divider } from 'antd';

interface CoffeeItemProps {
  coffee: ICoffee;
}

const CoffeeItem: React.FunctionComponent<CoffeeItemProps> = ({ coffee }) => {
  const diseasesInfo = coffee.disease_resistance.map((item)=>{
    const info = Object.entries(item).join(" ")
    return (<p key={info}>{info}</p>)
  })

  return (
    <div className='coffee-item'>
      <h3>{coffee.name}</h3>
      <p>{coffee.description}</p>
      <h4>Level of resistance to diseases</h4>
      {diseasesInfo}
      <Divider />
    </div>
  );
};

export default CoffeeItem;
