import React, { useState, useEffect } from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill';

import Layout from './layout'
import QuestionPopup from '../../components/QuestionPopup'
import Table from '../../components/Table'

const QuestEditor = ({ id }) => {
    id = window.location.href.split("/").pop().substring(0, 24);

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['questEditor'],
        queryFn: () =>
            axios
                .get("http://localhost:3001/api/quest/" + id)
                .then((res) => {
                    return res.data;
                }),

    });


    // display question popup with data from the selected question
    const [question, setQuestion] = useState({
        location: {
            coordinates: [0, 0]
        }
    });

    // editor
    const [value, setValue] = useState('');


    function getData() {
        var order = document.getElementById("order").value;
        var question = document.getElementById("question").value;
        var answer = document.getElementById("answer").value;
        var info = value;

        var lat = document.getElementById("lat").value;
        var long = document.getElementById("long").value;

        var data = {
            "order": order,
            "question": question,
            "answer": answer,
            "location": {
                coordinates: [lat, long]
            },
            "info": info,
        };
        return data;
    }

    function clearData() {
        document.getElementById("order").value = "";
        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";
        document.getElementById("lat").value = "";
        document.getElementById("long").value = "";
        setValue("");
        setQuestion({
            location: {
                coordinates: [0, 0]
            }
        });
    }

    function addQuestion() {
        setQuestion({
            location: {
                coordinates: [0, 0]
            }
        });
        showPopup();
    }

    function editQuestion(item) {
        setQuestion(item);
        showPopup();
    }

    function sendQuestion() {
        const data = getData();
        console.log(data);
        console.log(question);
        console.log("send question");
        if (question._id != null) {
            axios.put("http://localhost:3001/api/quest/" + id + "/questions/" + question._id, data).then((res) => {
                console.log("axios put");
                refetch();

            });
        } else {
            axios.post("http://localhost:3001/api/quest/" + id + "/questions", data).then((res) => {
                console.log("axios post");
                refetch();

            });

        }
        closePopup();
    }

    function deleteQuestion(item) {
        axios.delete("http://localhost:3001/api/quest/" + id + "/questions/" + item._id).then((res) => {
            refetch();
        });
    }

    function showPopup() {
        document.getElementById("question-popup").style.display = "block";
    }

    function closePopup() {
        document.getElementById("question-popup").style.display = "none";
        clearData();
    }

    function saveQuest() {
        var title = document.getElementById("quest-title").value;
        var description = document.getElementById("quest-description").value;
        var city = document.getElementById("quest-city").value;
        var duration = document.getElementById("quest-duration").value;
        var distance = document.getElementById("quest-distance").value;
        var price = document.getElementById("quest-price").value;
        var commission = document.getElementById("quest-commission").value;

        var data = {
            "title": title,
            "description": description,
            // "city": city,
            "duration": duration,
            "distance": distance,
            "price": price,
            "commission": commission,
        };
        console.log(data);

        axios.put("http://localhost:3001/api/quest/" + id, data).then((res) => {
            console.log("axios put");
            refetch();
        });
    }

    function deleteQuest() {
        console.log("delete quest");
        axios.delete("http://localhost:3001/api/quest/" + id).then((res) => {
        });
    }

    function uploadImage() {
        var file = document.getElementById("quest-image-upload").files[0];
        if (!file) return;
        var formData = new FormData();
        formData.append("image", file);
        axios.post("http://localhost:3001/api/quest/" + id + "/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log("axios post");
            document.getElementById("quest-image-upload").value = "";
            refetch();
        });
    }

    function deleteImage(item) {
        axios.delete("http://localhost:3001/api/quest/" + id + "/image/", {
            data: {
                image: item
            }
        }).then((res) => {
            console.log("axios delete");
            refetch();
        });
    }

    useEffect(() => {
        console.log(question);
        if (question._id != null) {
            document.getElementById("order").value = question.order;
            document.getElementById("question").value = question.question;
            document.getElementById("answer").value = question.answer;
            document.getElementById("lat").value = question.location.coordinates[0];
            document.getElementById("long").value = question.location.coordinates[1];
            setValue(question.info);
        }
    }, [question]);


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            <div className="question-popup" id="question-popup">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <div className="card-body">
                                    <div className="row mt-0 justify-content-end">
                                        <div className="col-sm-1" style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="btn btn-close mt-auto" onClick={closePopup}></button>
                                        </div>
                                    </div>
                                    <form action="javascript:void(0)" onSubmit={sendQuestion}>
                                        <div className="row">
                                            <div className="col-2 justify-content-end">
                                                <label className="form-label">Order</label>
                                                <input required type="number" className="form-control" placeholder="Order" min="1" id="order" defaultValue={question.order} />
                                            </div>
                                            <div className="col-4">
                                                <label className="form-label" >Question</label>
                                                <input required type="text" className="form-control" id="question" defaultValue={question.question} />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label" >Address</label>
                                                <input required type="text" className="form-control" id="address" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label className="form-label" >Lat</label>
                                                <input required type="number" className="form-control" id="lat" />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label" >Long</label>
                                                <input required type="number" className="form-control" id="long" />
                                            </div>
                                        </div>
                                        <div style={{ height: "300px" }} className="row">
                                            <label className="form-label">Map</label>
                                            <div id="map" style={{ height: "300px" }}>
                                                <iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style={{ border: '0', borderRadius: '20px', padding: '0' }} src={"https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=" + "" +"&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"}></iframe>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div clas="col-12">
                                                <label className="form-label">Answer</label>
                                                <input required type="text" className="form-control" id="answer" defaultValue={question.answer} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <label className="form-label">Info</label>
                                                {/* <div id="summernote">Hello Summernote</div> */}
                                                <ReactQuill id="editor" defaultValue={question.info} value={value} onChange={setValue} />
                                            </div>
                                        </div>
                                        <div className="row mt-3 justify-content-between">
                                            <button type="submit" className="btn btn-primary mt-auto">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Layout>
                <div className="container-xxl flex-grow-1 container-p-y">
                    <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Forms/</span> Vertical Layouts</h4>
                    <div className="row">
                        <div className="col-xl">
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <a href="/management" className="btn btn-outline-primary">Back</a>
                                    <div>
                                        {/* <Link to="/management" reloadDocument> */}
                                            <button form='quest-form' type="submit" className="btn btn-primary" onClick={saveQuest}>Save</button>
                                            <button type="button" className="btn btn-danger" onClick={deleteQuest}>Delete</button>
                                        {/* </Link> */}
                                    </div>

                                </div>
                                <div className="card-body">
                                    <form id="quest-form" action="javascript:void(0)">
                                        <div className="row">
                                            <div className="col">
                                                <label className="col-2 col-form-label">Title</label>
                                                <input className="form-control" type="text" id="quest-title" required defaultValue={data.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-9">
                                                <label className="col-form-label">Description</label>
                                                <input className="form-control" type="text" id="quest-description" required defaultValue={data.description} />
                                            </div>
                                            <div className="col-3">
                                                <label className="col-form-label">City</label>
                                                <br />
                                                <div className="btn-group" id="quest-city" role="group" aria-label="Basic checkbox toggle button group">
                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Select City
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="#">Hà Nội</a></li>
                                                        <li><a className="dropdown-item" href="#">Hồ Chí Minh</a></li>
                                                        <li><a className="dropdown-item" href="#">Đà Nẵng</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                <label className="col-form-label">Duration</label>
                                                <input className="form-control" type="number" id="quest-duration" required defaultValue={data.duration} />
                                            </div>
                                            <div className="col-3">
                                                <label className="col-form-label">Distance</label>
                                                <input className="form-control" type="number" id="quest-distance" required defaultValue={data.distance} />
                                            </div>
                                            <div className="col-3">
                                                <label className="col-form-label">Price</label>
                                                <input className="form-control" type="number" id="quest-price" required defaultValue={data.price} min="0" />
                                            </div>
                                            <div className="col-3">
                                                <label className="col-form-label">Commission</label>
                                                <input className="form-control" type="number" id="quest-commission" step="0.01" required defaultValue={data.commission} min="0" max="1" />
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-3" style={{ alignContent: "center" }}>
                                                <h5 className="card-header">Images</h5>
                                            </div>
                                            <div className="col-3" style={{ alignItems: "center", display: "flex" }}>
                                                {/* <button type="button" className="btn btn-primary" onClick={addImage}>Add</button> */}
                                                <div class="input-group mb-3">
                                                    <input type="file" class="form-control" id="quest-image-upload" onInput={uploadImage} />
                                                    <label class="input-group-text" for="quest-image-upload">Upload</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3" style={{ height: "25vh", overflowY: "scroll" }}>
                                            <div className="table-responsive text-nowrap">
                                                <Table data={data.images} columns={[
                                                    { label: "Image", path: "image", content: (item) => <img src={item} style={{ width: "100px" }} /> },
                                                    { label: "Actions", path: "actions", content: (item) => <><button type="button" className="btn btn-danger" onClick={() => deleteImage(item)}>Delete</button></> }
                                                ]} onSort={() => { }} sortColumn={{}} />
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-3" style={{ alignContent: "center" }}>
                                                <h5 className="card-header">Locations</h5>
                                            </div>
                                            <div className="col-3" style={{ alignItems: "center", display: "flex" }}>
                                                <button type="button" className="btn btn-primary" onClick={addQuestion}>Add</button>
                                            </div>
                                        </div>
                                        <div className="row mt-3" style={{ height: "25vh", overflowY: "scroll" }}>
                                            <div className="table-responsive text-nowrap">
                                                <Table data={data.questions} columns={[
                                                    { label: "Order", path: "order" },
                                                    { label: "Question", path: "question" },
                                                    { label: "Actions", path: "actions", content: (item) => <><button type="button" className="btn btn-primary" onClick={() => editQuestion(item)}>Edit</button><button type="button" className="btn btn-danger" onClick={() => deleteQuestion(item)}>Delete</button></> }
                                                ]} onSort={() => { }} sortColumn={{}} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </Layout >
        </>
    )
}

export default QuestEditor