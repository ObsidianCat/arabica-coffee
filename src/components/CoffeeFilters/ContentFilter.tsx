import { ICoffee } from "../../interfaces/ICoffee";
import { Card } from 'antd';
import { IDisease } from "../../interfaces/IDisease";
import { Select } from 'antd';
import React, { Component } from "react";
import { FILTER_SELECTION_TYPE } from "../../appConfig";

const Option = Select.Option;

interface CoffeeFiltersProps {
  varieties: string[],
  countries: string[],
  // diseases: IDisease[],
  updateSelection: (selectionType: string, selectionValue: FILTER_SELECTION_TYPE) => void
}

class CoffeeFilters extends Component<CoffeeFiltersProps, {}> {
  //console.log(props)

  //const diseaseResistanceOptions =  props.diseases.map((prop)=>{<Option value={prop} key={prop}>prop}</Option>})


  render(){
    const { props } = this
    const countryOptions = props.countries.map((prop)=>{
        console.log(prop)
        return <Option value={prop} key={prop}>{prop}</Option>
      })
    const varietyOptions =  props.varieties.map((prop)=>{return <Option value={prop} key={prop}>{prop}</Option>})

    return (<div>

      <Select
        placeholder="Select a country"
        style={{ width: 200 }}
        onChange={(value: string)=>this.props.updateSelection(value, FILTER_SELECTION_TYPE.COUNTRY)}
      >
        {countryOptions}
      </Select>
      <Select
        placeholder="Select a variety"
        style={{ width: 200 }}
        onChange={(value: string)=>this.props.updateSelection(value, FILTER_SELECTION_TYPE.VARIETY)}
      >
        {varietyOptions}
      </Select>

    </div>)
  }

};


export default CoffeeFilters;