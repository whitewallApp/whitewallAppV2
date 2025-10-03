import configData from "../utils/config.json";

export const API_BASE = configData.base_url + configData.api_base
export const BASE_URL = configData.base_url;
export const API_KEY = configData.api_key;

export async function fetchData(apiKey: string) {
    console.log(`${API_BASE}/data?apikey=${apiKey}`);
    
    try {
        const response = await fetch(`${API_BASE}/data?apikey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }

}

export async function fetchBranding(apiKey: string) {
    try {
        const response = await fetch(`${API_BASE}/branding?apikey=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }

}