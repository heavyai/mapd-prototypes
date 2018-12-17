const ChartManager = function() {
  let chart = null;

  function init(element) {
    chart = mapd3.Chart(element).setConfig({
      width: 800,
      height: 400,
      margin: {
        top: 20,
        right: 10,
        bottom: 40,
        left: 100
      },
      keyType: "time",
      chartType: "line",
      height: 100,
      legendIsEnabled: false,
      brushIsEnabled: true,
      tooltipIsEnabled: false
    });

    return this;
  }

  function setConfig(config) {
    chart.setConfig(config);
    return this;
  }

  function setData(data) {
    chart.setData(data);
    return this;
  }

  function render() {
    return this;
  }

  function onBrush(cb) {
    chart.getEvents().onBrush("brushMove", cb);
    return this;
  }

  function onBrushEnd(cb) {
    chart.getEvents().onBrush("brushEnd", cb);
    return this;
  }

  return {
    init,
    setConfig,
    setData,
    render,
    onBrush,
    onBrushEnd
  };
};
