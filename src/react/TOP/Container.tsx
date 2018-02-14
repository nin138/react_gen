import {connect} from 'react-redux'
import Top from "./Top";
import {ActionDispatcher} from "../IDE/Container";


export default connect(state => state, dispatch => ({actions: new ActionDispatcher(dispatch)}))(Top)