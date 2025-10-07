// js/donut.js
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => ({
    tech: d.Screen_Tech,
    meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    const size = 420;
    const radius = size / 2;

    const svg = d3.select("#donut-container")
        .append("svg")
        .attr("viewBox", `0 0 ${size} ${size}`)
        .append("g")
        .attr("transform", `translate(${radius},${radius})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.tech))
        .range(d3.schemeSet2);

    const pie = d3.pie().value(d => d.meanEnergy).sort(null);
    const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius * 0.95);

    svg.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.tech))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5);

    // Labels
    const labelArc = d3.arc().innerRadius(radius * 1.05).outerRadius(radius * 1.05);
    svg.selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif")
        .text(d => d.data.tech);
});
