import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  listings: []
};

const getters = {
  listings: state => state.listings
};

const mutations = {
  'ADD_LISTING'(state, listing) {
    state.listings.unshift(listing);
  },
  'REMOVE_LISTING'(state, id) {
    console.log(id);
    state.listings = state.listings.filter(listing => listing.id !== id);
  },
  'SET_LISTINGS'(state, listings) {
    state.listings = listings;
  }
}

const actions = {
  addListing ({commit},listing) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listing)
    };
    fetch("http://localhost:9000/api/listings", requestOptions).then(response => {
      return response.json();
    }).then(listing => {
      commit('ADD_LISTING', listing);
    });   
  },
  removeListing ({commit},id) {
    const requestOptions = {
      method: "DELETE"
    };
    fetch("http://localhost:9000/api/listings/" + id, requestOptions).then(response => {
      return response.json();
    }).then(data => {
      commit('REMOVE_LISTING', data.id);
    });   
  },
  getListings ({ commit }) {
    fetch("http://localhost:9000/api/listings").then(response => {
      return response.json();
    }).then(data => {
      commit('SET_LISTINGS', data);
    });
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})