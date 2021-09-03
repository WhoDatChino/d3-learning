"use strict";

let dataArr = [];

async function getData() {
  const req = await fetch(
    `https://pkgstore.datahub.io/opendatafortaxjustice/eucountrydatawb/eucountrydatawb_json/data/2a7da1604df9e5cb387bd807249ac03e/eucountrydatawb_json.json`
  );

  const data = await req.json();

  //   console.log(data);
  data.forEach((d) => {
    const country = {
      gdp: d["GDP in $Billions"] * 1000000000,
      gdpPerCap: d["GDP per cap"],
      country: d.jurisdiction,
      population: d["population in millions"] * 1000000,
    };
    dataArr.push(country);
  });

  dataArr = dataArr.sort((a, b) => {
    return b.gdpPerCap - a.gdpPerCap;
  });
}
// getData();

async function d3Operations() {
  await getData();

  //   dataArr = dataArr.sort((a, b) => {
  //     return b.gdpPerCap - a.gdpPerCap;
  //   });

  console.log(dataArr);

  //   d3.select("body")
  //     .selectAll("p")
  //     .data(dataArr)
  //     .enter()
  //     .append("p")
  //     .text("Hello everyone");

  /*
  // Creating simple bar chart w/ api data - Horizontal
  const svgWidth = 1200,
    svgHeight = 1000,
    barPadding = 5;
  const barWidth = +(svgHeight / dataArr.length) - barPadding;
  console.log(barWidth);

  const svg = d3
    .select("svg")
    .attr("height", svgHeight) //=> these 2 lines dont need to be done if a width and height already set in the svg element in html
    .attr("width", svgWidth)
    .style("background-color", "lightgrey");

  const barChart = svg
    .selectAll("rect")
    .data(dataArr)
    .enter()
    .append("rect")
    .attr("y", function (d, i) {
      return i * (barWidth + barPadding);
    })
    .attr("x", 0)
    .attr("height", barWidth)
    .attr("width", function (d) {
      return d.gdpPerCap / 90;
    })
    .attr("fill", function (d) {
      return `rgba(${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},1)`;
    });

  const text = svg
    .selectAll("text")
    .data(dataArr)
    .enter()
    .append("text")
    .text((d, i) => d.country)
    .attr("y", function (d, i) {
      return i * (barWidth + barPadding) + barWidth / 1.5;
    })
    .attr("x", "10")
    .attr("fill", "white");
*/

  // /////////////////////////////////////////////////////////////////////////////
  // ///////////////// BAR CHART

  // Creating simple bar chart - Vertical
  const svgWidth = 1200,
    svgHeight = 1000,
    barPadding = 5;
  const barWidth = +(svgWidth / dataArr.length);
  console.log(barWidth);

  const svg = d3
    .select("svg")
    .attr("height", svgHeight) //=> these 2 lines dont need to be done if a width and height already set in the svg element in html
    .attr("width", svgWidth)
    .style("background-color", "lightgrey");

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataArr, function (d) {
        return d.gdp;
      }),
    ])
    .range([0, svgHeight - barWidth]);

  const barChart = svg
    .selectAll("rect")
    .data(dataArr)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return svgHeight - yScale(d.gdp);
    })
    .attr("height", function (d) {
      return yScale(d.gdp);
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
      const trans = [barWidth * i, 0];
      return `translate(${trans[0]},0)`;
    })
    .attr("fill", function (d) {
      return `rgba(${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},1)`;
    });

  const text = svg
    .selectAll("text")
    .data(dataArr)
    .enter()
    .append("text")
    .text((d, i) => d.country)
    .attr("y", function (d, i) {
      return svgHeight - yScale(d.gdp);
    })
    .attr("x", function (d, i) {
      return barWidth * i;
    })
    .attr("fill", "black");
}
// d3Operations();

