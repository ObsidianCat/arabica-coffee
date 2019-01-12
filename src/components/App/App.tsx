import React, { Component } from "react";
import "antd/dist/antd.css";
import "./App.css";
import axios from "axios";
import { COFFEE_API_BASE, EMPTY_FILTER, FILTER_SELECTION_TYPE } from "../../appConfig";
import { ICoffee } from "../../interfaces/ICoffee";
import CoffeeItem from "../CoffeeItem/CoffeeItem";

import { Layout } from "antd";
import CoffeeFilters from "../CoffeeFilters/ContentFilter";

const { Header, Content, Footer, Sider } = Layout;

interface IFilters {
  country: string;
  diseaseResistance: string;
  variety: string;
}
interface IState {
  coffeeList: ICoffee[];
  filters: IFilters;
}
class App extends Component<{}, IState> {
  state: IState = {
    coffeeList: [],
    filters: {
      country: EMPTY_FILTER,
      diseaseResistance: EMPTY_FILTER,
      variety: EMPTY_FILTER
    }
  };

  componentDidMount() {
    this.fetchCoffeeData();
  }

  fetchCoffeeData = (url = COFFEE_API_BASE) => {
    axios
      .get(url)
      .then(response => {
        console.log(response.data);
        this.setState({ coffeeList: response.data });
        console.log(this.state);
      })
      .catch(error => console.error(error));
  };

  updateSelection(selectionValue: string, selectionType: FILTER_SELECTION_TYPE) {
    switch (selectionType) {
      case FILTER_SELECTION_TYPE.COUNTRY:

        break;
    }
  }

  applyFilters(cofffeeList) {
    const filters = this.state.filters;
    const filtered = this.state.coffeeList.filter(item => {
      const inCountrySelection =
        filters.country === EMPTY_FILTER ||
        item.producing_countries.includes(filters.country);
      const inVarietySelection =
        filters.variety === EMPTY_FILTER || item.name === filters.variety;
      return inCountrySelection && inVarietySelection;
    });

    return filtered
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

  render() {
    const { coffeeList } = this.state;
    const filteredCoffees = this.applyFilters(coffeeList)
    return (
      <div className="App">
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            {coffeeList.length > 0 && (
              <CoffeeFilters
                countries={this.extractCountries(coffeeList)}
                varieties={this.extractVarieties(coffeeList)}
                updateSelection={this.updateSelection}
              />
            )}
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
