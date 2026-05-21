// Import chart rendering functions
import { renderScatter } from './scatter-plot.js';
import { renderDonut } from './donut-chart.js';
import { renderBar55 } from './bar-chart.js';
import { renderLine } from './line-chart.js';

const basePath = 'data/';

// Load all datasets
Promise.all([
  d3.csv(basePath + 'Ex5_TV_energy.csv', d => ({
    brand: d.brand,
    screen_tech: d.screen_tech,
    screensize: +d.screensize,
    energy: +d.energy_consumpt,
    stars: +d.star2,
    count: +d.count
  })),
  d3.csv(basePath + 'Ex5_TV_energy_Allsizes_byScreenType.csv'),
  d3.csv(basePath + 'Ex5_TV_energy_55inchtv_byScreenType.csv'),
  d3.csv(basePath + 'Ex5_ARE_Spot_Prices.csv')
])
  .then(([tvData, allSizes, tv55, spot]) => {
    renderScatter(tvData.filter(d => !isNaN(d.energy) && !isNaN(d.stars)));
    renderDonut(allSizes);
    renderBar55(tv55);
    renderLine(spot);
  })
  .catch(err => console.error('Error loading data:', err));
