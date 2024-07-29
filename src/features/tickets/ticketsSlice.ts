import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../../app/store';

export interface TicketTime {
    startTime: string;
    endTime: string;
}

export interface Ticket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: 'RUB';
    time: TicketTime;
    duration: number;
    date: string;
    name: string;
    img: string;
    transplants: string;
    connectionAmount: number | null;
}

const ticketsAdapter = createEntityAdapter<Ticket>();

const initialState = ticketsAdapter.getInitialState({
    loading: false,
    error: null as string | null,
    currentPage: 1,
    filters: {
        transplants: [] as string[],
        companies: [] as string[],
    },
});

export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async (params: { filter?: string; sort?: string; company?: string; page?: number } = {}) => {
        const {filter, sort, company, page} = params;
        let url = 'http://localhost:3000/tickets';
        if (filter) {
            url += `?${filter}`;
        }
        if (sort) {
            url += `${filter ? '&' : '?'}${sort}`;
        }
        if (company) {
            url += `${filter || sort ? '&' : '?'}company=${company}`;
        }
        if (page) {
            url += `${filter || sort || company ? '&' : '?'}_page=${page}&_limit=5`;
        }
        // console.log('Fetching from URL:', url);
        const response = await axios.get(url);
        let tickets = response.data as Ticket[];
        return tickets;
    }
);

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTransplantsFilter(state, action) {
            state.filters.transplants = action.payload;
        },
        setCompaniesFilter(state, action) {
            state.filters.companies = action.payload;
        },
        incrementPage(state) {
            state.currentPage += 1;
        },
        resetPage(state) {
            state.currentPage = 1;
        },
        setSort(state, action) {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTickets.fulfilled, (state, action) => {

            ticketsAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch tickets';
        });
    },
});

export const {setTransplantsFilter, setCompaniesFilter, incrementPage, resetPage, setSort} = ticketsSlice.actions;

export const {selectAll: selectAllTickets} = ticketsAdapter.getSelectors((state: RootState) => state.tickets);

export default ticketsSlice.reducer;
