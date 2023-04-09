import { createStore } from 'vuex';
import getters from './getters';
import app from './modules/app';
import permission from './modules/permission';
import user from './modules/user';

export default createStore({
  modules: { user, app, permission },
  getters,
});