// ////////////////////
// Selectors
/*
d3.select("h1")
  .style("color", "turquoise")
  .attr("id", "heading")
  .text("Learning D3");

d3.select("body").append("p").text("This is p tag 1");
d3.select("body").append("p").text("This is p tag 2");
d3.select("body").append("p").text("This is p tag 3");

d3.selectAll("p").style("color", "green").style("font-size", "22px");

const arr = ["20", "3"];
// console.log(d3.sum(arr));

// console.log(d3);

// /////////////////
// Creating label x and y axis
const newArr = [50, 100, 23, 10, 66, 199, 111, 77, 23, 81, 42, 129, 160, 5];

const svgWidth = 500,
  svgHeight = 300;

const svg = d3.select("svg").attr("width", svgWidth).attr("height", svgHeight);

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(newArr)])
  .range([0, svgWidth]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(newArr)])
  .range([svgHeight, 0]);

const x_axis = d3.axisBottom().scale(xScale);
const y_axis = d3.axisLeft().scale(yScale);

svg.append("g").attr("transform", "translate(50,-20)").call(y_axis);

const xAxisTranslate = svgHeight - 20;

svg
  .append("g")
  .attr("transform", `translate(50,${xAxisTranslate})`)
  .call(x_axis);


// /////////////////
// Creating animated bars - change length attribute over a period of time
const svg = d3
  .select("svg")
  .attr("height", 500)
  .attr("width", 300)
  .style("background-color", "lightgrey");

const bar1 = svg
  .append("rect")
  .attr("x", 100)
  .attr("y", 20)
  .attr("fill", "blue")
  .attr("height", 20)
  .attr("width", 10);

const bar2 = svg
  .append("rect")
  .attr("x", 120)
  .attr("y", 20)
  .attr("fill", "blue")
  .attr("height", 20)
  .attr("width", 10);

animate();

function animate() {
  bar1.transition().ease(d3.easeLinear).duration(2000).attr("height", 200);

  bar2
    .transition()
    .ease(d3.easeBounce)
    .delay(2000)
    .duration(2000)
    .attr("height", 200);
}

const newArr = [50, 100, 23, 10, 66, 199, 111, 77, 23, 81, 42, 129, 160, 5];

const scaleU = d3.scaleLinear().domain(d3.extent(newArr)).range([50, 500]);

console.log(`hi`, scaleU(100));
*/

// /////////////////
// PUTTING IT ALL TOGETHER

// import{select, csv, scaleLinear, scaleBand, max, axisLeft, axisbottom, format} from 'd3'

