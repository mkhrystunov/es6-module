// import * as notify from './libs/notify';
//
// notify.dev('test console output');
//
// notify.user('Alert message!');
//
// notify.flash('flash-messages', 'HTML message');
import header from './libs/header';

header()
    .then((container) => {
        document.body.replaceChild(
            container,
            document.getElementById('app')
        );
    })
    .catch((err) => {
        console.log(err);
    });
