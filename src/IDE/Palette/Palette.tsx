import * as React from "react";
import {TAGS} from "../../Html/Tags";

interface Props {

}

export default class Palette extends React.Component<Props, {}> {
  render() {
    const tags = TAGS.map(v => { return (<div key={v}>{v}</div>) });
    return (
        <div>
          {tags}
        </div>
    )
  }
}