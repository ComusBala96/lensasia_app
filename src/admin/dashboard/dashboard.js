import { barCharts, domain_url, G, makeAjaxDataTable } from '@orians/utils';
import moment from 'moment';

$(document).ready(function () {
    barCharts({
        element: 'chart',
        type: 'column',
        title: 'Lens Asia News Posts Analysis upto Date, ' + moment().format('MMMM Do, YYYY'),
        subtitle: `<a href="${domain_url}">www.lensasia.net</a>`,
        xAxisTitle: 'News Post Analysis',
        xAxisType: 'category',
        yAxisTitle: 'Maximum Posts',
        series: [
            {
                name: 'Posts',
                colorByPoint: true,
                data: $('#chart').data('chart') ?? [],
            }
        ],
    });
    if ($('#dtDashboardMessage').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: 'name',
                title: table?.col?.name,
            },
            {
                data: 'subject',
                title: table?.col?.subject,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
        ];
        makeAjaxDataTable('dtDashboardMessage', {
            select: false,
            searching: false,
            paging: false,
            info: false,
            url: 'admin/dashboard/message/list',
            columns: col_draft,
            pdf: [],
        });
    }
});

