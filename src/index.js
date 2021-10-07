import "@atlaskit/css-reset";
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Column from "./column";
import initialData from "./initial-data";

const Container = styled.div`
  display: flex;
`;

class App extends Component {
  state = initialData;

  onDragStart = (start) => {
    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex,
    });
  };

  onDragEnd = (result) => {
    this.setState({
      homeIndex: null,
    });

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    //moving from one list to another
    const startTaskIds = Array.from(start.taskIds); //old col task ids
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    //updating state
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };
  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => this.state.tasks[taskId]
            );

            const isDropDisabled = index < this.state.homeIndex;
            return (
              <Column
                isDropDisabled={isDropDisabled}
                key={column.id}
                column={column}
                tasks={tasks}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
