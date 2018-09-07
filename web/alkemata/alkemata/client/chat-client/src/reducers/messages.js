import { emptyCodeCell, emptyMarkdownCell, appendCellToNotebook } from '@nteract/commutable'
import * as types from '../constants/ActionTypes'

const messages = (state = [], action) => {
  switch (action.type) {
    case types.MESSAGE_RECEIVED:
    if (action.message.type==='raw')
    {
      let newcell = emptyMarkdownCell;
      newcell = newcell.set("source", action.message.text)
      return appendCellToNotebook(state, newcell)}
      else
      {
        let newcell = emptyCodeCell;
        newcell = newcell.set("source", action.message)
        newcell=newcell.set('outputs',action.message.outputs)
        return appendCellToNotebook(state, newcell)}
    default:
      return state
  }
}

export default messages
