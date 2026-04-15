const API = "http://localhost:3000/reservaciones";

export const getReservaciones = async () => {
    const res = await fetch(API);
    return res.json();
};

export const createReservacion = async (data) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const updateReservacion = async (id, data) => {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const deleteReservacion = async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    return res.json();
};