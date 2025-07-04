import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@oriansoft/utils';
    
$(document).ready(function () {
    if ($('#frmCreateNewsAd').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
        };
        ajaxRequest({
            element: 'frmCreateNewsAd',
            validation: true,
            script: 'admin/advertisement/space/news/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
            },
        });
    }
    if ($('#frmUpdateNewsAd').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
        };
        ajaxRequest({
            element: 'frmUpdateNewsAd',
            validation: true,
            script: 'admin/advertisement/space/news/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
    
    if ($('#dtNewsAd').length > 0) {
        const lang = G.pageLang;
        const {table} = lang;
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
                data: 'image',
                title: table?.col?.image,
            },
            {
                data: 'name',
                title: table?.col?.name,
            },
            {
                data: 'visibility',
                title: table?.col?.visibility,
            },
            {
                data: 'sponsored',
                title: table?.col?.sponsored,
            },
            {
                data: 'created_at',
                title: table?.col?.created_at,
            },
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/advertisement/space/news/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtNewsAd', {
            select: true,
            url: 'admin/advertisement/space/news/list',
            columns: col_draft,
            pdf: [0, 3, 4, 5, 6],
        });
    }
});
    
window.dtNewsAd = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllNewsAd',
        script: 'admin/advertisement/space/news/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllNewsAd',
        script: 'admin/advertisement/space/news/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadNewsAdPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadNewsAdExcel', dataTable: 'yes' });
};