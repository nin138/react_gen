import * as React from 'react';
import {isDescendant, NodeRendererProps} from "react-sortable-tree";

function classnames(...classes: Array<any>) {
  return classes.filter(Boolean).join(' ');
}

export class TreeNodeRenderer extends React.Component<NodeRendererProps> {
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      draggedNode,
      isSearchMatch,
      isSearchFocus,
      className,
      style,
      didDrop,
      // isOver, // Not needed, but preserved for other renderers
      // parentNode, // Needed for dndManager
    } = this.props;
    const nodeTitle = node.title;
    let handle;
    if (canDrag) {
      if (typeof node.children === 'function' && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the children)
        handle = (
          <div className="rst__loadingHandle">
            <div className="rst__loadingCircle">
              {[...new Array(12)].map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="rst__loadingCirclePoint"
                />
              ))}
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(<div className="rst__moveHandle" />, {
          dropEffect: 'copy',
        });
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    return (
      <div style={{height: "100%"}}>
        {toggleChildrenVisibility &&
        node.children &&
        (node.children.length > 0 || typeof node.children === 'function') && (
          <div>
            {node.expanded &&
            !isDragging && (
              <div
                style={{ width: scaffoldBlockPxWidth }}
                className="rst__lineChildren"
              />
            )}
          </div>
        )}

        <div className="rst__rowWrapper">
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div
              onClick={e => {console.log(this.props.node.id)}}
              className={classnames(
                'rst__row',
                isLandingPadActive && 'rst__rowLandingPad',
                isLandingPadActive && !canDrop && 'rst__rowCancelPad',
                isSearchMatch && 'rst__rowSearchMatch',
                isSearchFocus && 'rst__rowSearchFocus',
                className
              )}
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              {handle}

              <div
                className={classnames(
                  'rst__rowContents',
                  !canDrag && 'rst__rowContentsDragDisabled'
                )}
              >
                <div className="rst__rowLabel">
                  <span
                    className={classnames(
                      'rst__rowTitle',
                      node.subtitle && 'rst__rowTitleWithSubtitle'
                    )}
                  >
                    {nodeTitle}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

