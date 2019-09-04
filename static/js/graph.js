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
    var group = dim.group();
    
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


var timeDimension = cf.dimension(function(d){ return new Date(d.Time); });
var totalGroup = timeDimension.group().reduceSum(function(d){ return d.Speed; });

var lineChart = dc.lineChart("#line-chart")
    .brushOn(false)
    .width(800)
    .height(200)
    .x(d3.time.scale().domain(d3.extent(data, function(d) {
        return new Date(d.Time);
    })))
    .dimension(timeDimension)
    .group(totalGroup);

dc.renderAll();