import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';

const ListUserComponent = () => {
    const [users, setUsers] = useState([]); // Kullanıcıları tutacak state
    const [loading, setLoading] = useState(true); // Yükleniyor durumu

    useEffect(() => {
        // Kullanıcıları yükle
        UserService.getAllUsers()
            .then((response) => {
                setUsers(response.data); // Gelen verileri state'e ata
                setLoading(false); // Yükleniyor durumunu kapat
            })
            .catch((error) => {
                console.error("Kullanıcıları yüklerken hata oluştu:", error);
                setLoading(false); // Hata durumunda da yükleniyor durumunu kapat
            });
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>; // Yükleniyor durumu
    }

    if (users.length === 0) {
        return <div>User didn't find.</div>; // Kullanıcı yoksa mesaj göster
    }

    return (
        <div className="container">
            <h2 className="text-center">User List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.createdAt}</td>
                            <td>{user.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUserComponent;
