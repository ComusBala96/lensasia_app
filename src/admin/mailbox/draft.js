import { ajaxRequest, createImageUrl, domain_url, downloadExcel, downloadPdf, G, jodit, makeAjaxDataTable, summer_note } from '@orian/utils';

$(document).ready(function () {
    if ($('#frmSendDraftMailToUsers').length > 0) {
        const lang = G.pageLang;
        const { placeholder } = lang;
        jodit({
            element: 'mail_template_note',
            height: 600,
            placeholder: placeholder?.message,
        });
        $('#load').on('change', function () {
            $('.mail_template_note').summernote('reset');
            $('#subject').val();
            let data = $(this).val() ? JSON.parse($(this).val()) : {};
            if (data.subject) {
                $('#subject').val(data.subject);
            }
            if (data.message) {
                $('.mail_template_note').summernote('pasteHTML', data.message);
            }
        });
        $('#attachment').on('change', function () {
            let file = this.files[0];
            if (typeof file == 'object') {
                let url = createImageUrl(file);
                var ext = file.name.split('.').pop().toLowerCase();
                if (ext == 'pdf' || ext == 'docx') {
                    $('.display_attachment').html(`<iframe src="${url}" width='200' height='120'></iframe>`);
                }
                if (ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
                    $('.display_attachment').html(`<img src="${url}" alt="${file.name}" class="h-[120px] w-[200px] object-cover">`);
                }
            } else {
                $('.display_attachment').html('');
            }
        });
        let rules = {
            email: {
                required: true,
            },
            subject: {
                required: true,
            },
            message: {
                required: true,
            },
            attachment: {
                required: false,
            },
        };
        ajaxRequest({
            element: 'frmSendDraftMailToUsers',
            validation: true,
            script: 'admin/mailbox/draft/create',
            rules,
            afterSuccess: {
                type: 'inflate_redirect_response_data',
            },
        });
    }
    if ($('#dtDraftMail').length > 0) {
        const lang = G.pageLang;
        const { table } = lang;
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
                    return `<a href="${domain_url}admin/mailbox/draft/view/${data.uuid}"><span class="px-2 py-1 rounded-md shadow-md text-white" style="background-color:#2edcdc;">Compose</span></a>`;
                },
            },
        ];
        makeAjaxDataTable('dtDraftMail', {
            select: true,
            url: 'admin/mailbox/draft/list',
            body: { type: $('#list_type').val() ?? '' },
            columns: col_draft,
            pdf: [0, 1, 2],
        });
    }
});

window.dtDraftMail = (table, api, op) => {
    G.deleteAll({
        element: 'deleteAllDraftMail',
        script: 'admin/mailbox/draft/delete',
        confirm: true,
        api,
    });
    downloadPdf({ ...op, btn: 'downloadDraftMailPdf', dataTable: 'yes' });
    downloadExcel({ ...op, btn: 'downloadDraftMailExcel', dataTable: 'yes' });
};