import { app_locale, barCharts, domain_url, G, makeAjaxDataTable } from '@orians/utils';
import moment from 'moment';
import 'moment/dist/locale/bn';
$(document).ready(function () {
    const lang = G.pageLang;
    const { chart } = lang;
    moment.updateLocale(app_locale, ['bn', 'en']);
    barCharts({
        element: 'chart',
        type: 'column',
        title: chart.title + ' ' + moment().format('MMMM Do, YYYY'),
        subtitle: `<a href="${domain_url}">www.lensasia.net</a>`,
        xAxisTitle: chart.x_title,
        yAxisTitle: chart.y_title,
        xAxisType: 'category',
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

