import { Select } from "antd";
import React, { Component } from "react";
import {
  ALL_SELECTED,
  FILTER_SELECTION_TYPE,
  ResistanceLevel
} from "../../appConfig";
import "./ContentFilters.css";

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
        <p className="menu-labels">Select a country</p>
        <Select
          className="select-filter"
          defaultValue={ALL_SELECTED}
          placeholder="Select a country"
          onChange={(value: string) =>
            this.props.updateSelection(value, FILTER_SELECTION_TYPE.COUNTRY)
          }
        >
          {countryOptions}
        </Select>
        <p className="menu-labels">Select a variety</p>

        <Select
          className="select-filter"

          defaultValue={ALL_SELECTED}
          placeholder="Select a variety"
          onChange={(value: string) =>
            this.props.updateSelection(value, FILTER_SELECTION_TYPE.VARIETY)
          }
        >
          {varietyOptions}
        </Select>
        <p className="menu-labels" >Select a resistance level</p>

        <Select
          className="select-filter"

          defaultValue={ALL_SELECTED}
          placeholder="Select a resistance level"
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
