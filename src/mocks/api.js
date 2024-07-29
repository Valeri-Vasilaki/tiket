const tickets = [{
    id: 1,
    from: 'Moscow',
    to: 'New York',
    company: 'Aeroflot',
    price: 30000,
    currency: 'RUB',
    time: {startTime: '2024-06-01T08:00', endTime: '2024-06-01T16:00'},
    duration: 480,
    date: '2024-06-01',
    connectionAmount: 0,
    img: '7.png',
    transplants: 'Без пересадок'
},
];


module.exports = (req, res) => {
    const {filter, sort, company} = req.query;
    let filteredTickets = tickets;
    console.log(filter)
    if (filter) {
        const filters = filter.split('&');
        filters.forEach((f) => {
            const [key, value] = f.split('=');
            if (key === 'company') {
                filteredTickets = filteredTickets.filter((ticket) => ticket.company === value);
            }
            if (key === 'transfers') {
                filteredTickets = filteredTickets.filter((ticket) => ticket.connectionAmount === value);
            }
        });
    }

    if (sort === '_sort=price&_order=asc') {
        filteredTickets.sort((a, b) => a.price - b.price);
    } else if (sort === '_sort=price&_order=desc') {
        filteredTickets.sort((a, b) => b.price - a.price);
    } else if (sort === '_sort=duration&_order=asc') {
        filteredTickets.sort((a, b) => a.duration - b.duration);
    } else if (sort === '_sort=duration&_order=desc') {
        filteredTickets.sort((a, b) => b.duration - a.duration);
    } else if (sort === '_sort=optimal') {
        filteredTickets.sort((a, b) => {
            const aOptimal = a.price / a.duration;
            const bOptimal = b.price / b.duration;
            return aOptimal - bOptimal;
        });
    }

    res.status(200).json(filteredTickets);
};
