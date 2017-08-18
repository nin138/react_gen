import {Action} from 'redux'
import {List} from "immutable";

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

export class Component {

}

export interface PaletteState {
  components: List<Component>
}

export type PaletteAction = ItemDropAction

const initialState: PaletteState= {
  components: List()
};

export default function reducer(state: PaletteState = initialState, action: PaletteAction): PaletteState {
  switch (action.type) {
    default:
      return state
  }
}