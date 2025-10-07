// t04-4-load.js
/* Load CSV, Convert Type, Quick Check */
d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    // Quick checks
    console.log("✅ Data loaded:", data);
    console.log("rows:", data.length);
    console.log("max:", d3.max(data, d => d.count));
    console.log("min:", d3.min(data, d => d.count));
    console.log("extent:", d3.extent(data, d => d.count));

    // Optional: sort for easier reading (descending by count)
    data.sort((a, b) => d3.descending(a.count, b.count));

    // Pass data to chart builder (T04-5)
    createBarChart(data);
});
