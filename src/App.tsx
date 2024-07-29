import React from 'react';
import TicketList from './components/TicketList';
import {useDispatch} from 'react-redux';
import {fetchTickets} from './features/tickets/ticketsSlice';
import {AppDispatch} from './app/store';


const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleSortByPrice = () => {
        dispatch(fetchTickets({sort: '_sort=price&_order=asc'}));
    };

    const handleSortByDuration = () => {
        dispatch(fetchTickets({sort: '_sort=duration&_order=asc'}));
    };

    const handleSortByOptimal = () => {
        dispatch(fetchTickets({sort: '_sort=optimal'}));
    };

    const handleSortByTransplants = () => {
        dispatch(fetchTickets({sort: '_sort=transplants&_order=asc'}));
    };

    const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const {checked} = event.target;
        const {name} = event.target;

        if (checked) {
            dispatch(fetchTickets({filter: `${name}=${value}`}));
        } else {
            dispatch(fetchTickets({}));
        }
    };
    handleSortByPrice();
    return (
        <div>
            <header><img src="logo.png" alt="logo"/> <span>Поиск авиабилетов</span></header>
            <div className="app">
                <div className="filters">
                    <div className="filter row">
                        <span>Количество пересадок</span>
                        <label>
                            <input type="radio" name="connectionAmount" value="0" onChange={handleCompanyChange}/>
                            Без пересадок
                        </label>
                        <label>
                            <input type="radio" name="connectionAmount" value="1" onChange={handleCompanyChange}/>
                            1 пересадка
                        </label>
                        <label>
                            <input type="radio" name="connectionAmount" value="2" onChange={handleCompanyChange}/>
                            2 пересадки
                        </label>
                        <label>
                            <input type="radio" name="connectionAmount" value="3" onChange={handleCompanyChange}/>
                            3 пересадки
                        </label>
                    </div>
                    <div className="filter row">
                        <span>Компании</span>
                        <label>
                            <input type="radio" name="company" value="Победа" onChange={handleCompanyChange}/>
                            Победа
                        </label>
                        <label>
                            <input type="radio" name="company" value="Red Wings" onChange={handleCompanyChange}/>
                            Red Wings
                        </label>
                        <label>
                            <input type="radio" name="company" value="S7 Airlines" onChange={handleCompanyChange}/>
                            S7 Airlines
                        </label>
                    </div>
                </div>
                <div className="tickets">
                    <div className="sort">
                        <button onClick={handleSortByPrice}>Самый дешевый</button>
                        <button onClick={handleSortByDuration}>Самый быстрый</button>
                        <button onClick={handleSortByOptimal}>Самый оптимальный</button>
                        <button onClick={handleSortByTransplants}>По количеству пересадок</button>
                    </div>
                    <TicketList/>
                    <button className="more">Загрузить еще билеты</button>
                </div>
            </div>
        </div>
    );
};

export default App;
