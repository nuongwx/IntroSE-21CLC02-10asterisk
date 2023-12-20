import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Display star on quest card
const RatingStars = ({ rating }) => {
  const renderStars = () => {
    const filledStars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      filledStars.push(
        <span key={i} style={{ color: 'gold', fontSize: '1.2rem' }}>
          {i <= rating ? '\u2605' : '\u2606'}
        </span>
      );
    }

    return filledStars;
  };

  return renderStars();
};

const Quest = () => {
    const { questId } = useParams();
  const [topQuests, setTopQuests] = useState([]);
  const [quest, setQuest] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchQuestById = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quest/${questId}`);
        const questData = response.data;

        setQuest(questData);
        setLoading(false);
        setTotal(questData.price * quantity);
      } catch (error) {
        console.error('Error fetching quest:', error.message);
      }
    };

    const fetchTopQuests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/home/quest/top4Quests');
        const data = response.data;
        setTopQuests(data);
      } catch (error) {
        console.error('Error fetching top quests:', error.message);
      }
    };

    fetchQuestById();
    fetchTopQuests();
  }, [questId, quantity]);

  console.log(quest);
  return (
    <>
      {quest ?(
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
                        <img src={quest.image} alt="{quest.title}" style={{height: '50vh', width: 'auto'}}></img>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12 col-md-8' >
                            <div className='row'>
                                <div className='col d-flex'>
                                    <i class="bi bi-person-walking px-2" style={{ fontSize: '2rem'}}></i>
                                    <div>
                                        <h4 className='m-0'>Quãng đường</h4>
                                        <h4 className='m-0'>1 km</h4>
                                    </div>
                                </div>
                                <div className='col d-flex'>
                                    <i class="bi bi-geo-alt-fill px-2" style={{ fontSize: '2rem'}}></i>
                                    <div>
                                        <h4 className='m-0'>Địa điểm</h4>
                                        <h4 className='m-0'>1</h4>
                                    </div>
                                </div>
                                <div className='col d-flex'>
                                    <i class="bi bi-hourglass-split px-2" style={{ fontSize: '2rem'}}></i>
                                    <div>
                                        <h4 className='m-0'>Thời gian</h4>
                                        <h4 className='m-0'>120 phút</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h1>Giới thiệu</h1>
                                <p>{quest.description}</p>
                            </div>
                        </div>
                        <div className='col-xs-12 col-md-4 bg-tertiary text-center' style={{ boxShadow: '2px 2px 14px 2px rgba(0, 0, 0, 0.3)' }}>
                            <p className='py-2'><span className='text-danger' style={{ fontSize: '2rem' }}>{quest.price.toLocaleString()}đ</span> mỗi người</p>
                            <div className='border border-2 border-dark' style={{ height: '2px', width: '100%'}}></div>
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
                            <div className='border border-2 border-dark' style={{ height: '2px', width: '100%'}}></div>
                            <div className='py-4 d-flex flex-row justify-content-around'>
                                <p className='m-0'>Tổng tiền</p>
                                <p className='m-0'>{total.toLocaleString()}đ</p>
                            </div>
                            <Link to={`/checkout/${questId}?quantity=${quantity}`}>
                                <button className='btn rounded-pill bg-danger text-white mb-3'>Đặt ngay</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-start">Đánh giá</h2>
                <div className='d-flex flex-row'>
                    <h1 className='px-3'>{quest.rating ? quest.ratings : 0}</h1>
                    <div>
                        <RatingStars rating={quest.averageRating}/>
                        <p>{quest.ratings.length}</p>
                    </div>
                </div>
            </div>

            {/* Top quest */}
            <div className="mt-5">
                <h2 className="text-start">Có thể bạn thích</h2>
                <div className="row my-5">
                {topQuests.map((topQuest) => (
                    <div key={topQuest.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3 text-start">
                    <Link to={`/quest/${topQuest.id}`} className="text-decoration-none text-dark">
                        <div className="card mb-4 border-0" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                        <img
                            src={topQuest.image}
                            className="card-img-top"
                            alt={topQuest.title}
                            style={{ borderRadius: '2rem' }}
                        />
                        <div className="card-body p-0">
                            <p className="m-0">
                            <RatingStars rating={topQuest.averageRating} /> {topQuest.averageRating} (
                            {topQuest.ratings.length}) - {topQuest.location}
                            </p>
                            <h5 style={{ textTransform: 'capitalize' }} className="my-1">
                            {topQuest.title}
                            </h5>
                            <p>{topQuest.price}đ/người - {topQuest.duration} phút</p>
                        </div>
                        </div>
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
      ):(
        <div>Loading...</div>
      )}
    </>
  );
};

export default Quest;
