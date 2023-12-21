import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import Tile from '../components/Tile';
import RatingStars from '../components/RatingStars';
import useToken from '../utils/auth';

// Display star on quest card


const Quest = () => {
    const { questId } = useParams();
    // const [topQuests, setTopQuests] = useState([]);
    // const [quest, setQuest] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const [purchased, setPurchased] = useState(false);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const { token } = useToken();
    if (token) {
        console.log("Logged in");
        const data = axios.get("http://localhost:3001/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            // console.log(response);
            for (let i = 0; i < response.data.quests.length; i++) {
                // console.log(response.data.quests[i]);
                // console.log(questId);
                if (response.data.quests[i].quest._id === questId) {
                    console.log("Purchased");
                    setPurchased(true);
                    break;
                }
            }
        });
    }

    const { isFetching, isPending, data: topQuests } = useQuery({
        queryKey: ['topQuests'],
        queryFn: () => axios.get('http://localhost:3001/api/home/quest/top4Quests')
            .then((response) => response.data),
    });

    const { isFetching: isFetching2, isPending: isPending2, data: quest } = useQuery({
        queryKey: ['quest', questId],
        queryFn: () => axios.get(`http://localhost:3001/api/quest/${questId}`).then((response) => response.data),
    });

    if (isFetching || isPending || isPending2 || isFetching2) return 'Loading...';

    console.log(quest)

    const address = encodeURIComponent(quest.location || "23/2 Hoàng Sa, Đa Kao");
    return (
        <>
            <div className='container text-start'>
                <div className="pt-5">
                    <div className='pt-5'>
                        <h2>{quest?.title}</h2>
                        <p className="m-0">
                            <RatingStars rating={quest?.averageRating} /> {quest?.averageRating} ({quest?.ratings.length}) -{' '}
                            {quest?.location}
                        </p>
                    </div>
                    <div>
                        <div className='row'>
                            <div className='col-8 pe-2'>
                                <img src={quest.images[0]} alt="{quest.title}" style={{ height: '400px', width: "100%" }}></img>
                            </div>
                            <div className='col-4'>
                                <img src={quest.images[1]} alt="{quest.title}" style={{ height: '200px', width: "100%" }}></img>
                                <img src={quest.images[2]} alt="{quest.title}" style={{ height: '200px', width: "100%" }}></img>
                            </div>
                        </div>
                        <div className='row my-2'></div>
                        <div className='row'>
                            <div className='col-lg-8 col-sm-12'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='row mb-2'>
                                            <h1>Introduction</h1>
                                        </div>
                                        <div className='row text-start mx-0 p-2 rounded-4'>
                                            {/* <p>{quest.description}</p> */}
                                            {/* display description as html */}
                                            <span dangerouslySetInnerHTML={{ __html: quest.description }}></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-4 d-flex'>
                                            <div style={{ width: '50px', height: '50px', fontSize: '40px', borderRadius: '50%', marginRight: '10px', marginTop: '-5px' }}>
                                                <i class="bi bi-person-walking"></i>
                                            </div>
                                            <div style={{ textAlign: 'left' }}>
                                                <span style={{ fontSize: '21px', marginBottom: '10px', fontWeight: '500', whiteSpace: 'nowrap' }}>Distance</span>
                                                <p>{quest.distance} km</p>
                                            </div>
                                        </div>
                                        <div className='col-4 d-flex'>
                                            <div style={{ width: '50px', height: '50px', fontSize: '40px', borderRadius: '50%', marginRight: '10px', marginTop: '-5px' }}>
                                                <i class="bi bi-hourglass-split"></i>
                                            </div>
                                            <div style={{ textAlign: 'left' }}>
                                                <span style={{ fontSize: '21px', marginBottom: '10px', fontWeight: '500', whiteSpace: 'nowrap' }}>Duration</span>
                                                <p>{quest.duration} minutes</p>
                                            </div>
                                        </div>
                                        {/* <div className='col-4 d-flex'>
                                                <i class="bi bi-geo-alt-fill px-2" style={{ fontSize: '2rem' }}></i>
                                                <div>
                                                    <h4 className='m-0'>Địa điểm</h4>
                                                    <h4 className='m-0'>1</h4>
                                                </div>
                                            </div>
                                            <div className='col-4 d-flex'>
                                                <i class="bi bi-hourglass-split px-2" style={{ fontSize: '2rem' }}></i>
                                                <div>
                                                    <h4 className='m-0'>Thời gian</h4>
                                                    <h4 className='m-0'>120 phút</h4>
                                                </div>
                                            </div> */}

                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-sm-12 bg-tertiary text-center' >
                                <div style={{ backgroundColor: '#f7f7f7', borderRadius: '10px', minHeight: 'inherit', padding: '30px', top: '25px', position: 'sticky' }}>
                                    <div className='row text-center'>
                                        <p className='py-2'><span className='text-danger' style={{ fontSize: '2rem' }}>{quest.price.toLocaleString()}đ</span></p>
                                    </div>

                                    {/* <div className='border border-2 border-dark' style={{ height: '2px', width: '100%' }}></div>
                                    <div className='py-4 d-flex flex-row justify-content-around'>
                                        <p className='m-0'>Số lượng</p>
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-outline-primary btn-sm me-2"
                                                onClick={handleDecrease}
                                            >
                                                -
                                            </button>
                                            <span className="me-2">{quantity}</span>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={handleIncrease}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className='border border-2 border-dark' style={{ height: '2px', width: '100%' }}></div>
                                    <div className='py-4 d-flex flex-row justify-content-around'>
                                        <p className='m-0'>Tổng tiền</p>
                                        <p className='m-0'>{total.toLocaleString()}đ</p>
                                    </div> */}
                                    {/* <button className='btn btn-danger w-75 my-3'>Đặt ngay</button> */}
                                    <hr />
                                    { purchased ? <Link reloadDocument to={`/quest/${quest.id}/quiz`} className='btn btn-danger w-75 my-3'>Play now!</Link> : <Link reloadDocument to={`/checkout/${quest.id}`} className='btn btn-danger w-75 my-3' disabled>Order now!</Link>}
                                </div>
                            </div>

{/* //                             <div className='border border-2 border-dark' style={{ height: '2px', width: '100%'}}></div>
//                             <div className='py-4 d-flex flex-row justify-content-around'>
//                                 <p className='m-0'>Tổng tiền</p>
//                                 <p className='m-0'>{total.toLocaleString()}đ</p>
//                             </div>
//                             <Link to={`/checkout/${questId}?quantity=${quantity}`}>
//                                 <button className='btn rounded-pill bg-danger text-white mb-3'>Đặt ngay</button>
//                             </Link> */}

                        </div>
                    </div>
                </div>

                <div className='pt-5'>
                    <div className='row mb-3 text-start'>
                        <div className='col-12'>
                            <h1>Starting point</h1>
                        </div>
                    </div>
                    <div className='row m-0 m-lg-4'>
                        <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" style={{ border: '0', borderRadius: '20px', padding: '0' }} src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=2%20C%C3%B4ng%20x%C3%A3%20paris+(My%20Business%20Name)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                    </div>
                </div>


{/* //                 <div className="mt-5">
//                     <h2 className="text-start">Ratings</h2>
//                     <div className='d-flex flex-row'>
//                         <h1 className='px-3'>{quest.rating ? quest.ratings : 0}</h1>
//                         <div>
//                             <RatingStars rating={quest.averageRating} />
//                             <p>{quest.ratings.length}</p>
//                         </div>
//                     </div>
//                 </div> */}

                {/* Top quest */}
                <div className="mt-5">
                    <h2 className="text-start">You may also likes</h2>
                    <div className="row my-5">
                        {topQuests.map((quest) => (
                            <Tile item={quest} />
                        ))}
                    </div>

//             {/* Top quest */}
{/* //             <div className="mt-5">
//                 <h2 className="text-start">Có thể bạn thích</h2>
//                 <div className="row my-5">
//                     {topQuests.map((quest) => (
//                         <div key={quest.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3 text-start">
//                         <Link to={`/quest/${quest.id}`} className="text-decoration-none text-dark">
//                             <div className="card h-100 mb-4 border-0 shadow-none" style={{ borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//                             <img src={quest.image} className="card-img-top" alt={quest.title} style={{ borderRadius: '2rem', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
//                             <div className="card-body p-0 d-flex flex-column justify-content-between">
//                                 <div>
//                                 <p className="m-0">
//                                     <RatingStars rating={quest.averageRating} /> {quest.averageRating} ({quest.ratings.length}) - {quest.location}
//                                 </p>
//                                 <h5 style={{ textTransform: 'capitalize' }} className="my-1">{quest.title}</h5>
//                                 </div>
//                                 <p>{quest.price}đ/người - {quest.duration} phút</p>
//                             </div>
//                             </div>
//                         </Link>
//                         </div>
//                     ))} */}

                </div>
            </div>

        </>
    );
};

export default Quest;
