import { createApp } from 'vue';
import SvgIcon from '@/components/svg-icon.g.vue'; // svg component

import './svg/dashboard.svg';
import './svg/bug.svg';
import './svg/table.svg';
import './svg/example.svg';
import './svg/eye.svg';
import './svg/eye-open.svg';
import './svg/form.svg';
import './svg/link.svg';
import './svg/lock.svg';
import './svg/nested.svg';
import './svg/password.svg';
import './svg/tree.svg';
import './svg/user.svg';
/*const requireAll = function(requireContext: any) {
    console.log( requireContext.keys());
  return requireContext.keys().map(requireContext)
}*/

/*const req = require.context('./svg', false, /\.svg$/)

requireAll(req)
console.log(requireAll(req));*/

export default function (app: ReturnType<typeof createApp>) {
  app.component('SvgIcon', SvgIcon);
}
