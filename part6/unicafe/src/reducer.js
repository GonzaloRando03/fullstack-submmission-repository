const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newStateGood = {...state}
      newStateGood.good+=1
      return newStateGood
    case 'OK':
      const newStateOk = {...state}
      newStateOk.ok+=1
      return newStateOk
    case 'BAD':
      const newStateBad = {...state}
      newStateBad.bad+=1
      return newStateBad
    case 'ZERO':
      const zeroState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zeroState
    default: return state
  }
  
}

export default counterReducer