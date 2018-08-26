const info = (state = [], action) => {
  switch (action.type) {
    case 'DISPLAY_INFO':
	const info1=state;
	const info2=info1+'\n'+action.message;
      return info2;

    default:
      return state
  }
}

export default info