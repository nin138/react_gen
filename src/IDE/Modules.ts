// import {EditAction} from "./Edit/Modules";
//
// enum ActionNames {
// }
//
// export interface EditState {
//   attr: string
//   value: string
// }
//
// export type IDEAction = EditAction
//
// const initialState: EditState= {
//   attr: "i",
//   value: "t"
// };
//
// export default function reducer(state: EditState = initialState, action: EditAction): EditState {
//   switch (action.type) {
//     case ActionNames.ChangeCssAttr:
//       return Object.assign({}, state, { attr: action.attr, value: action.value });
//     default:
//       return state
//   }
// }