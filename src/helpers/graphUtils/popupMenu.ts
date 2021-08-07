import childCellModal from "./childCellModal";
import mx from '../../mxgraph';

const CreatePopupMenu = (graph, menu, cell, evt, setGraphNodes) => {
  if (cell && (cell.style === "rectangle" || cell.style === "loaded")) {
    if (cell.style === "rectangle") {
      if (cell.edge === true) {
        graph.setCellsEditable(true);
        menu.addItem("Удалить соединение", null, () => {
          graph.removeCells([cell]);
          mx.mxEvent.consume(evt);
        });
      } else {
        menu.addItem("Добавить/изменить дочерний компонент", null, () => {
          if (
            graph.isEnabled() &&
            !mx.mxEvent.isConsumed(evt) &&
            cell != null &&
            graph.isCellEditable(cell)
          ) {
            if (graph.model.isEdge(cell)) {
              graph.startEditingAtCell(cell);
            } else {
              const modalCont = document.createElement("div");
              modalCont.id = "modal";
              modalCont.className = "modalCont";

              childCellModal(
                graph,
                `Дочерние компоненты блока ${cell.mxObjectId}`,
                modalCont,
                600,
                400,
                cell,
              );
            }
          }
        });
        menu.addItem("Удалить блок", null, () => {
          graph.removeCells([cell]);
          mx.mxEvent.consume(evt);
        });
      }
    }
  }

  //return <></>;
};

export default CreatePopupMenu;
