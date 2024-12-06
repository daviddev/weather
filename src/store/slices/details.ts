import { City, Record } from "../../interface";
import { createSlice } from "@reduxjs/toolkit";

interface State {
    city: City | null;
    unit: "celsius" | "fahrenheit";
    query: string;
    cities: City[];
    record: Record | null;
}

const initialState: State = {
    city: null,
    unit: "celsius",
    query: "",
    cities: [],
    record: null
};

const { actions, reducer } = createSlice({
    name: "DETAILS",
    initialState,
    reducers: {
        setCity: (state, { payload }) => {
            state.city = payload;
        },
        setUnit: (state, { payload }) => {
            state.unit = payload;
        },
        setQuery: (state, { payload }) => {
            state.query = payload;
        },
        setCities: (state, { payload }) => {
            state.cities = payload;
        },
        setRecord: (state, { payload }) => {
            state.record = payload;
        }
    }
});

export const { setCity, setUnit, setQuery, setCities, setRecord } = actions;

export default reducer;
