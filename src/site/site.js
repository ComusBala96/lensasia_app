import { getUrl } from '@orian/utils';

const url = getUrl();

let module;
switch (url) {
case '':
    module = import('./home/home');
    break;
case 'site/auth/login':
    module = import('./auth/login');
    break;
case 'site/auth/verify/email':
    module = import('./auth/verify');
    break;
case 'site/auth/show/otp':
    module = import('./auth/otp');
    break;
case 'site/auth/new/password':
    module = import('./auth/password');
    break;
case 'site/auth/register':
    module = import('./auth/register');
    break;
case 'site/user/profile':
    module = import('./user/profile');
    break;
case 'site/news':
    module = import('./news/news');
    break;
case 'site/contact':
    module = import('./contact/contact');
    break;
case 'site/search':
    module = import('./search/search');
    break;
case 'site/archive':
    module = import('./archive/archive');
    break;
case 'site/category':
    module = import('./category/category');
    break;
case 'site/news/tag':
    module = import('./tags/tags');
    break;
case 'site/gallery/show':
case 'site/gallery':
    module = import('./gallery/gallery');
    break;
case 'site/video/show':
case 'site/video':
    module = import('./video/video');
    break;
    //bind
default:
    break;
}
void module; 