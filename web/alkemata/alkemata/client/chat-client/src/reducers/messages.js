import { emptyMarkdownCell, appendCellToNotebook } from '@nteract/commutable'
import * as types from '../constants/ActionTypes'

const messages = (state = [], action) => {
  switch (action.type) {
    case types.MESSAGE_RECEIVED:
      let newcell = emptyMarkdownCell;
      newcell = newcell.set("source", action.message)
      return appendCellToNotebook(state, newcell)
    default:
      return state
  }
}

export default messages
