import { Map } from "immutable";
import * as React from "react";
import { SortableTreeWithoutDndContext as SortableTree } from "react-sortable-tree";
import { NinElement, ROOT_ID } from "../../../Entities/NinElement";
import { ActionDispatcher } from "../../Container";
import { PaletteDnDType } from "../../Palette/PaletteItem";
import { Project } from "../../Project/Project";
import { TreeNodeRenderer } from "./TreeNodeRenderer";

interface Props {
  elements: Map<string, NinElement>;
  actions: ActionDispatcher;
  project: Project;
}

interface State {
  treeData: any;
}

interface TreeData {
  title: string;
  id: string;
  fullName: string;
  hasChild: boolean;
  expanded: true;
  children?: TreeData[];
  onContextMenu: (id: string) => void;
  onClick: (id: string) => void;
}

export class TreeMain extends React.Component<Props, State> {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <SortableTree
          dndType={PaletteDnDType}
          rowHeight={52}
          nodeContentRenderer={TreeNodeRenderer}
          treeData={this.getTreeData(this.props.elements)}
          onChange={treeData => this.handleOnChange(treeData as TreeData[])}
          canDrop={data =>
            !data.nextParent || data.nextParent.hasChild !== false
          }
        />
      </div>
    );
  }
  private getTreeData(elements: Map<string, NinElement>): TreeData[] {
    const roots = elements.filter(it => it!.parent == ROOT_ID);
    const toTreeData = (id: string): TreeData => {
      const element = elements.get(id);
      return {
        expanded: true,
        title: element.fullName(),
        id: element.id,
        hasChild: this.props.project.getComponentInfo(element.fullName())
          .hasChild,
        fullName: element.fullName(),
        children: element.children.map(it => toTreeData(it!)).toArray(),
        onContextMenu: (id: string) =>
          this.props.actions.tree.openContextMenu(id),
        onClick: (id: string) => this.props.actions.tree.changeSelectedItem(id)
      };
    };
    return roots.toArray().map(it => toTreeData(it.id));
  }
  private handleOnChange(list: TreeData[]) {
    const ret: Array<{
      parent: string;
      id: string;
      fullName: string;
      children: string[];
    }> = [];
    const parse = (data: TreeData, parent: string) => {
      ret.push({
        parent,
        id: data.id,
        fullName: data.fullName,
        children: data.children ? data.children.map(it => it.id) : []
      });
      if (data.children) data.children.forEach(it => parse(it, data.id));
    };
    list.forEach(it => parse(it, ROOT_ID));
    this.props.actions.rebuildTree(ret);
  }
}
