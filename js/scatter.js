// js/scatter.js
d3.csv("data/Ex5_TV_energy.csv", d => ({
    brand: d.brand,
    tech: d.screen_tech,
    size: +d.screensize,
    energy: +d.energy_consumpt,
    star: +d.star2
})).then(data => {
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const svg = d3.select("#scatter-container")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.star))
        .range([0, width])
        .nice();

    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.energy))
        .range([height, 0])
        .nice();

    const color = d3.scaleOrdinal()
        .domain([...new Set(data.map(d => d.tech))])
        .range(d3.schemeSet2);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif")
        .text("Star Rating");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -45)
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif")
        .text("Energy Consumption (kWh/year)");

    // Points
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.star))
        .attr("cy", d => y(d.energy))
        .attr("r", 3.5)
        .attr("fill", d => color(d.tech))
        .attr("opacity", 0.85);
});
