const API = "http://localhost:3000/usuarios";

export const getUsuarios = async () => {
    const res = await fetch(API);
    return res.json();
};

export const createUsuario = async (data) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const updateUsuario = async (id, data) => {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const deleteUsuario = async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    return res.json();
};