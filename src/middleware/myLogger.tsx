/* tslint:disable */

import { CounterActionType } from '../modules/counter'

const myLogger = (store: any) => (next: any) => (action: CounterActionType): CounterActionType => {
  /*
    store는 getState함수와 dispatch함수를 가진 객체
    next는 disaptch를 반환하는 함수 (다음 액션을 실행하라는 명령어로 해당부분 없으면 다음 action 실행되지않음)
    action은 실행된 action을 반환하는 객체
  */
  const state = store.getState()
  console.log(state)
  // console.log('myLogger action => ', typeof action, action)
  // console.log('store', typeof store, store)
  const result = next(action)
  console.log('next', next)
  return result
}

export default myLogger
