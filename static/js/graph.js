queue()
    .defer(d3.csv, "data/uk_employment_data.csv")
    .await(makeGraphs);
    
function makeGraphs(error, employmentData) {
    var ndx = crossfilter(employmentData);
    
    show_wage_gap(ndx);
    
    dc.renderAll();
}

function show_wage_gap(ndx) {
    var dim = ndx.dimension(dc.pluck('year'));
    var group = dim.group().reduceSum(dc.pluck("gender.wage.gap"))
    
    dc.lineChart("#wage-gap")
        .width(1300)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(false)
        .xAxisLabel("Year")
        .yAxis().ticks(10);
}

