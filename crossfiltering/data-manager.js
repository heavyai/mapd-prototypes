const DataManager = function() {
  let dataConnector = null;
  let isFetching = false;
  let isConnecting = false;
  let dataCache = null;
  let binTypes = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "quarter",
    "year",
    "decade"
  ];
  let autoBinTypeIndex = 3;
  const mapdConnector = new MapdCon();

  function connect() {
    return mapdConnector
      .protocol("https")
      .host("metis.mapd.com")
      .port("443")
      .dbName("mapd")
      .user("mapd")
      .password("HyperInteractive")
      .connectAsync();
  }

  function buildQuery(queryInfo) {
    const binType = queryInfo.binType === "auto" ? selectBinType() : queryInfo.binType;
    console.log("binType", binType)
    return `SELECT date_trunc(${binType}, ${queryInfo.measure}) as key0,
      count(*) as val
      FROM ${queryInfo.table}
      WHERE (CAST(${queryInfo.measure} AS TIMESTAMP(0))
      BETWEEN TIMESTAMP(0) '${queryInfo.extent[0]}' AND TIMESTAMP(0) '${queryInfo.extent[1]}')
      GROUP BY key0
      ORDER BY key0`;
  }

  async function getData(queryInfo, options) {
    if (isFetching && options && options.isThrottled) {
      return Promise.resolve(null)
    } else {
      isFetching = true
      if (!dataConnector) {
      dataConnector = await connect();
      }
      const query = buildQuery(queryInfo);
      const promise = new Promise((resolve, reject) => {
        dataConnector.queryAsync(query).then(data => {
          dataCache = data;
          isFetching = false
          resolve(data);
        });
      });
      return promise;
    }
  }

  function getFilteredData(extent) {
    // TODO: use cached data or refetch
    return mapd3._Utils.filterByDate(dataCache, extent);
  }

  function selectBinType() {
    if (dataCache) {
      const MAX_NUM_BINS = 1000;
      const MIN_NUM_BINS = 40;
      if (dataCache.length > MAX_NUM_BINS) {
        autoBinTypeIndex++;
      } else if (dataCache.length < MIN_NUM_BINS) {
        autoBinTypeIndex--;
      }
    }
    return binTypes[autoBinTypeIndex];
  }

  return {
    getData,
    getFilteredData
  };
};
