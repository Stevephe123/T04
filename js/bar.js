// js/bar.js
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => ({
    tech: d.Screen_Tech,
    meanEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
})).then(data => {
    data.sort((a, b) => d3.descending(a.meanEnergy, b.meanEnergy));

    const margin = { top: 20, right: 30, bottom: 40, left: 120 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#bar-container")
        .append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.meanEnergy)])
        .range([0, width])
        .nice();

    const y = d3.scaleBand()
        .domain(data.map(d => d.tech))
        .range([0, height])
        .padding(0.2);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("y", d => y(d.tech))
        .attr("width", d => x(d.meanEnergy))
        .attr("height", y.bandwidth())
        .attr("fill", "steelblue");

    svg.selectAll(".label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("x", d => x(d.meanEnergy) + 5)
        .attr("y", d => y(d.tech) + y.bandwidth() / 1.5)
        .style("font", "12px sans-serif")
        .text(d => d.meanEnergy.toFixed(0));
});
