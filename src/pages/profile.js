import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useToken from "../utils/auth";

export default function Profile() {
    const { token } = useToken();
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: "profile",
        queryFn: () => axios.get("http://localhost:3001/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)

    });
    console.log(data);

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    function updateProfile() {
        const newPassword = document.getElementById("newPassword").value;
        const confirmNewPassword = document.getElementById("confirmNewPassword").value;
        const profileImage = document.getElementById("profileImage").files[0];

        document.getElementById("newPassword").value = "";
        document.getElementById("confirmNewPassword").value = "";
        document.getElementById("profileImage").value = "";

        const formData = new FormData();
        formData.append("newPassword", newPassword);
        formData.append("confirmNewPassword", confirmNewPassword);
        formData.append("profileImage", profileImage);

        axios.post("http://localhost:3001/auth/profile", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log(res);
            refetch();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={updateProfile}>
                        <div className="row">
                            <div className="col-md-9">
                                <input type="hidden" name="id" value={data._id} />
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={data.email} readOnly />
                                <label htmlFor="newPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="newPassword" placeholder="Password" />
                                <label htmlFor="confirmNewPassword" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmNewPassword" placeholder="Password" />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="profileImage" className="form-label">Profile Image</label>
                                <br />
                                <img src={data.image} alt="Profile" style={{ width: "200px" }} />
                                <br />
                                <input className="form-control" type="file" id="profileImage" accept="image/*" onChange={updateProfile} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div className="col-12">
                    <h1>Profile</h1>
                    <p>Email: {data.email}</p>
                    <p>Orders: {data.orders.length}</p>
                    <p>Quests: {data.quests.length}</p>
                    <p>Attempts: {data.attempts.length}</p>
                </div> */}
            </div>
            <div className="row">
                <div className="col-12">
                    <h1>Attempts</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Quest</th>
                                <th scope="col">Status</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.attempts.map(attempt => (
                                <tr key={attempt._id}>
                                    <td>{attempt.quest.title}</td>
                                    <td>{attempt.status}</td>
                                    <td>{attempt.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-12">
                    <h1>Purchased Quests</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Quest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.quests.map(quest => (
                                <tr key={quest.quest._id}>
                                    <td>{quest.quest.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                                
                <div className="col-12">
                    <h1>Orders</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Quest</th>
                                <th scope="col">Status</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order.quest.title}</td>
                                    <td>{order.status}</td>
                                    <td>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}