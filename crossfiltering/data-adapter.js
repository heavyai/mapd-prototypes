const DataAdapter = function() {
  function convert(data) {
    return {
      series: [
        {
          label: "Series 1",
          id: 0,
          group: 0,
          values: data.map(d => ({ x: d.key0, y: d.val })).reverse()
        }
      ]
    };
  }

  return {
    convert
  };
};
