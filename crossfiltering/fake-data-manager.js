const FakeDataManager = function() {
  const dataGenerator = mapd3.DataGenerator().setConfig({
    range: [0, 100],
    pointCount: 300,
    groupCount: 1,
    stringMinMaxLength: [5, 10],
    randomStepSize: 50,
    nullRatio: 0,
    keyType: "time",
    lineCount: 1,
    groupCount: 1,
    pointCount: 100
  });

  let dataCache = null;

  function fetchData() {
    dataCache = dataGenerator.generateTestDataset();
    return dataCache;
  }
  fetchData();

  function getData() {
    return dataCache;
  }

  function getFilteredData(extent) {
    return mapd3._Utils.filterByDate(getData(), extent);
  }

  return {
    getData,
    getFilteredData
  };
};