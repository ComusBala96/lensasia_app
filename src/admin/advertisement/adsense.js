import { ajaxRequest } from '@orians/utils';
    
$(document).ready(function () {
    if ($('#frmUpdateGoogleAdsense').length > 0) {
        let rules = {
            adsense_code: {
                required: true,
            },
        };
        ajaxRequest({
            element: 'frmUpdateGoogleAdsense',
            validation: true,
            script: 'admin/advertisement/adsense/update',
            rules,
            afterSuccess: {
                type: 'inflate_response_data'
            }
        });
    }
});