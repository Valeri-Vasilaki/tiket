import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectAllTickets } from '../features/tickets/ticketsSlice';
import Time from 'react-time-format';

const TicketList: React.FC = () => {
  const tickets = useSelector((state: RootState) => selectAllTickets(state));
  const loading = useSelector((state: RootState) => state.tickets.loading);
  const error = useSelector((state: RootState) => state.tickets.error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {tickets.map((ticket) => (
        <div className="ticket" key={ticket.id}>
          <div>
            <div className="price">{ticket.price.toLocaleString('ru')} {ticket.currency}</div>
            <br />
            <div className="name"><span className="color1">{ticket.name}</span></div>
            <span className="color2"><Time value={ticket.time.startTime} format="HH:mm" /> - <Time
              value={ticket.time.endTime}
              format="HH:mm" /></span>
          </div>
          <div>
            <span className="color1">В пути</span><br />
            <span className="color2">{ticket.duration} минут</span>
          </div>
          <div>
            <img src={ticket.img} alt="ticket image" />
            <div className="transplants">
              <span className="color1">Пересадки</span><br />
              <span className="color2">{ticket.transplants}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
