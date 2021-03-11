/* tslint:disable */

import { CounterActionType } from '../modules/counter'

const myLogger = (store: any) => (next: any) => (action: any): CounterActionType => {
  console.log('myLogger action => ', action)
  const result = next(action)
  console.log('myLogger result => ', result)
  return result
}

// function myLogger<T1>(store: T1) {
//   return function <T2>(next: T2) {
//     return function (action: CounterActionType) {
//       console.log('myLogger action => ', action)
//         const result = next(action)
//         console.log('myLogger result => ', result)
//         return result
//     }
//   }
// }

export default myLogger
