import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const QuestionPopup = ({id}) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["question"],
        queryFn: () => axios.get("http://localhost:3001/api/quest/").then((data) => {
            console.log(data);
            return data;
        }),
    });

    function send() {
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var lat = document.getElementById("lat").value;
        var lng = document.getElementById("lng").value;
        var answer = document.getElementById("answer").value;
        var info = document.getElementById("summernote").value;
        var order = document.getElementById("order").value;
        var data = {
            "name": name,
            "address": address,
            "lat": lat,
            "lng": lng,
            "answer": answer,
            "info": info,
            "order": order
        };
        console.log(data)
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://ngwx.mooo.com:8086/api/quest/");
        // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // xhr.send(JSON.stringify(data));
        // xhr.onreadystatechange = function() {
        //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        //         alert("success");
        //     }
        // }
    }

    function closePopup() {
        document.getElementById("question-popup").style.display = "none";
    }

    return (
        <div className="question-popup" id="question-popup">
        <div className="row">
            <div className="col-xl-12">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div className="card-body">
                            <div className="row mt-0 justify-content-end">
                                <div className="col-sm-1" style={{display: 'flex', justifyContent: 'end'}}>
                                <button type="button" className="btn btn-close mt-auto" onClick={closePopup}></button>
                            </div>
                              </div>
                            <form>
                              <div className="row">
                                <div className="col-2 justify-content-end">
                                    <label className="form-label">Order</label>
                                    <input type="number" className="form-control" placeholder="Order" min="1" id="order"/>
                                </div>
                                <div className="col-4">
                                    <label className="form-label" >Name</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label" >Address</label>
                                    <input type="text" className="form-control" id="address"/>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                    <label className="form-label" >Lat</label>
                                    <input type="number" className="form-control" id="lat"/>
                                </div>
                                <div className="col-6">
                                    <label className="form-label" >Long</label>
                                    <input type="number" className="form-control" id="lng" />
                                </div>
                              </div>
                              <div style={{height: "300px"}} className="row">
                                <label className="form-label">Map</label>
                                <div id="map" style={{height: "200px"}}>
                                    <h4>ưhat</h4>
                                </div>
                              </div>
                              <div className="row mt-5">
                                <div clas="col-12">
                                    <label className="form-label">Answer</label>
                                    <input type="text" className="form-control" id="answer"/>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                    <label className="form-label">Info</label>
                                    <div id="summernote">Hello Summernote</div>
                                </div>
                              </div>
                              <div className="row mt-3 justify-content-between">
                                    <button type="button" className="btn btn-primary mt-auto" onClick={send}>Save</button>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};


export default QuestionPopup;