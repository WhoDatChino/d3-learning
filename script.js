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

function render() {
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
render();