async function fullChart() {
  await getData();

  const svg = d3.select("svg");

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  // Creating rectangles for each data point. Takes in the data and creates a rectangle. Is a function
  const render = (arr) => {
    // VALUE ACCESSORS - values to be used from data as the x&y axes
    const xValue = (d) => d.gdpPerCap;
    const yValue = (d) => d.country;

    // MARGINS - need to be constantly re-adjusted so that you can fit in labels and axes as you build
    const margin = {
      top: 35,
      left: 150,
      right: 30,
      bottom: 100,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    // console.log(innerWidth, innerHeight);

    // SCALES
    const scaleX = d3
      .scaleLinear()
      .domain([0, d3.max(arr, (d) => xValue(d))])
      .range([0, innerWidth]); // Max width of bar is max width of the svg container

    // y-axis divided equally for the given domain
    const scaleY = d3
      .scaleBand() // band scale cz we are using ordinal values (country names)
      .domain(arr.map((d) => yValue(d))) // Looping the data to retrieve the country names as an array
      .range([0, innerHeight])
      .padding(0.1); // Adds padding btw bars

    // AXES
    const yAxis = d3.axisLeft().scale(scaleY);

    // Custom number formatter
    const xAxisFormat = (num) => d3.format(".2s")(num).replace("G", "B");
    const xAxis = d3.axisBottom(scaleX).tickFormat(xAxisFormat); // customizing the formatting of the numbers

    // APPENDING RECT'S FOR EACH DATA POINT
    const g = svg
      .append("g") // rect's will be appended to this group so that we can add margin to the group as a whole
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .call(yAxis) // => shorthand for below line. Essentially calling a function (yAxis) on a selection (the appended g)
      .selectAll(".domain, .tick line") // Custom y-axis with no lines
      .remove();
    // Or you can display the axis like: yAxis(g.append('g')) => here you are calling a function and passing in a selection

    // Creating a variable to the x axis cz we do a lot of operations on it so it makes it easier to work with
    const xAxisGroup = g
      .append("g")
      .call(xAxis) // The axis appears on the top of the svg therefore you need to translate its group element
      .attr("transform", `translate(0,${innerHeight})`);

    xAxisGroup
      .append("text")
      .text("GDP per capita ($)")
      .attr("fill", "black")
      .attr("x", innerWidth / 2)
      .attr("y", 70);

    xAxisGroup.selectAll(".tick line").attr("y2", -innerHeight);

    g.selectAll("rect")
      .data(arr)
      .enter()
      .append("rect")
      .attr("y", (d) => scaleY(yValue(d)))
      .attr("width", (d) => scaleX(xValue(d)))
      .attr("height", (d) => scaleY.bandwidth()) // bandwidth is width of single bar. Ea bar has a width equal to return value of scaleY (all same height)
      .attr("fill", function (d) {
        return d3.interpolateYlGnBu(
          xValue(d) / d3.max(arr, (d) => xValue(d) * 1.1)
        );
      });
    // console.log(d3.max(arr));

    // LABELS FOR AXES

    g.append("text")
      .attr("y", -10)
      .text(`GDP of Europe`)
      .attr("textLength", "30%")
      .attr("x", (innerWidth / 9) * 3)
      .style("font-size", "32px");
    // .attr("dominant-baseline", "central");
  };

  render(dataArr);
}

fullChart();

// ///////////////////////
// Scatter plot
// let covidArr = [];
import { covidData } from "./data/covidData (1).js";

// console.log(covidData);
// const cleanedData = covidData.map((data) => {
//   const temp = data.date;

//   return {
//     dateNew: new Date(temp),
//     ...data,
//   };
// });
// console.log(cleanedData);

const population = {
  population: 59308690,
  population_male: 29216012,
  population_female: 30092678,
  population_rural: 19408553,
  population_urban: 39149717,
  population_age_00_09: 11585605,
  population_age_10_19: 10409174,
  population_age_20_29: 10141489,
  population_age_30_39: 10155325,
  population_age_40_49: 7043275,
  population_age_50_59: 4911532,
  population_age_60_69: 3164441,
  population_age_70_79: 1476055,
  population_age_80_and_older: 421794,
};

// /////////////////////////////////////////////////////////////////////////////
// ///////////////// SCATTER PLOT
function renderScatterPlot() {
  const svg = d3.select(".scatter-plot");

  // Value selectors
  const xValue = (d) => d.date;
  const yValue = (d) => d.new_deceased;

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  const margin = {
    top: 70,
    left: 70,
    right: 50,
    bottom: 100,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const radius = 3;

  // const parseTime = d3.timeFormat("%B %d, %Y"); // Function to format Dates

  const dates = [];
  for (let obj of covidData) {
    dates.push(new Date(obj.date));
  }
  // console.log(dates);

  // SCALES
  const xScale = d3.scaleTime().domain(d3.extent(dates)).range([0, innerWidth]);
  // .nice();

  const xAxis = d3.axisBottom(xScale).ticks(18).tickPadding(10);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(covidData, (d) => yValue(d)))
    .range([innerHeight, 0])
    .nice();

  const yAxis = d3.axisLeft().scale(yScale).ticks(25);

  // yAxis.selectAll(".tick").attr("y2", innerWidth);

  // console.log(yScale);

  // Group element containing contents of svg
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Creating the circles
  const circles = g
    .append("g")
    .selectAll("circle")
    .data(covidData)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(new Date(xValue(d))))
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("r", radius)
    .attr("fill", function (d, i, arr) {
      if (xValue(d)) {
        return d3.interpolateWarm(
          yValue(d) / d3.max(covidData, (d) => yValue(d))
        );
      }
    });

  // Tick customization is added where the axes are called
  const yAxisGroup = g.append("g").call(yAxis);
  // Make grid lines
  yAxisGroup.selectAll(".tick line").attr("x2", innerWidth);

  // .attr("transform", "translate(50 , 0)");

  const xAxisGroup = g
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxis);

  xAxisGroup.selectAll(".tick line").attr("y2", 10);

  // AXES LABELS

  // Y axis
  yAxisGroup
    .append("text")
    .attr("fill", "black") // NOTE: Originally appended in white for whatever reason
    .attr("y", -40)
    .attr("x", -innerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.5rem")
    .attr("transform", "rotate(-90)")
    .text(`Number of Deaths`);

  // X Axis
  xAxisGroup
    .append("text")
    .attr("fill", "black")
    .attr("x", innerWidth / 2)
    .attr("font-size", "1.5rem")
    .attr("text-anchor", "middle")
    .attr("y", 60)
    .text(`Time`);

  // Heading
  svg
    .append("text")
    .attr("fill", "black")
    .text(`Deaths in RSA from Covid Per Day`)
    .attr("font-size", "2rem")
    .attr("x", width / 2)
    .attr("text-anchor", "middle") // Done so that text is aligned exactly in the middle
    .attr("y", 50);

  // Total
  svg
    .append("text")
    .attr("fill", "black")
    .text(
      `Total Deaths : ${covidData.reduce(
        (acc, day) => (acc += day.new_deceased),
        0
      )}`
    )
    .attr("x", width)
    .attr("y", 100)
    .attr("text-anchor", "end");
}
renderScatterPlot();

