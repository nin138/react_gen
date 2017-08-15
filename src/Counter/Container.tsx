import {Counter} from './Counter'
import {connect, MapDispatchToPropsParam, MapStateToPropsParam} from 'react-redux'
import {Dispatch} from 'redux'
import {CounterState, decrementAmount, fetchRequestFinish, fetchRequestStart, incrementAmount} from './Modules'
import {RouteComponentProps} from 'react-router'
import {GeneralAction, GeneralState} from "../Store";

export class ActionDispatcher {
  constructor(private dispatch: (action: GeneralAction) => void) {}

  myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  public increment(amount: number): void {
    this.dispatch(incrementAmount(amount))
  }

  public decrement(amount: number): void {
    this.dispatch(decrementAmount(amount))
  }

  public async asyncIncrement(): Promise<void> {
    this.dispatch(fetchRequestStart());
    const response: Response = await fetch('/api/count', {
      method: 'GET',
      headers: this.myHeaders
    });
    if(response.ok) {
      const json: {amount: number} = await response.json();
      this.dispatch(incrementAmount(json.amount))
    } else {
      console.error(`response code ${response.status}`);
    }
    this.dispatch(fetchRequestFinish())
  }
}

const mapStateToProps: MapStateToPropsParam<{value: CounterState, param?: string}, any> =
    (state: GeneralState, ownProps: RouteComponentProps<{myParams: string | undefined}>) => {
  if (ownProps.match.params.myParams === undefined) return {value: state.counter};
  return {value: state.counter, param: ownProps.match.params.myParams}
};

const mapDispatchToProps: MapDispatchToPropsParam<{actions: ActionDispatcher}, {}> =
    (dispatch: Dispatch<GeneralAction>) => ({actions: new ActionDispatcher(dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Counter)