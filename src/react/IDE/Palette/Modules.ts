import {Action} from 'redux'

enum ActionNames {
  ItemDropped = "Palette.ItemDropped",
}

interface ItemDropAction extends Action {
  type: ActionNames.ItemDropped
  target: string
}
export const itemDropped = (target: string): ItemDropAction => ({
  type: ActionNames.ItemDropped,
  target
});

export interface PaletteState {
  test: string
}

export type PaletteAction = ItemDropAction


const initialState: PaletteState= {
  test: ""
};

export default function reducer(state: PaletteState = initialState, action: PaletteAction): PaletteState {
  switch (action.type) {
    default:
      return state
  }
}