import { downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';

$(document).ready(function () {
    
    if ($('#dtPageSeo').length > 0) {
        console.log($('#seo_type').val());
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'title',
                title: table?.col?.title,
            },
            {
                data: 'description',
                title: table?.col?.description,
            },
            {
                data: 'keywords',
                title: table?.col?.keywords,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
        ];
        makeAjaxDataTable('dtPageSeo', {
            select: false,
            url: 'admin/seo/show/' + $('#seo_type').val() + '/list',
            columns: col_draft,
            pdf: [0, 1, 2, 3],
        });
    }
});

window.dtPageSeo = (table, api, op) => {
    downloadPdf({ ...op, btn: 'downloadPageSeoPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadPageSeoExcel', dataTable: 'yes' });
};