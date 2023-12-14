import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Table from "../../components/Table";
import Layout from "./layout";

import Card from "../../components/Card";

const QuestList = () => {
    const { data, isPending, isLoading, error } = useQuery({
        queryKey: ["quest"],
        queryFn: () =>
            axios
                .get("http://localhost:3000/api/quest/")
                .then((data) => {
                    console.log(data);
                    return data;
                }),
    });

    const columns = [
        // { path: "id", label: "ID" },
        { path: "title", label: "Title" },
        { path: "description", label: "Description" },
        { label: "edit", key: "edit", content: (item) => <a href={`/management/${item.id}`}><button type="button" className="btn btn-primary">Edit</button></a> },
    ];

    function addQuest() {
        axios.post("http://localhost:3000/api/quest/", {
            title: "New Quest",
            description: "New Quest Description"
        })
            .then((response) => {
                window.location.replace(`/management/${response.data.id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (isLoading || isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <Layout>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4"><span class="text-muted fw-light">Quests /</span> Management</h4>
                <div class="card">
                    <h5 class="card-header">All quests</h5>
                    <button type="button" className="btn btn-primary" onClick={addQuest}>Add Quest</button>
                    <div class="table-responsive text-nowrap">
                        <Table columns={columns} data={data?.data} sortColumn={{ path: "id", order: "asc" }} onSort={(sortColumn) => console.log(sortColumn)} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default QuestList;
