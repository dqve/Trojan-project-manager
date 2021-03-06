import React from 'react'
import styled from 'styled-components'
import withDataFetching from '../withDataFetching'
import Lane from '../components/Lane/Lane'

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }`

class Board extends React.Component {

  constructor() {
    super();
    this.state = {
      tickets: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ tickets: this.props.data });
    }
  }

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
    console.log("draging started")
  };

  onDragOver = e => {
    e.preventDefault();
    console.log("draging stopped")
  };

  onDrop = (e, laneId) => {
      const id = e.dataTransfer.getData('id');
      const tickets = this.state.tickets.filter(ticket => {
          if (ticket.id === id) {
              ticket.board = laneId;
          }
          return ticket;
      });
      this.setState({
          ...this.state,
          tickets,
      });
      console.log("object dropped")
  };


  render() {
    const { lanes, loading, error } = this.props;
    return (
      <BoardWrapper>
        {lanes.map(lane => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            tickets={this.state.tickets.filter(ticket => ticket.lane === lane.id)}
          />
        ))}
      </BoardWrapper>
    );
  }
}

export default withDataFetching(Board)