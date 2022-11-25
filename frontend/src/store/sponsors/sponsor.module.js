import sponsorService from "@/api/sponsor.service";
import { 
  // Actions
  FETCH_SPONSORS, 
  ADD_SPONSOR, 
  EDIT_SPONSOR, 
  REMOVE_SPONSOR, 
  // Mutations
  SET_SPONSORS, 
  SET_MESSAGE,
  UPDATE_LIKES 
} from "./sponsor.constants";

const state = {
  sponsors: []
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorsById: state => id => state.sponsors.find(sponsor => sponsor._id === id),
  getSponsorsByAnimal: state => animal => state.sponsors.find(sponsor => sponsor.animal === animal),
  getMessage: state => state.message,
  
};

const actions = {
  [FETCH_SPONSORS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsors(rootState.auth.token)
        .then(
          res => {
            commit(SET_SPONSORS, res.body);
            resolve(res)
          },
          err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    })
  },
  [ADD_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.addSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O sponsor ${res.body.name} foi adicionado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err.message)
            reject(err)
          });
    });
  },
  [EDIT_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.editSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(SET_MESSAGE, `O sponsor ${res.body.name} foi atualizado com sucesso!`);
            resolve(res)
          }, err => {
            commit(SET_MESSAGE, err)
            reject(err)
          });
    });
  },
  [REMOVE_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorService.removeSponsor(rootState.auth.token, id)
        .then(res => {
          commit(SET_MESSAGE, `O sponsor foi removido com sucesso!`);
          resolve(res)
        }, err => {
          commit(SET_MESSAGE, err.message)
          reject(err)
        });
    });
  }
};

export const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  },
  [UPDATE_LIKES]: (state, payload) => {
    state.sponsors.forEach(sponsor => {
      if(sponsor._id === payload.sponsorId) {
        sponsor.evaluation.push(payload.userId)
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}