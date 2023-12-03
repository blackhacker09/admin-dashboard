import React, { useState } from "react";

const UserRow = ({
    user,
    editingId,
    handleEdit,
    handleDelete,
    handleSelect,
    handleSaveClick,
    handleEditClick,
}) => (
    <tr
        key={user.id}
        className={`${user.selected ? "selected" : ""} ${
            editingId === user.id ? "editing" : ""
        }`}
    >
        <td>
            <input
                type="checkbox"
                onChange={() => handleSelect(user.id)}
                checked={user.selected}
            />
        </td>
        <td>
            {editingId === user.id ? (
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) =>
                        handleEdit(user.id, "name", e.target.value)
                    }
                />
            ) : (
                user.name
            )}
        </td>
        <td>
            {editingId === user.id ? (
                <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                        handleEdit(user.id, "email", e.target.value)
                    }
                />
            ) : (
                user.email
            )}
        </td>
        <td>
            {editingId === user.id ? (
                <input
                    type="text"
                    value={user.role}
                    onChange={(e) =>
                        handleEdit(user.id, "role", e.target.value)
                    }
                />
            ) : (
                user.role
            )}
        </td>
        <td>
            {editingId === user.id ? (
                <button
                    onClick={() => handleSaveClick(user.id)}
                    className="save-button"
                >
                    Save
                </button>
            ) : (
                <>
                    <button
                        onClick={() => handleEditClick(user.id)}
                        className="edit-button"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(user.id)}
                        className="delete-button"
                    >
                        Delete
                    </button>
                </>
            )}
        </td>
    </tr>
);

const UserTable = ({
    users,
    handleEdit,
    handleDelete,
    handleSelectAll,
    handleSelect,
}) => {
    const [editingId, setEditingId] = useState(null);

    const handleEditClick = (userId) => {
        setEditingId(userId);
    };

    const handleSaveClick = (userId) => {
        setEditingId(null);
    };

    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={users.every((user) => user.selected)}
                        />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UserRow
                        key={user.id}
                        user={user}
                        editingId={editingId}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleSelect={handleSelect}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
