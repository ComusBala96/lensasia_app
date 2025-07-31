import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, jodit, makeAjaxDataTable, multi_select } from '@orians/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    multi_select({
        element: 'keywords',
        tags: true,
        placeholder: placeholder?.keywords,
    });
    const editor = jodit({
        element: 'page_content',
        height: 500,
        placeholder: placeholder?.content,
    });

    if ($('#frmCreatePage').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
            },
            description: {
                required: true,
            },
            content: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmCreatePage',
            validation: true,
            script: 'admin/navigation/page/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    $('#keywords').val([]).trigger('change');
                    editor.value = '';
                    editor.synchronizeValues();
                    editor.setEditorValue('');
                    editor.events.fire('change');
                }
            },
        });
    }
    if ($('#frmUpdatePage').length > 0) {
        let rules = {
            title: {
                required: true,
                maxlength: 253,
            },
            description: {
                required: true,
            },
            content: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdatePage',
            validation: true,
            script: 'admin/navigation/page/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtPage').length > 0) {
        const { table } = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: null,
                title: table?.col?.serial,
                render: function (data, type, row) {
                    return `<input type="number" value="${data.serial}" class="pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm serial z-999">
                                <input type="hidden" value="${data.id}" class="ids">`;
                }
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
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/navigation/page/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtPage', {
            select: true,
            url: 'admin/navigation/page/list',
            columns: col_draft,
            pdf: [0, 2, 3, 5, 6],
        });
    }
});

window.dtPage = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllPage',
        script: 'admin/navigation/page/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllPage',
        script: 'admin/navigation/page/updateRow',
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
                }
            ]
        },
        api,
        afterSuccess: {
            type: 'inflate_response_data'
        }
    });
    downloadPdf({ ...op, btn: 'downloadPagePdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadPageExcel', dataTable: 'yes' });
};