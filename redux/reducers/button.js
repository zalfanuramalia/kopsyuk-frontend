const buttonState = {
    value: 1
  }
  
  const button = (state=buttonState, action)=>{
    switch(action.type){
      case 'COUNTER_INCREMENT': {
          state.value = state.value + 1
          return {...state}
      }
      case 'COUNTER_DECREMENT': {
          state.value = state.value - 1
          return {...state}
      }
      default: {
          return {...state}
      }
    }
  }
  
  export default button