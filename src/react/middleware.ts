 import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import {AppState} from "./Store";
export interface ExtendedMiddleware<StateType> extends Middleware {
  <S extends StateType>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}

export const loggerMiddleware: ExtendedMiddleware<AppState> = <S extends AppState>(api: MiddlewareAPI<S>) =>
    (next: Dispatch<S>) =>
        <A extends Action>(action: A): A => {
          // Can use: api.getState()
          console.log(action);
          return next(action);
        };
