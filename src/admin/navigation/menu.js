import { ajaxRequest, multi_select, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orians/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    multi_select({
        element: 'keywords',
        tags: true,
        placeholder: placeholder?.keywords,
    });
    if ($('#frmCreateMenu').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
            },
            description: {
                required: true,
            },
            homepage_serial: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmCreateMenu',
            validation: true,
            script: 'admin/navigation/menu/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    $('#keywords').val([]).trigger('change');
                }
            },
        });
    }
    if ($('#frmUpdateMenu').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
            },
            description: {
                required: true,
            },
            homepage_serial: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateMenu',
            validation: true,
            script: 'admin/navigation/menu/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtMenu').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: '',
            },
            {
                data: 'serial',
                title: table?.col?.serial,
            },
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
                data: 'block',
                title: table?.col?.block,
            },
            {
                data: 'homepage_serial',
                title: table?.col?.homepage_serial,
            },
            {
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'homepage',
                title: table?.col?.homepage,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: 'action',
                title: table?.col?.action,
            },
        ];
        makeAjaxDataTable('dtMenu', {
            select: true,
            url: 'admin/navigation/menu/list',
            columns: col_draft,
            pdf: [2, 5, 7, 8, 9],
        });
    }
});

window.dtMenu = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllMenu',
        script: 'admin/navigation/menu/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllMenu',
        script: 'admin/navigation/menu/updateRow',
        confirm: true,
        dataCols: {
            key: 'ids',
            items: [
                {
                    index: 1,
                    name: 'ids',
                    type: 'input',
                    data: [],
                },
                {
                    index: 1,
                    name: 'serial',
                    type: 'input',
                    data: []
                },
                {
                    index: 6,
                    name: 'homepage_serial',
                    type: 'input',
                    data: []
                }
            ]
        },
        api,
        afterSuccess: {
            type: 'inflate_response_data'
        }
    });
    downloadPdf({ ...op, btn: 'downloadMenuPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadMenuExcel', dataTable: 'yes' });
};
