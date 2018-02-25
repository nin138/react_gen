import {Action} from "redux";


export interface IDEState {
}

export type IDEAction = Action

const initialState: IDEState= {
};

export default function reducer(state: IDEState = initialState, action: IDEAction): IDEState {
  switch (action.type) {
  }
  return state;
}