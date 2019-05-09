import _ from 'lodash'
import Identity from '@/config/Identity'

export default {
  user: (state, getters) => {
    return state.user
  },
  allGames: (state, getters) => {
    state.games.forEach((game, index) => {
      game.index = index + 1
    })
    return state.games
  },
  planMakerMap: (state, getters) => {
    let chatInfo = state.user.chatInfo
    let map = {}
    if (chatInfo && chatInfo.plan_maker_rooms && chatInfo.plan_maker_rooms.length) {
      _.each(chatInfo.plan_maker_rooms, (roomId) => {
        map[roomId] = {
          isPlanMaker: true
        }
      })
    }
    return map
  },
  gameById: (state, getters) => id => {
    return _.find(state.games, game => (game.id + '') === id)
  },
  categoriesByGameId: (state, getters) => gameId => {
    return _.filter(state.categories, item => (item.game_id + '') === gameId)
  },
  categoriesById: (state, getters) => categoryId => {
    return _.find(state.categories, item => (item.id + '') === categoryId)
  },
  userIdentity: (state) => {
    let unLogined = state.user.logined === false
    let isMember = !!state.user.account_type
    let isTrialMember = (state.user.account_type === 0)
    let isConfigReady = (state.systemConfig.state === 'fulfilled')
    let isConfigPending = (state.systemConfig.state === 'pending')

    if (isConfigPending) {
      return Identity.PENDING
    }

    if (isConfigReady && unLogined) {
      return Identity.UNLOGINED
    }

    if (isConfigReady && isTrialMember) {
      return Identity.TRIAL
    }

    if (isConfigReady && isMember) {
      return Identity.NORMAL
    }
  }
}
