d3.csv("data/new data.csv", d => {
  console.log(d); 
    return {
    brand: d["Screen_Tech"],
    count: +d["Count(SoldIn)"]
  };
})

.then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  console.log(d3.extent(data, d => d.count)); //=> array with min and max
  createBarChart(data);
});

