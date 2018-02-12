import * as React from 'react'

interface Props {
  createCssClass: (name: string) => void
}

interface State {
  name: string
}

export default class ClassCreator extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { name: "" }
  }
  render() {
    return(
        <div>
          <input type="text" value={this.state.name} onChange={ e => { this.setState({ name: e.target.value }) } } />
          <button onClick={() => this.props.createCssClass(this.state.name) }>add</button>
        </div>
    )
  }
}