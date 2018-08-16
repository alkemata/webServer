const info = (state = [], action) => {
  switch (action.type) {
    case 'DISPLAY_INFO':
      return state.concat([
        {
          message: action.message,
          typemsg: action.typemsg,
        }
      ])
    default:
      return state
  }
}

export default info