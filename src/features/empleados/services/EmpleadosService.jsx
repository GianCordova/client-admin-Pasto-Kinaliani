const API = "http://localhost:3000/empleados";

export const getEmpleados = async () => {
    const res = await fetch(API);
    return res.json();
};

export const createEmpleado = async (data) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const updateEmpleado = async (id, data) => {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const deleteEmpleado = async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    return res.json();
};