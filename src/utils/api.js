import axios from "axios";

const BASE_URL = "https://proxy.shivamch17.workers.dev/?url=";
const API_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const encodedUrl = encodeURIComponent(API_URL + url);
        const { data } = await axios.get(`${BASE_URL}${encodedUrl}`, {
            headers,
            params,
        });

        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
