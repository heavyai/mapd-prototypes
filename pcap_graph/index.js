const elem = document.getElementById("graph")
const graph = ForceGraph()(elem)
const width = elem.clientWidth
const height = elem.clientHeight

function enableInteraction (bool) {
  graph
    .enablePointerInteraction(bool)
    .enableNodeDrag(bool)
  if (bool) graph.resumeAnimation()
  else graph.pauseAnimation()
}

function drawGraph(_data) {
  graph
    .width(width)
    .height(height)
    .graphData(_data)
    .nodeLabel(node => node.id)
    .backgroundColor("#252525")
    .enableZoomPanInteraction(true)
    .zoom(1)
    .warmupTicks(5)
    // .cooldownTime(2000)

  window.addEventListener("resize", () => graph.width(elem.innerWidth))
  elem.addEventListener("mouseover", () => enableInteraction(true))
  elem.addEventListener("mouseout", () => enableInteraction(false))
}

fetch("top10.json")
  .then(response => response.text())
  .then((data) => {
    drawGraph(JSON.parse(data))
  })

const spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
  description: 'A simple bar chart with embedded data.',
  height: 600,
  width: 580,
  "autosize": {
    "type": "fit",
    "contains": "content"
  },
  data: {
    values: [
      {a: 'A', b: 28},
      {a: 'B', b: 55},
      {a: 'C', b: 43},
      {a: 'D', b: 91},
      {a: 'E', b: 81},
      {a: 'F', b: 53},
      {a: 'G', b: 19},
      {a: 'H', b: 87},
      {a: 'I', b: 52}
    ]
  },
  mark: 'bar',
  encoding: {
    x: {field: 'a', type: 'ordinal'},
    y: {field: 'b', type: 'quantitative'}
  }
}
vegaEmbed('#chart1', spec, {theme: 'dark'});


new MapdCon()
  .protocol("https")
  .host("kali.mapd.com")
  .port("10043")
  .dbName("mapd")
  .user("chrisv")
  .password("G*iDU89$")
  .connectAsync()
  .then(connector => {
      const query = "select * from flights limit 10"
      connector.queryAsync(query).then(d => console.log(d))
    }
  )