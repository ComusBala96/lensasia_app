import { getUrl } from '@orians/utils';
const url = getUrl();
let module;
switch (url) {
case 'admin/dashboard':
    module = import('./dashboard/dashboard');
    break;
case 'admin/navigation/menu':
    module = import('./navigation/menu');
    break;
case 'admin/navigation/page':
    module = import('./navigation/page');
    break;
case 'admin/news/create/article':
    module = import('./news/create/article');
    break;
case 'admin/news/create/gallery':
    module = import('./news/create/gallery');
    break;
case 'admin/news/create/video':
    module = import('./news/create/video');
    break;
    //bind
case 'admin/advertisement/space/news':
    module = import('./advertisement/space/news');
    break;
case 'admin/gallery/private':
    module = import('./gallery/private');
    break;
case 'admin/video/private':
    module = import('./video/private');
    break;
case 'admin/video/scheduled':
    module = import('./video/scheduled');
    break;
case 'admin/video/draft':
    module = import('./video/draft');
    break;
case 'admin/video/pending':
    module = import('./video/pending');
    break;
case 'admin/video/approved':
    module = import('./video/approved');
    break;
case 'admin/video/show':
    module = import('./video/show');
    break;
case 'admin/gallery/scheduled':
    module = import('./gallery/scheduled');
    break;
case 'admin/gallery/approved':
    module = import('./gallery/approved');
    break;
case 'admin/gallery/pending':
    module = import('./gallery/pending');
    break;
case 'admin/gallery/draft':
    module = import('./gallery/draft');
    break;
case 'admin/gallery/show':
    module = import('./gallery/show');
    break;
case 'admin/settings/limitations/post':
    module = import('./settings/limitations/post');
    break;
case 'admin/settings/limitations/dashboard':
    module = import('./settings/limitations/dashboard');
    break;
case 'admin/settings/preferences/user':
    module = import('./settings/preferences/user');
    break;
case 'admin/settings/preferences/post':
    module = import('./settings/preferences/post');
    break;
case 'admin/settings/preferences/homepage':
    module = import('./settings/preferences/homepage');
    break;
case 'admin/settings/preferences/general':
    module = import('./settings/preferences/general');
    break;
case 'admin/settings/configurations/datatable':
    module = import('./settings/configurations/datatable');
    break;
case 'admin/settings/configurations/file':
    module = import('./settings/configurations/file');
    break;
case 'admin/settings/configurations/video':
    module = import('./settings/configurations/video');
    break;
case 'admin/settings/configurations/image':
    module = import('./settings/configurations/image');
    break;
case 'admin/settings/configurations/analytic':
    module = import('./settings/configurations/analytic');
    break;
case 'admin/settings/configurations/google':
    module = import('./settings/configurations/google');
    break;
case 'admin/settings/configurations/email':
    module = import('./settings/configurations/email');
    break;
case 'admin/navigation/category':
    module = import('./navigation/category');
    break;
case 'admin/settings/block':
    module = import('./settings/block');
    break;
case 'admin/settings/limitation':
    module = import('./settings/limitation');
    break;
case 'admin/system/update/database':
    module = import('./system/update');
    break;
case 'admin/profile/settings':
case 'admin/profile/social-accounts':
case 'admin/profile/change-password':
case 'admin/profile/google-2fa':
    module = import('./profile/profile');
    break;
case 'admin/profile/google/2fa':
    module = import('./profile/2fa');
    break;
case 'admin/theme/font/settings':
    module = import('./theme/font');
    break;
case 'admin/theme/font':
    module = import('./theme/font');
    break;

case 'admin/comment/replays':
    module = import('./comment/replays');
    break;
case 'admin/comment/comments':
    module = import('./comment/comments');
    break;
case 'admin/message/replay':
    module = import('./message/replay');
    break;
case 'admin/message/template':
    module = import('./message/template');
    break;
case 'admin/advertisement/adsense':
    module = import('./advertisement/adsense');
    break;
case 'admin/theme/color/light':
    module = import('./theme/color');
    break;
case 'admin/theme/color/dark':
    module = import('./theme/color');
    break;
case 'admin/seo/google':
    module = import('./seo/google');
    break;
case 'admin/seo/show/page':
case 'admin/seo/show/menu':
case 'admin/seo/show/article':
case 'admin/seo/show/gallery':
case 'admin/seo/show/video':
    module = import('./seo/page');
    break;
case 'admin/mailbox/draft':
    module = import('./mailbox/draft');
    break;
case 'admin/mailbox/compose':
    module = import('./mailbox/compose');
    break;
case 'admin/mailbox/sent':
    module = import('./mailbox/sent');
    break;
case 'admin/mailbox/subscribers':
    module = import('./mailbox/subscribers');
    break;
case 'admin/mailbox/administrator':
    module = import('./mailbox/administrator');
    break;
case 'admin/mailbox/users':
    module = import('./mailbox/users');
    break;
case 'admin/mailbox/template':
    module = import('./mailbox/template');
    break;
case 'admin/message/contact':
    module = import('./message/contact');
    break;
case 'admin/advertisement/position/side':
    module = import('./advertisement/position/side');
    break;
case 'admin/advertisement/position/footer':
    module = import('./advertisement/position/footer');
    break;
case 'admin/advertisement/popup/middle':
    module = import('./advertisement/popup/middlePopup');
    break;
case 'admin/advertisement/popup/footer':
    module = import('./advertisement/popup/footerPopup');
    break;
case 'admin/advertisement/position/middle':
    module = import('./advertisement/position/middle');
    break;
case 'admin/advertisement/position/header':
    module = import('./advertisement/position/header');
    break;
case 'admin/advertisement/space/trending':
    module = import('./advertisement/space/trending');
    break;
case 'admin/seo/settings':
    module = import('./seo/settings');
    break;
case 'admin/advertisement/space/latest':
    module = import('./advertisement/space/latest');
    break;
case 'admin/advertisement/space/breaking':
    module = import('./advertisement/space/breaking');
    break;
case 'admin/news/post/vote':
    module = import('./news/post/vote');
    break;
case 'admin/news/post/poll':
    module = import('./news/post/poll');
    break;
case 'admin/users/access/roles/permissions':
    module = import('./users/access/rolePermission');
    break;
case 'admin/users/access/permission':
    module = import('./users/access/permission');
    break;
case 'admin/users/access/role':
    module = import('./users/access/role');
    break;
case 'admin/users/manage/create/users':
    module = import('./users/manage/createUsers');
    break;
case 'admin/users/manage/administrator':
    module = import('./users/manage/administrator');
    break;
case 'admin/users/manage/users':
    module = import('./users/manage/users');
    break;
case 'admin/users/manage/employees':
    module = import('./users/manage/employees');
    break;
case 'admin/users/manage/subscribers':
    module = import('./users/manage/subscribers');
    break;
case 'admin/news/show/registered':
    module = import('./news/view/registered');
    break;
case 'admin/news/show/draft':
    module = import('./news/view/draft');
    break;
case 'admin/news/show/scheduled':
    module = import('./news/view/scheduled');
    break;
case 'admin/news/show/approved':
    module = import('./news/view/approved');
    break;
case 'admin/news/show/pending':
    module = import('./news/view/pending');
    break;
case 'admin/news/show/popular':
    module = import('./news/view/popular');
    break;
case 'admin/news/show/feature':
    module = import('./news/view/feature');
    break;
case 'admin/news/show/latest':
    module = import('./news/view/latest');
    break;
case 'admin/news/show/headline':
    module = import('./news/view/headline');
    break;
case 'admin/news/show/breaking':
    module = import('./news/view/breaking');
    break;
case 'admin/news/show/post':
    module = import('./news/view/post');
    break;
case 'admin/navigation/keyword':
    module = import('./navigation/keyword');
    break;
case 'admin/navigation/tag':
    module = import('./navigation/tag');
    break;
case 'admin/settings/general/footer':
    module = import('./settings/footer');
    break;
case 'admin/settings/general/header':
    module = import('./settings/header');
    break;
case 'admin/settings/general/social':
    module = import('./settings/social');
    break;
case 'admin/settings/general/contact':
    module = import('./settings/contact');
    break;
case 'admin/settings/general':
    module = import('./settings/general');
    break;
case 'admin/settings/general/logo':
    module = import('./settings/logo');
    break;
default:
    break;
}
void module; 