import * as React from 'react'

export interface ContextMenuItem {
  name: string
  listener: () => void
}

interface Props {
  list: Array<ContextMenuItem>
  closeThis: () => void
}

export default class ContextMenu extends React.Component<Props> {
  render() {
    const items = this.props.list.map(it => <div className="c-contextMenu__item" key={it.name} onClick={() => it.listener()}>{it.name}</div>);
    return (
        <div className="c-contextMenu"
             onClick={_ => this.props.closeThis()}
             onMouseDown={e => e.stopPropagation()}>
          {items}
        </div>
    )
  }
}