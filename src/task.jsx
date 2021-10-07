import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "Lightgreen" : "white")};
  display: flex;
`;

// const Handler = styled.div`
//   background-color: orange;
//   width: 20px;
//   height: 20px;
//   margin: 2px;
//   border-radius: 2px;
// `;
export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* <Handler {...provided.dragHandleProps}></Handler> */}
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
