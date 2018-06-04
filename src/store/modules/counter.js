import {
  COUNT_DECREMENT,
  COUNT_INCREMENT
} from '@/store/mutations-type'
const state = {
  count: 0

}
const mutations = {
  [COUNT_INCREMENT]: (state) => {
    const obj = state
    obj.count += 1
    console.log(COUNT_INCREMENT, obj.count)
  },
  [COUNT_DECREMENT]: (state) => {
    const obj = state
    obj.count -= 1
    console.log(COUNT_DECREMENT, obj.count)
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
