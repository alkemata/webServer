const editor = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return state.setIn(["editor", "mode"], action.mode);
    default:
      return state
  }
}

export default editor