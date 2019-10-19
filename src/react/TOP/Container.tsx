import { connect } from "react-redux";
import { ActionDispatcher } from "../IDE/Container";
import Top from "./Top";

export default connect(
  state => state,
  dispatch => ({ actions: new ActionDispatcher(dispatch) })
)(Top);
