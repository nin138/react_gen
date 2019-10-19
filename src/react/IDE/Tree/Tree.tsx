import { Map } from "immutable";
import * as React from "react";
import { NinComponentInfo, NinElement } from "../../Entities/NinElement";
import { ModalInputType } from "../../Modal/Modal";
import { AppAction } from "../../Store";
import { ActionDispatcher } from "../Container";
import ContextMenu from "../ContextMenu/ContextMenu";
import { LogActionDispatcher } from "../Log/Log";
import { changeAttribute, createNode, moveNode } from "../Project/Modules";
import { Project } from "../Project/Project";
import { TreeMain } from "./components/TreeMain";
import {
  changeSelectedItem,
  openContextMenu,
  reloadTreeState,
  TreeState
} from "./Modules";

export class TreeActionDispatcher {
  constructor(private dispatch: (action: AppAction) => void) {}
  createNode(initializer: NinComponentInfo, parent: string) {
    this.dispatch(createNode(new NinElement(initializer, parent), parent));
  }
  moveNode(moveNodeId: string, parentId: string, ref: string | null) {
    this.dispatch(moveNode(moveNodeId, parentId, ref));
  }
  changeSelectedItem(id: string) {
    this.dispatch(changeSelectedItem(id));
  }
  changeAttribute(targetId: string, attr: string, value: string) {
    this.dispatch(changeAttribute(targetId, attr, value));
  }
  openContextMenu(targetId: string) {
    this.dispatch(openContextMenu(targetId));
  }
  closeContextMenu() {
    this.dispatch(openContextMenu(null));
  }
  reloadTreeState() {
    this.dispatch(reloadTreeState());
  }
}

export enum TreeDropEventType {
  create = "create",
  move = "move"
}

interface Props {
  project: Project;
  value: TreeState;
  nodes: Map<string, NinElement>;
  actions: ActionDispatcher;
  log: LogActionDispatcher;
}

export default class Tree extends React.Component<Props, {}> {
  createContextMenu() {
    return (
      <ContextMenu
        closeThis={this.props.actions.tree.closeContextMenu.bind(
          this.props.actions
        )}
        list={[
          {
            name: "componentize",
            listener: () => {
              this.props.actions.modal.open(
                "Componetize",
                "enter a new component name",
                [
                  {
                    name: "ok",
                    listener: event => {
                      this.props.actions.project.componentize(
                        this.props.value.contextMenuId!,
                        event.name
                      );
                    }
                  }
                ],
                [{ name: "name", type: ModalInputType.TextBox }]
              );
            }
          }
        ]}
      />
    );
  }
  render() {
    return (
      <section className="c-tree">
        <div className="c-tree__head">
          <h1>Tree</h1>
        </div>
        <div className="c-tree__main" data-treeId="root">
          <TreeMain
            project={this.props.project}
            actions={this.props.actions}
            elements={this.props.project.getActiveFile().elements}
          />
        </div>
      </section>
    );
  }
}
