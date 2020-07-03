import { Api } from '../../helpers/api'
import axios from '../../helpers/api'
console.log(Api);

const api = new Api(Api.ROUTES().analyzer);
console.log(api);

// initial state
const state = {

    infoHostQueried: {
        servers: [
            {
                address: "server1",
                ssl_grade: "B",
                country: "US",
                owner: "Facebook, Inc."
            }
        ],
        servers_changed: true,
        ssl_grade: "B",
        previous_ssl_grade: "A+",
        logo: "https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico",
        title: "Facebokk",
        is_down: false
    },
    previousQueries: {
        items: [
            {
                dns: "facebook.com",
                data: {
                    servers: [
                        {
                            address: "104.244.42.65",
                            ssl_grade: "A+",
                            country: "US",
                            owner: "Twitter Inc."
                        },
                        {
                            address: "104.244.42.1",
                            ssl_grade: "A+",
                            country: "US",
                            owner: "Twitter Inc."
                        },
                        {
                            address: "104.244.42.65",
                            ssl_grade: "A+",
                            country: "US",
                            owner: "Twitter Inc."
                        },
                        {
                            address: "104.244.42.1",
                            ssl_grade: "A+",
                            country: "US",
                            owner: "Twitter Inc."
                        }
                    ],
                    servers_changed: false,
                    ssl_grade: "A",
                    previous_ssl_grade: "A",
                    logo: "https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico",
                    title: "",
                    is_down: false
                }
            }
        ]
    }

}

// getters
const getters = {
    infoHostQueried: (state) => state.infoHostQueried,
    previousQueries: (state) => state.previousQueries
}

// actions
const actions = {
    loadPreviousQueries: function (context) {
        return axios.get("/servers").then(response => {
            context.commit('SET_PREVIOUSQUERIES', response.data)
        }).catch(function (error) {
            console.log(error)
        })
    },

    loadInfoHostQueried: function (context, host) {
        return axios.get("/servers/analyze?host=" + host).then(response => {
            context.commit('SET_INFOHOSTQUERIED', response.data)
            context.dispatch("loadPreviousQueries")
        }).catch(function (error) {
            console.log(error)
        })
    }

}

// mutations
const mutations = {

    SET_INFOHOSTQUERIED(state, payload) {
        state.infoHostQueried = payload
    },
    SET_PREVIOUSQUERIES(state, payload) {
        state.previousQueries = payload
    }

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
