import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, jodit, makeAjaxDataTable, summer_note } from '@oriansoft/utils';

$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    const editor= jodit({
        element: 'mail_template_note',
        height: 500,
        placeholder: placeholder?.message,
    });
    if ($('#frmCreateMailTemplate').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
            subject: {
                required: true,
                maxlength: 253,
            },
            message: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmCreateMailTemplate',
            validation: true,
            script: 'admin/mailbox/template/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad:()=>{
                    editor.value = '';
                    editor.synchronizeValues();
                    editor.setEditorValue('');
                    editor.events.fire('change');
                }
            },
        });
    }
    if ($('#frmUpdateMailTemplate').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253,
            },
            subject: {
                required: true,
                maxlength: 253,
            },
            message: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateMailTemplate',
            validation: true,
            script: 'admin/mailbox/template/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }

    if ($('#dtMailTemplate').length > 0) {
        const lang = G.pageLang;
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
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/mailbox/template/edit/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtMailTemplate', {
            select: true,
            url: 'admin/mailbox/template/list',
            columns: col_draft,
            pdf: [0, 2, 3],
        });
    }
});

window.dtMailTemplate = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllMailTemplate',
        script: 'admin/mailbox/template/delete',
        confirm: true,
        api,
    });
    G.updateAll({
        element: 'updateAllMailTemplate',
        script: 'admin/mailbox/template/updateRow',
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
    downloadPdf({ ...op, btn: 'downloadMailTemplatePdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadMailTemplateExcel', dataTable: 'yes' });
};