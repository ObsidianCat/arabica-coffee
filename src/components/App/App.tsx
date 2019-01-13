import React, { Component } from "react";
import "antd/dist/antd.css";
import "./App.css";
import axios from "axios";
import {
  ALL_SELECTED,
  COFFEE_API_BASE,
  EMPTY_FILTER,
  FILTER_SELECTION_TYPE,
  STORAGE_KEY
} from "../../appConfig";
import { ICoffee } from "../../interfaces/ICoffee";
import CoffeeItem from "../CoffeeItem/CoffeeItem";

import { Layout } from "antd";
import CoffeeFilters from "../CoffeeFilters/ContentFilters";

const { Content, Sider } = Layout;

interface IFilters {
  country: string;
  resistanceLevel: string;
  variety: string;
}
interface IState {
  coffeeList: ICoffee[];
  filters: IFilters;
  siderCollapsed: boolean;
}
class App extends Component<{}, IState> {
  state: IState = {
    coffeeList: [],
    filters: {
      country: EMPTY_FILTER,
      resistanceLevel: EMPTY_FILTER,
      variety: EMPTY_FILTER
    },
    siderCollapsed: false
  };

  componentDidMount() {
    this.fetchCoffeeData();
  }

  fetchCoffeeData = (url = COFFEE_API_BASE) => {
    // Very basic cache first decision, but ok for test app with the api responses which never changes
    let data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.setState({ coffeeList: JSON.parse(data) });
      return;
    }

    axios
      .get(url)
      .then(response => {
        this.setState({ coffeeList: response.data });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateSelection = (
    selectionValue: string,
    selectionType: FILTER_SELECTION_TYPE
  ) => {
    selectionValue =
      selectionValue != ALL_SELECTED ? selectionValue : EMPTY_FILTER;
    this.setState(prevState => {
      return {
        filters: Object.assign(prevState.filters, {
          [selectionType]: selectionValue
        })
      };
    });
  };

  applyFilters(coffeeList: ICoffee[]) {
    const filters = this.state.filters;
    const filtered = coffeeList.filter(item => {
      const resistancesSet = new Set();
      item.disease_resistance.forEach(item => {
        resistancesSet.add(Object.values(item)[0]);
      });

      const inCountrySelection =
        filters.country === EMPTY_FILTER ||
        item.producing_countries.includes(filters.country);
      const inVarietySelection =
        filters.variety === EMPTY_FILTER || item.name === filters.variety;
      const inRsistanceGroup =
        filters.resistanceLevel === EMPTY_FILTER ||
        resistancesSet.has(filters.resistanceLevel);

      return inCountrySelection && inVarietySelection && inRsistanceGroup;
    });

    return filtered;
  }

  extractCountries(coffeeList: ICoffee[]) {
    const countries = new Set();
    coffeeList.forEach(item => {
      item.producing_countries.forEach(country => {
        countries.add(country);
      });
    });

    return Array.from(countries);
  }

  extractVarieties(coffeeList: ICoffee[]) {
    return coffeeList.map(item => {
      return item.name;
    });
  }

  onCollapse = (siderCollapsed: boolean) => {
    this.setState({ siderCollapsed });
  };

  render() {
    const { coffeeList } = this.state;
    const filteredCoffees = this.applyFilters(coffeeList);
    return (
      <div className="App">
        <Layout className="App__layout">
          <Sider
            className="sidebar"
            collapsible
            collapsed={this.state.siderCollapsed}
            onCollapse={this.onCollapse}
          >
            {coffeeList.length > 0 && (
              <CoffeeFilters
                countries={this.extractCountries(coffeeList)}
                varieties={this.extractVarieties(coffeeList)}
                updateSelection={this.updateSelection}
              />
            )}
          </Sider>
          <Layout className="coffee-main-content">
            <Content className="coffee-main-content__inner">
              {filteredCoffees.map((item: ICoffee) => {
                return <CoffeeItem key={item.name} coffee={item} />;
              })}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
