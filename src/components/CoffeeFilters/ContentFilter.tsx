import { ICoffee } from "../../interfaces/ICoffee";
import { Card } from "antd";
import { IDisease } from "../../interfaces/IDisease";
import { Select } from "antd";
import React, { Component } from "react";
import {
  ALL_SELECTED,
  FILTER_SELECTION_TYPE,
  ResistanceLevel
} from "../../appConfig";

const Option = Select.Option;

interface CoffeeFiltersProps {
  varieties: string[];
  countries: string[];
  updateSelection: (
    selectionType: string,
    selectionValue: FILTER_SELECTION_TYPE
  ) => void;
}

class CoffeeFilters extends Component<CoffeeFiltersProps, {}> {
  convertToOptions(list: string[]) {
    const allOption = (
      <Option value={ALL_SELECTED} key={ALL_SELECTED}>
        {ALL_SELECTED}
      </Option>
    );
    const converted = list.map(prop => {
      return (
        <Option value={prop} key={prop}>
          {prop}
        </Option>
      );
    });
    return [allOption, ...converted];
  }

  createResistanceOptions() {
    const levels = Object.keys(ResistanceLevel).map(
      (type) => {
        return  ResistanceLevel[type];
      }
    );

    return this.convertToOptions(levels)
  }

  render() {
    const { props } = this;
    const countryOptions = this.convertToOptions(props.countries);
    const varietyOptions = this.convertToOptions(props.varieties);
    const resistanceOptions = this.convertToOptions(
      Object.keys(ResistanceLevel).map(
        (type): string => {
          return ResistanceLevel[type];
        }
      )
    );
    return (
      <div>
        <Select
          placeholder="Select a country"
          style={{ width: 200 }}
          onChange={(value: string) =>
            this.props.updateSelection(value, FILTER_SELECTION_TYPE.COUNTRY)
          }
        >
          {countryOptions}
        </Select>
        <Select
          placeholder="Select a variety"
          style={{ width: 200 }}
          onChange={(value: string) =>
            this.props.updateSelection(value, FILTER_SELECTION_TYPE.VARIETY)
          }
        >
          {varietyOptions}
        </Select>
        <Select
          placeholder="Select a resistance level"
          style={{ width: 200 }}
          onChange={(value: string) =>
            this.props.updateSelection(value, FILTER_SELECTION_TYPE.RESISTANCE_LEVEL)
          }
        >
          {resistanceOptions}
        </Select>
      </div>
    );
  }
}

export default CoffeeFilters;
