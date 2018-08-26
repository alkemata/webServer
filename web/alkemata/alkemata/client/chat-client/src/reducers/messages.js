import {emptyMarkdownCell,appendCellToNotebook,toJS} from '@nteract/commutable'

const messages = (state = [], action) => {
  switch (action.type) {
    case 'MESSAGE_RECEIVED':
    let newcell=emptyMarkdownCell;
    newcell=newcell.set("source",action.message) 
      return appendCellToNotebook(state,newcell)
    default:
      return state
  }
}

export default messages
