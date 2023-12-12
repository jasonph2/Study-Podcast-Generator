const API_BASE_URL = "http://127.0.0.1:5000";

export async function helloWorld() {
    try {
        const response = await fetch(`${API_BASE_URL}/test`, {
            method: "GET",
            mode:"cors",
            headers: {
              "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("fetch failed");
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error in fetchData: ${error.message}`);
    }
}

export async function addEntry({name, file_name, familiarity}) {
    try {
        const response = await fetch(`${API_BASE_URL}/addentry`, {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                word: name,
                path: file_name,
                familiarity: familiarity
            })
        });
        if (!response.ok) {
            throw new Error("fetch failed");
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error in fetchData: ${error.message}`);
    }
}

export async function removeEntry({path}) {
    try {
        const response = await fetch(`${API_BASE_URL}/removeentry`, {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                path: path,
            })
        });
        if (!response.ok) {
            throw new Error("fetch failed");
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error in fetchData: ${error.message}`);
    }
}