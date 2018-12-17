// Instantiate all components
//////////////////////////////////////
const chartManager1 = ChartManager();
const chartManager2 = ChartManager();
const dataManager1 = DataManager();
const dataManager2 = DataManager();
const dataAdapter = DataAdapter();
const eventManager = EventManager();

// Initialize chart managers
//////////////////////////////////////
const chart1 = chartManager1
  .init("#chart1")
  .onBrush(event => eventManager.emit("brush1", event))
  .onBrushEnd(event => eventManager.emit("brushEnd1", event));

const chart2 = chartManager2
  .init("#chart2")
  .setConfig({
    brushIsEnabled: false,
    height: 600
  });

// Initialize data managers
//////////////////////////////////////
const queryInfo = {
  measure: "arr_timestamp",
  binType: "day",
  table: "flights_donotmodify",
  extent: ["2008-01-01 00:57:00", "2009-01-01 18:27:00"]
};
dataManager1.getData(queryInfo).then(data => {
  const chartData = dataAdapter.convert(data);
  chart1.setData(chartData);
  chart2.setData(chartData);
});

function fetchDataThrottled(extent) {
  fetchData(extent, {isThrottled: true})
}

function fetchData(extent, options) {
  const filterQueryInfo = {
    measure: "arr_timestamp",
    binType: "auto",
    table: "flights_donotmodify",
    extent: [extent[0].toISOString(), extent[1].toISOString()]
  };
  dataManager2.getData(filterQueryInfo, options).then(data => {
    if (data) {
      const chartData = dataAdapter.convert(data);
      chart2.setData(chartData);
    }
  })
}

// Initialize event managers
//////////////////////////////////////
eventManager
  .on("brush1", fetchDataThrottled)
  .on("brushEnd1", fetchData);
