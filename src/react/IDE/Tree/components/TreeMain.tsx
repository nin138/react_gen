import * as React from 'react';
import {SortableTreeWithoutDndContext as SortableTree} from 'react-sortable-tree';
import {TreeNodeRenderer} from "./TreeNodeRenderer";
import {Map} from "immutable";
import {NinElement, ROOT_ID} from "../../../Entities/NinElement";
import {ActionDispatcher} from "../../Container";
import {Project} from "../../Project/Project";
import {PaletteDnDType} from "../../Palette/PaletteItem";

interface Props {
  elements: Map<string, NinElement>
  actions: ActionDispatcher
  project: Project
}

interface State {
  treeData: any
}

interface TreeData {
  title: string
  id: string
  fullName: string
  hasChild: boolean
  expanded: true
  children?: Array<TreeData>
}

export class TreeMain extends React.Component<Props ,State> {
  private getTreeData(elements: Map<string, NinElement>): Array<TreeData> {
    const roots = elements.filter(it => it!.parent == ROOT_ID);
    const toTreeData = (id: string): TreeData => {
      const element = elements.get(id);
      return {
        expanded: true,
        title: element.fullName(),
        id: element.id,
        hasChild: this.props.project.getComponentInfo(element.fullName()).hasChild,
        fullName: element.fullName(),
        children: element.children.map(it => toTreeData(it!)).toArray()
      }
    };
    return roots.toArray().map(it => toTreeData(it.id));
  }
  private handleOnChange(list: Array<TreeData>) {
    console.log(list);
    const ret: Array<{parent: string, id: string, fullName: string, children: Array<string>}> = [];
    const parse = (data: TreeData, parent: string) => {
      ret.push({ parent: parent, id: data.id, fullName: data.fullName, children: (data.children)? data.children.map(it => it.id) : [] })
      if(data.children) data.children.forEach(it => parse(it, data.id));
    };
    list.forEach(it => parse(it, ROOT_ID));
    this.props.actions.rebuildTree(ret);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <SortableTree
          dndType={PaletteDnDType}
          rowHeight={52}
          nodeContentRenderer={TreeNodeRenderer}
          treeData={this.getTreeData(this.props.elements)}
          onChange={treeData => this.handleOnChange(treeData as Array<TreeData>)}
          canDrop={data => !data.nextParent || data.nextParent.hasChild !== false}
        />
      </div>
    );
  }
}