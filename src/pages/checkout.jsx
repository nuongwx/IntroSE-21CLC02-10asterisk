import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Checkout() {

    const { questId } = useParams();
    const { isLoading, error, data } = useQuery({
        queryKey: ["quest", questId],
        queryFn: () => axios.get(`http://localhost:3001/api/quest/${questId}`),
    });

    const [screen, setScreen] = useState("checkout");

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    function handleCheckout() {
        document.getElementById("checkout").style.display = "block";
        document.getElementById("payment").style.display = "none";
    }

    function handlePayment() {
        document.getElementById("checkout").style.display = "none";
        document.getElementById("payment").style.display = "block";
    }

    function createOrder() {
        axios.post("http://localhost:3001/api/order", {
            quest: questId,
            email: document.getElementById("email").value,
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    // yes, this is a *very* inefficient way of doing it
    function checkEmail() {
        axios.get("http://localhost:3001/api/user").then((res) => {
            console.log(res.data);
            let emails = res.data.map((user) => user.email);
            console.log(emails);
            if (emails.includes(document.getElementById("email").value)) {
                const user = res.data.find((user) => user.email === document.getElementById("email").value);
                const id = user.id;
                // check if purchase history includes quest
                axios.get("http://localhost:3001/api/order").then((res) => {
                    console.log(res.data);
                    let purchased = res.data.some((order) => order.quest === questId && order.user === id);
                    console.log(purchased);
                    if (purchased) {
                        document.getElementById("email").setCustomValidity("You have already purchased this quest");
                    } else {
                        document.getElementById("email").setCustomValidity("");
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                document.getElementById("email").setCustomValidity("Email is not registered");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="container">
            <div className="row mb-lg-5">
                <div className="col-lg-7 col-sm-12" id="checkout-form">
                    <div className="row mt-4">
                        <div className="col fw-semibold">
                            <span>Checkout </span>
                            <i class="fa-solid fa-chevron-right mx-2"></i>
                            <span> Payment</span>
                        </div>
                    </div>
                    <div id="checkout">
                        <form className="needs-validation" noValidate="" action="javascript:void(0);" onSubmit={handlePayment}>
                            <div className="row mb-2">
                                <h4 className="mt-4">Billing details</h4>
                            </div>
                            <div className="row mb-4">
                                <div className="col-12 mb-3" style={{ textAlign: "start" }}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="firstName" required />
                                    <div className="invalid-feedback"> Valid first name is required. </div>
                                </div>
                                <div className="col-12 mb-3" style={{ textAlign: "start" }}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" required />
                                    <div className="invalid-feedback"> Valid last name is required. </div>
                                </div>
                                <div className="col-12 mb-3" style={{ textAlign: "start" }}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" required onInput={checkEmail} />
                                    <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                                </div>
                            </div>
                            <div className="d-flex mt-4 justify-content-start">
                                <button type="submit" className="btn btn-default btn-home-bg btn-pay">Continue to payment</button> &nbsp;
                            </div>
                        </form>

                    </div>
                    <div id="payment" style={{ display: "none" }}>
                        <div className="row mt-4">
                            <div className="col-12">
                                <div className="row mb-2">
                                    <h4 className="mt-4">Select payment method</h4>
                                    <p className="text-muted">All transactions are secure and encrypted.</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center gap-3" style={{ marginBottom: "10px", maxWidth: "260px" }}>
                                        <input type="radio" name="payment-method" id="credit-card" autocomplete="off" />
                                        <label className="fw-bold" for="credit-card">Credit Card</label>
                                        <i className="bi bi-credit-card"></i>
                                    </div>
                                    <div className="d-flex align-items-center gap-3" style={{ marginBottom: "10px", maxWidth: "260px" }}>
                                        <input type="radio" name="payment-method" id="paypal" autocomplete="off" />
                                        <label className="fw-bold" for="paypal">PayPal</label>
                                        <i className="bi bi-paypal"></i>
                                    </div>
                                    <div className="d-flex align-items-center gap-3" style={{ marginBottom: "10px", maxWidth: "260px" }}>
                                        <input type="radio" name="payment-method" id="bank-transfer" autocomplete="off" />
                                        <label className="fw-bold" for="bank-transfer">Bank Transfer</label>
                                        <i className="bi bi-bank2"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mt-4 justify-content-start">
                            <button name="button" type="button" onClick={handleCheckout} form="checkout-form" className="btn btn-default btn-home-bg btn-pay">Back</button> &nbsp;
                            <button name="button" type="submit" onClick={createOrder} form="checkout-form" className="btn btn-default btn-home-bg btn-pay">Pay</button> &nbsp;
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-sm-12 p-3 pt-0 pt-md-3 rounded" id="checkout-summary">
                    <div style={{ position: "sticky", top: "30px", border: "1px solid #f1f1f1", borderRadius: "10px", padding: "20px 20px 20px", margin: "5px" }}>
                        <div className="d-flex mb-4 pb-2 gap-3">
                            <div className="d-flex">
                                <img src={data.data.image} />
                            </div>
                            <div className="align-self-center">
                                <div className="d-flex flex-row align-items-center gap-3">
                                    <div className="fw-bold">{data.data.averageRating}</div>
                                </div>
                                <div className="fw-bold">{data.data.title}</div>
                                <div className="text-muted">{data.data.price}</div>
                            </div>
                        </div>
                        <div className="d-flex mb-lg-2">
                            <span className="me-auto">Quantity:</span>
                            <span>1</span>
                        </div>
                        <div className="d-flex mb-lg-2">
                            <span className="me-auto">Subtotal:</span>
                            <span>{data.data.price}</span>
                        </div>
                        <div className="d-flex fw-bold fs-5">
                            <span className="me-auto">Total:</span>
                            <span>{data.data.price}</span>
                        </div>
                        <hr />
                        <div className="mt-4 gap-3" style={{ display: "flex", flexDirection: "column" }}>
                            <div className="row">
                                <div className="col icon">
                                    <i className="bi bi-credit-card"></i>
                                </div>
                                <div className="col-11 d-flex flex-column">
                                    <div className="fw-bold mb-2">Easy refunds and returns</div>
                                    <div className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="mt-4 gap-3">
                            <i>By proceeding with payment, you agree to our <a href="" target="_blank">Terms &amp; Conditions</a>.
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
