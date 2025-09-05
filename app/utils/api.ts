export const API_BASE = "http://192.168.87.30/requests/v1";

export const BASE_URL = "http://192.168.87.30"
export const API_KEY = "0abb68a42da22fb9d5fe7ed7d1a918b81c9355920cafd707dde065749169f774";

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