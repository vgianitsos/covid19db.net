import React, { Component } from "react";
import Map from "../map";
import { BigStat, DemographicFactor, HealthFactor } from "./riskComponents";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "../../client";

import Agg from "./data/Aggregate.json";

export default class RiskInstance extends Component {
  constructor() {
    super();
    this.state = {
      riskData: null,
      caseData: null,
    };
  }
  // https://api.covid19db.net/
  // risk-factor-statistics
  // 'sampleData.json'
  componentDidMount() {
    axios.get("risk-factor-statistics/" + this.props.code).then(
      (res) => {
        const riskData = res.data;
        this.setState({ riskData });
      },
      (error) => {
        console.log("error: promise not fulfilled");
        console.log(error);
      }
    );

    axios
      .get("case-statistics/" + this.props.code, {
        params: {
          attributes: "new",
        },
      })
      .then(
        (res) => {
          const caseData = res.data;
          this.setState({ caseData });
        },
        (error) => {
          console.log("error: promise not fulfilled");
          console.log(error);
        }
      );
  }

  render() {
    const data = this.state.riskData;
    const caseData = this.state.caseData;
    console.log(this.props.code);
    if (!data || !caseData) {
      return <div />;
    }
    const activeCases = caseData.new.active;

    const {
      country,
      location,
      populationDensity,
      humanDevelopmentIndex,
      gini,
      gdpPerCapita,
      medianAge,
      aged65Older,
      aged70Older,
      extremePovertyRate,
      cardiovascDeathRate,
      diabetesPrevalence,
      femaleSmokers,
      maleSmokers,
      hospitalBedsPerThousand,
      lifeExpectancy,
      handwashingFacilities,
    } = data;

    return (
      <div className="App">
        <header className="risk-header">
          <Link to="/risk-factor-statistics">
            <Button variant="outline-secondary">Go back to risks</Button>
          </Link>
          <h1 id="page-title">
            Risk Factors in {country?.name} ({country?.codes?.alpha3Code})
          </h1>
          <h3>{country?.name}</h3>
          <span>
            <h5 style={{ display: "inline" }}>Risk Level: </h5>
            <h5
              style={{
                display: "inline",
                color: `${activeCases > 500 ? "red" : "orange"}`,
              }}
            >
              {activeCases > 500 ? "High" : "Medium"}
            </h5>
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              marginTop: "30px",
            }}
          >
            <BigStat
              title="Human Development Index"
              data={humanDevelopmentIndex?.toFixed(3)}
              avg={Agg.humanDevelopmentIndex.toFixed(3)}
            />
            <BigStat
              title="Gini Index"
              data={gini?.toFixed(1)}
              avg={Agg.gini.toFixed(1)}
            />
            <BigStat
              title="GDP Per Capita"
              prefix="$"
              data={`${gdpPerCapita?.toLocaleString()}`}
              suffix="/person"
              avg={`$${Agg.gdpPerCapita?.toLocaleString()}`}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <div id="demogr-factor-title-div">
              <h2 id="subtitle">Demographic Risk Factors</h2>
            </div>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
                flexWrap: "wrap",
              }}
            >
              <DemographicFactor
                title="Population Density"
                data={populationDensity?.toFixed(3)}
                suffix="people/sq.mi."
                avg={Agg.populationDensity.toFixed(3)}
              />
              <DemographicFactor
                title="Median Age"
                data={medianAge?.toFixed(3)}
                suffix="yrs."
                avg={Agg.medianAge.toFixed(3)}
              />
              <DemographicFactor
                title="Age 65 and Older"
                data={`${aged65Older?.toFixed(3)}%`}
                avg={`${Agg.aged65Older.toFixed(3)} %`}
              />
              <DemographicFactor
                title="Age 70 and Older"
                data={`${aged70Older?.toFixed(3)}%`}
                avg={`${Agg.aged70Older.toFixed(3)} %`}
              />
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h2 id="subtitle">Health Risk Factors</h2>
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                justifyContent: "left",
                flexWrap: "wrap",
              }}
            >
              <HealthFactor
                title="Life Expectancy"
                data={lifeExpectancy?.toFixed(2)}
                suffix="yrs."
                avg={`${Agg.lifeExpectancy.toFixed(2)}`}
              />
              <HealthFactor
                title="Extreme Poverty Rate"
                data={`${extremePovertyRate?.toFixed(1)}%`}
                avg={`${Agg.extremePovertyRate.toFixed(1)}%`}
              />
              <HealthFactor
                title="Hospital Beds Per Thousand"
                data={hospitalBedsPerThousand?.toFixed(3)}
                avg={Agg.hospitalBedsPerThousand.toFixed(3)}
                suffix="/thousand"
              />
              <HealthFactor
                title="Cardiovascular Death Rate"
                data={cardiovascDeathRate?.toFixed(3)}
                avg={Agg.cardiovascDeathRate.toFixed(3)}
                suffix="/100,000"
              />
              <HealthFactor
                title="Diabetes Prevlaence"
                data={`${diabetesPrevalence?.toFixed(3)}%`}
                avg={`${Agg.diabetesPrevalence.toFixed(3)}%`}
                suffix=" of adults"
              />
              <HealthFactor
                title="Female Smokers"
                data={`${femaleSmokers?.toFixed(1)}%`}
                avg={`${Agg.femaleSmokers.toFixed(1)}%`}
                suffix="of adults"
              />
              <HealthFactor
                title="Male Smokers"
                data={`${maleSmokers?.toFixed(1)}%`}
                avg={`${Agg.maleSmokers.toFixed(1)}%`}
                suffix="of adults"
              />
              <HealthFactor
                title="Handwashing Facilities"
                data={`${handwashingFacilities?.toFixed(3)}%`}
                avg={`${Agg.handwashingFacilities?.toFixed(3)}%`}
                suffix=" access"
              />
            </div>
          </div>
          {/* media / visual */}
          <div style={{ marginTop: "1vh" }}>
            <div id="title-div">
              <h2 id="subtitle">Map</h2>
            </div>
            <Map
              center={[location?.lng, location?.lat]}
              zoom={4}
              height={window.innerHeight * 0.4}
              width={window.innerWidth * 0.4}
            />
          </div>
        </header>
      </div>
    );
  }
}
