import React, { useState, useEffect } from "react";
import "./styles/App.css";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import DeleteButton from "./components/DeleteButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const API_ENDPOINT =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const ROWS_PER_PAGE = 10;

const App = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleBackdropOpen = () => {
        setBackdropOpen(true);
    };

    const handleBackdropClose = () => {
        setBackdropOpen(false);
    };

    useEffect(() => {
        handleBackdropOpen();
        fetch(API_ENDPOINT)
            .then((response) => response.json())
            .then((data) => {
                const initialUsers = data.map((user) => ({
                    ...user,
                    selected: false,
                }));
                setUsers(initialUsers);
                setFilteredUsers(initialUsers);
            })
            .finally(() => {
                setLoading(false);
                handleBackdropClose();
            });
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const handleEdit = (userId, field, newValue) => {
        const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, [field]: newValue } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleDelete = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSelect = (userId) => {
        const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, selected: !user.selected } : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleSelectAll = () => {
        const updatedUsers = users.map((user, index) =>
            index >= (currentPage - 1) * ROWS_PER_PAGE &&
            index < currentPage * ROWS_PER_PAGE
                ? { ...user, selected: !user.selected }
                : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleDeleteSelected = () => {
        const updatedUsers = users.filter((user) => !user.selected);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    return (
        <>
            {loading == true ? null : (
                <div className="App">
                    <div className="header">
                        <div className="search-bar">
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleSearch={() => {}}
                            />
                        </div>
                        <div>
                            {!loading && (
                                <DeleteButton
                                    handleDeleteSelected={handleDeleteSelected}
                                />
                            )}
                        </div>
                    </div>

                    <UserTable
                        users={filteredUsers.slice(
                            (currentPage - 1) * ROWS_PER_PAGE,
                            currentPage * ROWS_PER_PAGE
                        )}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleSelect={handleSelect}
                        handleSelectAll={handleSelectAll}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(
                            filteredUsers.length / ROWS_PER_PAGE
                        )}
                        handlePageChange={handlePageChange}
                    />
                </div>
            )}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                open={backdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default App;