// /////////////////////////////////////////////////////////////////////////////
// ///////////////// LINE AND BOX CHART
function renderLineChart() {
  const svg = d3.select(".line-chart");

  // Value selectors
  const xValue = (d) => d.date;
  const yValue = (d) => d.new_confirmed;

  // console.log(xValue(covidData[0]));

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  const margin = {
    top: 70,
    left: 100,
    right: 50,
    bottom: 80,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const numberFormat = (num) => d3.format(".4s")(num);

  const dates = [];
  for (let obj of covidData) {
    dates.push(new Date(obj.date));
  }
  // console.log(dates);

  // SCALES
  const xScale = d3.scaleTime().domain(d3.extent(dates)).range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(covidData, (d) => yValue(d)))
    .range([innerHeight, 0]);

  const xAxis = d3.axisBottom(xScale).ticks(18).tickPadding(10);

  const yAxis = d3.axisLeft().scale(yScale).ticks(20);

  // APPENDING CONTENTS
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // For line charts you dont have to do a data bind as you are only making a single path where the data points are the points you want that single line to pass through - need to make use of d3.line()

  const lineGenerator = d3
    .line()
    .x((d) => xScale(new Date(xValue(d)))) // NOTE: HAVE to convert to date object - using a string throws error
    .y((d) => yScale(yValue(d)))
    .curve(d3.curveBasis); // Rounds the edges so theyre not a jagged. Many other options to chose from

  // CREATING CUSTOM GRADIENT - one of many ways to do this
  // SVG gradients created w/ <lineargradient> which contains <stop> tags inside it which define at which point the colours begin and what the colour is
  g.append("linearGradient")
    .attr("id", "line-gradient") // ID needed so that the gradient can be attached to an element
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", yScale(0))
    .attr("x2", 0)
    .attr("y2", yScale(d3.max(covidData, (d) => yValue(d))))
    .selectAll("stop")
    .data([
      { offset: "0%", color: "#1780A1" },
      { offset: "10%", color: "#2E6F95" },
      { offset: "20%", color: "#455E89" },
      { offset: "30%", color: "#5C4D7D" },
      { offset: "40%", color: "#723C70" },
      { offset: "50%", color: "#892B64" },
      { offset: "60%", color: "#A01A58" },
      { offset: "70%", color: "#B7094C" },
    ])
    .enter()
    .append("stop")
    .attr("offset", function (d) {
      return d.offset;
    })
    .attr("stop-color", function (d) {
      return d.color;
    });

  // console.log(lineGenerator(covidData));

  // CREATING RECTS IN THE BACKGROUND
  g.selectAll("rect")
    .data(covidData)
    .enter()
    .append("rect")
    // .attr("x", (d) => xScale(xValue(d)))
    .attr("y", (d) => yScale(yValue(d)))
    .attr("height", (d) => innerHeight - yScale(yValue(d)))
    .attr("width", innerWidth / covidData.length)
    .attr(
      "transform",
      (d, i) => `translate(${(innerWidth / covidData.length) * i},0)`
    )
    .attr("fill", "rgba(211, 211, 211, 0.678)");

  // CREATING PATH
  g.append("path")
    .attr("d", lineGenerator(covidData))
    .attr("stroke", "url(#line-gradient)") // ID of custom gradient
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round") // Smoothes the joints
    .attr("fill", "none");
  // AXES & LABELS

  // Tick customization is added where the axes are called
  const yAxisGroup = g.append("g").call(yAxis);
  // Make grid lines
  yAxisGroup.selectAll(".tick line").attr("x2", innerWidth);

  const xAxisGroup = g
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxis);

  xAxisGroup.selectAll(".tick line").attr("y2", 10);

  // Y axis
  yAxisGroup
    .append("text")
    .attr("fill", "black") // NOTE: Originally appended in white for whatever reason
    .attr("y", -55)
    .attr("x", -innerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.5rem")
    .attr("transform", "rotate(-90)")
    .text(`Number of Cases`);

  // X Axis
  xAxisGroup
    .append("text")
    .attr("fill", "black")
    .attr("x", innerWidth / 2)
    .attr("font-size", "1.5rem")
    .attr("text-anchor", "middle")
    .attr("y", 60)
    .text(`Time`);

  // Heading
  svg
    .append("text")
    .attr("fill", "black")
    .text(`Covid Cases Per Day in RSA`)
    .attr("font-size", "2rem")
    .attr("x", width / 2)
    .attr("text-anchor", "middle") // Done so that text is aligned exactly in the middle
    .attr("y", 50);

  // Total
  svg
    .append("text")
    .attr("fill", "black")
    .text(
      `Total Cases : ${numberFormat(
        covidData.reduce((acc, day) => (acc += yValue(day)), 0)
      )}`
    )
    .attr("x", width)
    .attr("y", 100)
    .attr("text-anchor", "end");
}
renderLineChart();

