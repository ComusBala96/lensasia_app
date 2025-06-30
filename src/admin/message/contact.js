import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, jodit, makeAjaxDataTable, summer_note } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmReplayContactMessage').length > 0) {
        const lang = G.pageLang;
        const { placeholder } = lang;
        let editor = jodit({
            element: 'replay_note',
            height: 350,
            placeholder: placeholder?.message,
        });
        $('#load').on('change', function () {
            editor.value = '';
            let message = $(this).val();
            if (message) {
                editor.selection.insertHTML(message);
            }
        });
        let rules = {
            replay: {
                required: true,
            },
            attachment: {
                required: false,
            },
            message_to: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmReplayContactMessage',
            validation: true,
            script: 'admin/message/contact/replay',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    editor.value = '';
                    editor.synchronizeValues();
                    editor.setEditorValue('');
                    editor.events.fire('change');
                }
            },
        });
    }
    if ($('#dtContactMessages').length > 0) {
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
            {
                data: null,
                title: table?.col?.action,                
                render: function (data, type, row) {
                    return `<a href="${domain_url}admin/message/contact/view/${data.uuid}"><span class="px-2 py-1 rounded-md shadow-md text-white" style="background-color:#2edcdc;">Replay</span></a>`;
                },
            },
        ];;
        const role = $('#role').val();
        let pdf = [0, 1, 2, 3,];
        if (role == 'Lensasia') {
            pdf = [0, 1, 2, 3, 4, 5];
            let new_col_draft = [
                {
                    data: 'email',
                    title: table?.col?.email,
                },
                {
                    data: 'phone',
                    title: table?.col?.phone,
                },
            ];
            col_draft.splice(2, 0, ...new_col_draft);
        }
        makeAjaxDataTable('dtContactMessages', {
            select: true,
            url: 'admin/message/contact/list',
            body: { type: $('#list_type').val() ?? '' },
            columns: col_draft,
            pdf: pdf,
        });
    }
});

window.dtContactMessages = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllContactMessage',
        script: 'admin/message/contact/delete',
        confirm: true,
        api,
    });
    downloadPdf({ ...op, btn: 'downloadContactMessagesPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadContactMessagesExcel', dataTable: 'yes' });
};