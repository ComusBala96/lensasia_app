import { ajaxRequest, G, isValidUrl, jodit } from '@orian/utils';
$(document).ready(function () {
    const lang = G.pageLang;
    const { placeholder } = lang;
    const editor = jodit({
        element: 'summer_message',
        height: 400,
        placeholder: placeholder?.message,
        removeButtons: ['image', 'video', 'link', 'strikethrough', 'symbols', 'find', 'source', 'brush', 'superscript', 'subscript',]
    });
    if ($('#moreNews').length > 0) {
        $('#moreNews').on('click', '.pagination span', function () {
            if (!isValidUrl($(this).data('href'))) return;
            let url = new URL($(this).data('href'));
            const params = new URLSearchParams(url.search);
            const value = params.get('items');
            ajaxRequest({
                element: 'moreNews',
                script: 'site/contact',
                type: 'request',
                dataType: 'json',
                body: { items: value },
                afterSuccess: {
                    type: 'load_html',
                    target: 'moreNews',
                }
            });
        });
    }
    if ($('#frmSubmitContactMessage').length > 0) {
        let rules = {
            name: {
                required: true,
                maxlength: 253
            },
            email: {
                required: true,
                maxlength: 253

            },
            phone: {
                required: false,
            },
            subject: {
                required: true,
                maxlength: 253
            },
            message: {
                required: true,
                maxlength: 5000
            },
        };
        ajaxRequest({
            element: 'frmSubmitContactMessage',
            validation: true,
            script: 'site/contact/create',
            rules,
            afterSuccess: {
                type: 'inflate_reset_response_data',
                afterLoad: () => {
                    editor.value = '';
                    editor.synchronizeValues();
                    editor.setEditorValue('');
                    editor.events.fire('change');
                }
            }
        });
    }
});