// /////////////////////////////////////////////////////////////////////////////
// ///////////////// AREA CHART

import { worldPopArr } from "./data/worldPop.js";

function renderAreaChart() {
  const svg = d3.select(".area-chart");

  // Value selectors
  const xValue = (d) => d.Year;
  const yValue = (d) => d.Population;

  // console.log(xValue(covidData[0]));

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  const margin = {
    top: 70,
    left: 100,
    right: 50,
    bottom: 80,
  };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const numberFormat = (num) => d3.format(".3s")(num).replace("G", "B");

  // console.log(numberFormat(worldPopArr[50].Population));
  // SCALES
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(worldPopArr, (d) => new Date(xValue(d).toString())))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(worldPopArr, (d) => yValue(d))])
    .range([innerHeight, 0])
    .nice(); // NICE NOT NEAT

  const xAxis = d3.axisBottom(xScale).ticks(15).tickPadding(10);

  const yAxis = d3.axisLeft().scale(yScale).ticks(20).tickFormat(numberFormat);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // AREA CHART - line chart (path) with the area underneath filled in. Requires diff. d3 method and additional attributes

  const area = d3
    .area()
    // .curve(curve)
    .x((d) => xScale(new Date(xValue(d).toString())))
    .y0(innerHeight) // Additional attr when compared to line chart
    .y1((d) => yScale(yValue(d)));

  g.append("path").datum(worldPopArr).attr("fill", "steelblue").attr("d", area);

  // AXES
  // Y-axis
  const yAxisGroup = g.append("g").call(yAxis);

  yAxisGroup.selectAll(".tick line").attr("x2", innerWidth);

  yAxisGroup
    .append("text")
    .attr("fill", "black") // NOTE: Originally appended in white for whatever reason
    .attr("y", -55)
    .attr("x", -innerHeight / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.5rem")
    .attr("transform", "rotate(-90)")
    .text(`Population Size`);

  // X-axis

  const xAxisGroup = g
    .append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxis);

  xAxisGroup
    .append("text")
    .attr("fill", "black")
    .attr("x", innerWidth / 2)
    .attr("font-size", "1.5rem")
    .attr("text-anchor", "middle")
    .attr("y", 60)
    .text(`Time`);

  // Heading
  svg
    .append("text")
    .attr("fill", "black")
    .text(`Global Population Area Chart`)
    .attr("font-size", "2rem")
    .attr("x", width / 2)
    .attr("text-anchor", "middle") // Done so that text is aligned exactly in the middle
    .attr("y", 50);
}
renderAreaChart();

// /////////////////////////////////////////////////////////////////////////////
// ///////////////// TREEMAP

import { state, formattedArr, byCoin, platforms } from "./data/cryptoData.js";

// console.log(coins);
// platforms();

