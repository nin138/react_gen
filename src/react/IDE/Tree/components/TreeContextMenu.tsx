import * as React from "react";
import { ModalInputType } from "../../../Modal/Modal";
import { ActionDispatcher } from "../../Container";

interface Props {
  id: string;
  actions: ActionDispatcher;
  closeThis: () => void;
}

export class TreeContextMenu extends React.Component<Props> {
  render() {
    return (
      <div className={"c-tree-contextmenu"}>
        <ul className={"c-tree-contextmenu__list"}>
          <li
            onClick={() => {
              this.props.actions.modal.open({
                title: "componetize",
                msg: "enter a new component name",
                buttons: [
                  {
                    name: "ok",
                    listener: event => {
                      this.props.actions.project.componentize(
                        this.props.id,
                        event.name
                      );
                    }
                  }
                ],
                input: [{ name: "name", type: ModalInputType.TextBox }]
              });
            }}
          >
            componentize
          </li>
        </ul>
        <div
          className={"c-tree-contextmenu__field"}
          onClick={() => this.props.closeThis()}
        />
      </div>
    );
  }
}
