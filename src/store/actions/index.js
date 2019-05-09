import _ from 'lodash'
import axios from 'axios'
import Vue from 'vue'

import * as types from '../mutations/mutation-types'

import {
  login,
  logout,
  fetchUser,
  updateUser,
  fetchGames,
  fetchGamesDetail,
  fetchCategories,
  fetchPlayGroups,
  getRoomsStatus,
  getBanner,
  fetchMessageCount,
  getAnnouncements,
  getDescription
} from '@/api'

export default {
  login: ({ commit, state, dispatch }, { user }) => {
    commit('START_LOADING')
    return login(user).then(res => {
      let expires = new Date(res.expires_in)
      if (res.access_token && res.refresh_token) {
        localStorage.setItem('token_expire', res.expires_in)
        Vue.cookie.set('access_token', res.access_token, {
          expires: expires
        })
        Vue.cookie.set('refresh_token', res.refresh_token, {
          expires: expires
        })

        localStorage.setItem('access_token', res.access_token) // for monitoring in App.vue

        axios.defaults.withCredentials = true
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token
        if (res.agent) {
          commit(types.SET_USER, {
            ...user,
            agent: res.agent
          })
        }
      }
      return dispatch('fetchUser').finally(() => { commit('END_LOADING') })
    }, error => {
      if (error.code === 9011 || error.code === 9013) {
        axios.defaults.withCredentials = true
        Vue.cookie.set('sessionid', error.data.sessionid)
      }
      commit('END_LOADING')
      return Promise.reject(error)
    })
  },
  logout: ({ commit, state, dispatch }) => {
    return logout().then(
      res => {
        commit(types.RESET_USER)
      },
      errRes => Promise.reject(errRes)
    )
  },
  setUser: ({ commit }, data) => {
    commit(types.SET_USER, data)
  },
  fetchUser: ({ commit, state }) => {
    return fetchUser().then(res => {
      if (res.length > 0) {
        let user = res[0]
        commit(types.SET_USER, {
          ...user,
          logined: true
        })
        return Promise.resolve(res[0])
      } else {
        return Promise.reject(res[0])
      }
    }, error => {
      commit(types.SET_USER, {
        logined: false
      })
      return Promise.reject(error)
    })
  },
  updateUser: ({ commit }, { userId, updateData }) => {
    return updateUser(userId, updateData).then(data => {
      commit(types.SET_USER, data)
    })
  },
  fetchGames: ({ commit, state }) => {
    return fetchGames().then(res => {
      commit(types.SET_GAMES, {
        games: res
      })
      fetchGamesDetail().then(games => {
        const totalCategories = {}
        const totalBettrackPositions = {}
        const totalPlayGroups = {}
        games.forEach((game) => {
          const categories = game.categories
          categories.forEach((category) => {
            totalPlayGroups[category.id] = category.playgroups
          })
          delete categories.playgroups
          if (game.playpositions) {
            categories.push({
              id: 'playpositions',
              display_name: '追号'
            })
            totalBettrackPositions[game.id] = {
              max_opts: game.playpositions.max_opts,
              positions: game.playpositions.data
            }
          }
          totalCategories[game.id] = categories
        })
        commit(types.SET_CATEGORIES, totalCategories)
        commit(types.SET_PLAYGROUP, totalPlayGroups)
        commit(types.SET_BETTRACK_POSITIONS, totalBettrackPositions)
      })
    })
  },
  fetchCategories: ({ commit, state }, gameId) => {
    return fetchCategories(gameId).then(res => {
      if (!state.categories[gameId]) {
        commit(types.SET_CATEGORIES, { [gameId]: res })
      }
      return res
    })
  },
  fetchPlayGroups: ({ commit, state }, categoryId) => {
    return fetchPlayGroups(categoryId).then(res => {
      commit(types.SET_PLAYGROUP, { [categoryId]: res })
      return res
    })
  },
  openBetRecordDialog: ({ commit, state }) => {
    commit(types.OPEN_BETRECORD_DIALOG)
  },
  closeBetRecordDialog: ({ commit, state }) => {
    commit(types.CLOSE_BETRECORD_DIALOG)
  },
  startLoading: ({ commit }) => {
    commit(types.START_LOADING)
  },
  endLoading: ({ commit }) => {
    commit(types.END_LOADING)
  },
  setMessageCount: ({ commit }) => {
    fetchMessageCount().then(res => {
      commit(types.SET_MESSAGE_COUNT, res.message_count)
    })
  },
  addMessageCount: ({ commit }, count) => {
    commit(types.ADD_MESSAGE_COUNT, count)
  },
  setSystemConfig: ({ commit }, data) => {
    commit(types.SET_SYSTEM_CONFIG, data)
  },
  initLatestResultMap: ({ commit }, result) => {
    commit(types.INIT_LATEST_RESULT_MAP, result)
  },
  updateLatestResultMap: ({ commit }, { gameCode, latestResult }) => {
    commit(types.UPDATE_LATEST_RESULT_MAP, { gameCode, latestResult })
  },
  openTrialVerifyDialog: ({ commit, state }) => {
    commit(types.OPEN_VERIFICATION_DIALOG)
  },
  closeTrialVerifyDialog: ({ commit, state }) => {
    commit(types.CLOSE_VERIFICATION_DIALOG)
  },
  updateIsChatting: ({ commit, state }, signal) => {
    commit(types.UPDATE_ISCHATTING, signal)
  },
  collectEnvelope: ({ commit, state }, data) => {
    commit(types.COLLECT_ENVELOPE, data)
  },
  updateCurrentChatRoom: ({ commit, state }, room) => {
    commit(types.UPDATE_CURRENTCHATROOM, room)
  },
  setRoomsStatus: ({ commit, state }) => {
    let statusMap = {}
    getRoomsStatus().then((res) => {
      let roomsStatus = res.data.data
      _.each(roomsStatus, (room) => {
        statusMap[room.id] = room
      })
      commit(types.SET_ROOMSSTATUS, statusMap)
    }).catch(() => {})
  },
  updateRoomStatus: ({ commit, state }, roomId, status) => {
    commit(types.SET_ROOMSSTATUS, roomId, status)
  },
  updateUnsettled: ({ commit, state }, value) => {
    commit(types.UPDATE_UNSETTLED, value)
  },
  startNiuNiuLoading: ({ commit }, gameCode) => {
    commit(types.START_NIUNIU_LOADING, gameCode)
  },
  stopNiuNiuLoading: ({ commit }, gameCode) => {
    commit(types.STOP_NIUNIU_LOADING, gameCode)
  },
  setWs: ({ commit }, { ws, type }) => {
    commit(types.SET_WS, { ws, type })
  },
  closeWs: ({ commit }, { ws, type }) => {
    commit(types.CLOSE_WS, { ws, type })
  },
  removeNotification: ({ commit }) => {
    commit(types.REMOVE_NOTIFICATION)
  },
  addNotification: ({ commit }, notification) => {
    commit(types.ADD_NOTIFICATION, notification)
  },
  refreshResult: ({ commit }) => {
    commit(types.REFRESH_RESULT)
  },
  urgencySwitchGame: ({ commit }, info) => {
    commit(types.SWITCH_GAME_STATE, info)
  },
  saveLastGame: ({ commit }, id) => {
    commit(types.SAVE_LAST_GAME, id)
  },
  saveLastCategory: ({ commit }, data) => {
    commit(types.SAVE_LAST_CATEGORY, data)
  },
  showBalanceDialog: ({ commit }, data) => {
    commit(types.SHOW_BALANCE_DIALOG, data)
  },
  hideBalanceDialog: ({ commit }) => {
    commit(types.HIDE_BALANCE_DIALOG)
  },
  fetchAnnouncement: ({ commit }) => {
    getAnnouncements().then(
      result => {
        const datas = []
        result.forEach((item) => {
          if (item.platform !== 0) {
            datas.push(item)
          }
        })

        if (datas.length > 0) {
          datas.sort((a, b) => {
            return a.rank - b.rank
          })
          commit(types.FETCH_ANNOUNCEMENT, datas.map(data => data.announcement))
        }
      }
    ).catch(() => {})
  },
  fetchBanner: ({ commit }) => {
    getBanner().then(
      result => {
        result.sort((a, b) => {
          return a.rank - b.rank
        })
        const banners = result.map((item, index) => {
          return { image: index === 0 ? item.image : '', rank: item.rank }
        })

        commit(types.FETCH_BANNER, banners)
        setTimeout(() => {
          commit(types.FETCH_BANNER, result)
        }, 1000)
      }
    ).catch(() => {})
  },
  fetchDescription: ({ commit }) => {
    getDescription().then(response => {
      commit(types.FETCH_DESCRIPTION, response.filter(item => item.header_image))
    }).catch(() => {})
  },
  showCampaignEnvelope: ({ commit }) => {
    commit(types.SHOW_CAMPAIGN_ENVELOPE)
  },
  hideCampaignEnvelope: ({ commit }) => {
    commit(types.HIDE_CAMPAIGN_ENVELOPE)
  },
  showChatroom: ({ commit }) => {
    commit(types.SHOW_CHATROOM)
  },
  hideChatroom: ({ commit }) => {
    commit(types.HIDE_CHATROOM)
  }
}
