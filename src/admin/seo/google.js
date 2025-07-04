import {  barCharts, domain_url } from '@oriansoft/utils';
    
$(document).ready(function () {
    barCharts({
        element: 'analytics',
        type: 'column',
        title: 'Most Visited Pages (Last 30 Days)',
        subtitle: `<a href="${domain_url}">www.lensasia.net</a>`,
        xAxisTitle: 'Website Page Views',
        xAxisType: 'category',
        yAxisTitle: 'Maximum Views',
        series: [
            {
                name: 'Views',
                colorByPoint: true,
                data: $('#analytics').data('analytics') ?? [],
            }
        ],
    });
});