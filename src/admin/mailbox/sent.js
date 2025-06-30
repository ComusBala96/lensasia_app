import { domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';
    
$(document).ready(function () {    
    if ($('#dtSentMail').length > 0) {
        const lang = G.pageLang;
        const {table} = lang;
        let col_draft = [
            {
                data: 'id',
                title: table?.col?.id,
            },
            {
                data: 'email',
                title: table?.col?.email,
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
                    return `<a href="${domain_url}admin/mailbox/sent/view/${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtSentMail', {
            select: true,
            url: 'admin/mailbox/sent/list',
            body: { type: $('#list_type').val() ?? '' },
            columns: col_draft,
            pdf: [0, 1, 2],
        });
    }
});
    
window.dtSentMail = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllMail',
        script: 'admin/mailbox/sent/delete',
        confirm: true,
        api,
    });
    downloadPdf({ ...op, btn: 'downloadSentMailPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadSentMailExcel', dataTable: 'yes' });
};