//Set up dimensions and margins
const margin = {top: 40, right: 30, bottom: 50, left: 70};
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

//Color of the bars and background
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

//Set up scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const filters_screen = [
    {id: "all", label: "All", isActive: true},
    {id: "LED", label: "LED", isActive: false},
    {id: "OLED", label: "OLED", isActive: false},
    {id: "QLED", label: "QLED", isActive: false}
];

const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(d3.range(0, 1801, 200));