function renderTreemap() {
  const data = formattedArr;
  // console.log(formattedArr);

  const property = (d) => d.percentChange;

  const svg = d3.select("#treemap");

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  // Root for tree - Hierarchy and summation of leaves
  const root = d3
    .hierarchy(data)
    .sum((d) => Math.abs(d.value))
    .sort((a, b) => d3.descending(b.value, a.value)); // Best to do big to small

  // Create treemap logic -> gives each of the nodes an x0,x1,y0,y1
  const tree = d3.treemap().size([width, height]).padding(6).paddingInner(10)(
    root
  );

  // console.log(`root`, root);

  // Create groups for tree leaves - contains everything that goes inside each leaf
  const leaf = svg
    .selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`)
    .attr("id", (d) => d.data.id);

  // Creating the rectangles
  leaf
    .append("rect")

    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) =>
      d.data.value > 0 ? "rgba(30, 243, 136,0.1)" : "rgba(209, 25, 71,0.1)"
    )
    .attr("stroke", (d) =>
      d.data.value > 0 ? "rgba(30, 243, 136,1)" : "rgba(209, 25, 71,1)"
    )
    .attr("stroke-width", 3);

  // Creating leaf headings
  // const leafInfo = leaf.append("g");
  // console.log(`jvhvhjv`, rect.attr("width"));

  const boxInfo = svg
    .selectAll(".info")
    .data(root.leaves())
    .join("g")
    .style("font-size", 25);

  boxInfo
    .append("text")
    .text((d) => d.data.name)
    .attr("x", (d) => (d.x1 - d.x0) / 2 + d.x0)
    .attr("y", (d) => (d.y1 - d.y0) / 2 + d.y0 + 10)
    .attr("text-anchor", "middle")
    .attr("fill", "black");
  // boxInfo
  //   .append("text")
  //   .text((d) => d.data.date)
  //   .attr("x", (d) => (d.x1 - d.x0) / 2 + d.x0)
  //   .attr("y", (d) => (d.y1 - d.y0) / 2 + d.y0 + 12)
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "black");
  // boxInfo
  //   .append("text")
  //   .text((d) =>
  //     d.data.value > 0
  //       ? `+${d.data.value.toFixed(2)}%`
  //       : `${d.data.value.toFixed(2)}%`
  //   )
  //   .attr("x", (d) => (d.x1 - d.x0) / 2 + d.x0)
  //   .attr("y", (d) => (d.y1 - d.y0) / 2 + d.y0 + 38)
  //   .attr("text-anchor", "middle")
  //   .attr("fill", "black");

  // console.log(d.x1);

  /*
  const root = d3
    .hierarchy(data)
    .sum(function (d) {
      return Math.abs(d.value);
    })
    .sort((a, b) => a.value - b.value); // Here the size of each leave is given in the 'value' field in input data

  // const tile = d3.treemapBinary()();
  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap().size([width, height]).round(true).padding(5).paddingInner(10)(
    root
  );

  console.log(`rrr  `, root);
  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("x", function (d) {
      return d.x0;
    })
    .attr("y", function (d) {
      return d.y0;
    })
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .style("stroke", (d, i) =>
      d.data.value > 0 ? "rgb(30, 243, 136)" : "rgb(209, 25, 71)"
    )
    .style("stroke-width", "5px")
    .style("fill", (d, i) =>
      d.data.value > 0 ? "rgba(30, 243, 136,0.1)" : "rgba(209, 25, 71,0.1)"
    );

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
    .attr("x", function (d) {
      return (d.x0 + d.x1) / 2;
    }) // +10 to adjust position (more right)
    .attr("y", function (d) {
      return (d.y0 + d.y1) / 2;
    }) // +20 to adjust position (lower)
    .text(function (d) {
      return `${d.data.name}`;
    })
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0,6)")
    .attr("font-size", "20px")
    .attr("fill", "black");
*/
  /*
  // d3.treemap computes each position of element in hirarchy
  d3
    .treemap()
    // .nodes(root)
    // .children((d) => d.macros)
    // .value((d) => property(d))
    .size([width, height])
    .padding(2)(root);

  // Use the info generated above to create rectangles
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("fill", "lightgrey")
    .style("stroke", "rgb(30, 243, 136)");

  console.log(root.leaves());

  // Adding labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
    .attr("x", (d) => d.x0 + 5) // Moves text to the right
    .attr("y", (d) => d.y0 + 20) // Moves text to the middle
    .text((d, i) => d.name)
    .attr("font-size", "18px")
    .attr("fill", "black");
    */
}
renderTreemap();

// /////////////////////////////////////////////////////////////////////////////
// ///////////////// PIE CHART
function renderPieChart() {
  const data = [
    { number: 10, name: "Locke" },
    { number: 2, name: "Reyes" },
    { number: 6, name: "Ford" },
    { number: 16, name: "Jarrah" },
    { number: 23, name: "Shephard" },
    { number: 20, name: "Max" },
    { number: 19, name: "Esteban" },
    { number: 12, name: "Mark" },
    { number: 33, name: "Seb" },
    { number: 45, name: "Kwon" },
  ];

  const svg = d3.select("#pie-chart");

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  const margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(
      d3
        .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse()
    );

  const radius = Math.min(height, width) / 2;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg
    .append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

  //
  // const data = [5,2,3,16,46,20,13,10,2,9,14]
  // const arcs = d3.pie()(data); // Returned array in same order as input array even though pie chart sorted in descending order. Used for simple array of data
  // console.log(`pie`, arcs);

  // PIE GENERATOR - Pie Chart is made up of several segmants that each have a start and an end angle as well as a pad angle (pad angle = angular separation between each adjacent arc). data passed into d3.pie() generator which returns and object for each data point with that info calculated.
  const arcs = d3
    .pie()
    .sort(null) // Has to be specified cz .pie() automatically sorts from big to small
    // .padAngle(0.05) //-> disprortionally effects smaller sections if set as single value. Recommended: min inner radius when using padding is outerRadius * padAngle / sinθ where θ is angular span of smallest arc before padding
    .value((d) => d.number)(data); // Same as mapping over your data -> d3.pie()(data.map(d=> d.number)). pie doesnt produce shape but produces angles that are needed to be passed into an arc generator
  // can also chain .sort() & .padAngle() which is the angular separation btw each adjacent arc -> specified in radians if used with arc generator
  console.log(arcs);

  // ARC GENERATOR - produces circular sector in a pie/donut chart. Arcs centered @ 0,0 and use transform to move arc to diff position. requires 4 args/chained methods: innerRadius, outerRadius, startAngle, endAngle (default values are 0 for each)
  const arc = d3.arc().outerRadius(radius).innerRadius(0); // innerRadius is radius of inner circle if you want a donut chart
  // .cornerRadius(radius * 0.05);
  // .padAngle(0.01);

  const arcLabel = d3
    .arc()
    .innerRadius(radius * 0.8)
    .outerRadius(radius * 0.8);

  g.selectAll("path")
    .data(arcs)
    .join("path")
    .attr("stroke", "white")
    .attr("fill", color)
    .attr("d", arc);

  g.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`) // .centroid finds the mid point [x,y] of the center line of the arc generated
    .call((text) => text.append("tspan"))
    .attr("y", "-0.4em")
    .attr("font-weight", "bold")
    .text((d) => d.data.name)
    .call((text) =>
      text.filter((d) => d.endAngle - d.startAngle > 0.25).append("tspan")
    )
    .attr("x", 0)
    .attr("y", "0.7em")
    .attr("fill-opacity", 0.7)
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle");
}

renderPieChart();

// /////////////////////////////////////////////////////////////////////////////
// ///////////////// SUN BURST CHART

function renderSunBurst() {
  const data = formattedArr;
  console.log(formattedArr);

  const svg = d3.select("#sun-burst");

  const height = +svg.attr("height");
  const width = +svg.attr("width");

  const radius = Math.min(width, height) / 2;
  console.log(radius);

  const hirarchy = d3
    .hierarchy(data)
    .sum((d) => Math.abs(d.value))
    .sort((a, b) => b.value - a.value);
  console.log(`hhhh`, hirarchy);

  const root = d3.partition().size([2 * Math.PI, radius])(hirarchy);

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1);

  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, data.children.length + 1)
  );

  // const root = partition(data);

  console.log(root);

  const g = svg.append("g").attr("transform", `translate(${radius},${radius})`);

  g.append("g")
    // .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter((d) => d.depth))
    .join("path")
    .attr("fill", (d) => {
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr("d", arc);

  g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", 15)
    .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(
      root
        .descendants()
        .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
    )
    .join("text")
    .attr("transform", function (d) {
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr("dy", "0.35em")
    .text((d) => d.data.name);
}

renderSunBurst();
