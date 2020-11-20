import React from "react";
import { ResponsiveLine } from "@nivo/line";
import "../caseInstance.css";

/* 
  Method to transform given case data into format needed to pass
  into NOVI line graph.
*/
function compileData(data) {
  var history = data || [];
  var confirmed = [];
  var deaths = [];
  var recovered = [];
  var active = [];
  var dailyCases = [];
  for (var i = 7; i < history.length; i += 3) {
    //Need to format date on x-axis for the graph

    var date = i; //history[i].Date;
    //date = 0
    dailyCases.push({
      x: date,
      y: history[i].Confirmed - history[i - 7].Confirmed,
    });
    confirmed.push({ x: date, y: history[i].Confirmed });
    deaths.push({ x: date, y: history[i].Deaths });
    recovered.push({ x: date, y: history[i].Recovered });
    active.push({ x: date, y: history[i].Active });
  }

  var lineData = [];
  lineData.push({ id: "New Cases", data: dailyCases });
  /* 
    Considering to split lines into separate graphs in future phases
  */
  // lineData.push({ "id": 'Confirmed', "data": confirmed });
  // lineData.push({ "id": 'Deaths', "data": deaths });
  // lineData.push({ "id": 'Recovered', "data": recovered });
  // lineData.push({ "id": 'Active', "data": active });
  return lineData;
}

/*
  Need to style graph and fix x-axis spacing
  Graph should be horizontallly scrollable?
*/
function CaseResponseLine(props) {
  return (
    <ResponsiveLine
      data={compileData(props.data)}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "nivo" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default CaseResponseLine;
