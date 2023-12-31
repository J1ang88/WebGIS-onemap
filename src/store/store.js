import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    _defaultMapView: '', //默认地图view
    _defaultMapTreeVisible: '',//控制maptree控件的显隐
    _defaultXZQHComponentVisible: '',//控制行政区划导航控件的显隐
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '' //存储token
}

const getters = {
    _getDefaultMapView() {
        return state._defaultMapView;
    },
    _getDefaultMapTreeVisible() {
        return state._defaultMapTreeVisible
    },
    _getDefaultXZQHComponentVisible() { //控制行政区划导航控件的显隐
        return state._defaultXZQHComponentVisible
    }
}
const mutations = {
    _setDefaultMapView(state, value) {
        state._defaultMapView = value;
    },
    _setDefaultMapTreeVisible(state, value) {
        state._defaultMapTreeVisible = value
    },
    _setDefaultXZQHComponentVisible(state, value) { //控制行政区划导航控件的显隐
        state._defaultXZQHComponentVisible = value
    },
    // 修改token，并将token存入localStorage
    changeLogin (state, value) {
        state.Authorization = value;
        localStorage.setItem('Authorization', value);
      }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations
}

);

export default store;