import React from 'react'
import styled from 'styled-components'
import withDataFetching from '../withDataFetching'
import Ticket from '../components/Ticket/Ticket'

const TicketsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	margin: 5%;
	@media (max-width: 768px) {
		flex-direction: column;
	}`

const Alert = styled.div`text-align: center;`

const onDragStart = (e, id) => {
    e.preventDefault()
  };

const Tickets = ({ loading, data, onDragStart, error }) => (
	<TicketsWrapper>
		{(loading || error) && <Alert>{loading ? 'Loading...' : error}</Alert>}
		{data.map(ticket => <Ticket key={ticket.id}  marginRight ticket={ticket} onDragStart={onDragStart}/>)}
	</TicketsWrapper>
	)

export default withDataFetching(Tickets)