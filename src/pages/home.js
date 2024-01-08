import { Link } from 'react-router-dom';
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

const Home = () => {
    const [topQuests, setTopQuests] = useState([]);

    useEffect(() => {
        // Fetch top quests when the component mounts
        fetchTopQuests();
    }, []);

    const fetchTopQuests = async () => {
        try {
            // Make a GET request to the backend API
            const response = await axios.get('http://localhost:3001/api/home/quest/top4Quests');

            // Extract data from the response
            const data = response.data;

            // Update the state with the fetched data
            setTopQuests(data);
        } catch (error) {
            console.error('Error fetching top quests:', error.message);
        }
    };

    return (
        <>
        {/* Hero section */}
        <div className="jumbotron text-white row align-items-center justify-content-start m-0" style={{ height: '75vh', backgroundImage: `url('/Home/Images/Hero background.png')`, backgroundSize: 'cover', width: '100%' }}>
            <div className="container text-dark px-md-5 text-start">
                <div className="row w-100">
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4">
                        <h1 className='text-dark'>Game tour khám phá thành phố</h1>
                        <p className='text-dark'>Ứng dụng sẽ dẫn lối bạn đến những điểm tham quan thú vị, tham gia giải mã thử thách và mở khoá những câu chuyện đặc sắc xung quanh thành phố!</p>
                        {/* <button type="button" className="btn btn-warning rounded-pill mr-3">Khám phá ngay</button> */}
                        <Link to="/explore" className="btn btn-warning rounded-pill mr-3">Khám phá ngay</Link>
                        <button type="button" className="btn btn-outline-warning rounded-pill"><i className='bi bi-play'></i>Demo</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Introduction */}
        <div className="container mt-5">
            <h2 className="text-center text-dark">Vì sao Geoquiz được yêu thích</h2>
            <p className="text-center"><b>Chúng tôi cung cấp các Quest là các tour du lịch tự túc đã được game hoá với các thử thách thú vị trong chuyến đi</b></p>
            <div className="row justify-content-center my-5">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3">
                    <div className="card mb-4 border-0">
                        <img className="card-img-top" src="/Home/Images/Safety.svg" alt="Safety" width="50" height="50" />
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">An toàn & riêng tư</h5>
                            <p className="card-text">Đi riêng cùng bạn bè và gia đình. Thích hợp với thời kì covid-19</p>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3">
                    <div className="card mb-4 border-0">
                        <img className="card-img-top" src="/Home/Images/Payment.svg" alt="Payment" width="50" height="50" />
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">Thanh toán tức thời</h5>
                            <p className="card-text">Không cần đặt trước. Đặt vào phút cuối và mở khoá Quest ngay lập tức</p>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3">
                    <div className="card mb-4 border-0">
                        <img className="card-img-top" src="/Home/Images/Time.svg" alt="Time" width="50" height="50" />
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">Thời gian linh hoạt</h5>
                            <p className="card-text">Bất cứ khi nào bạn muốn,chỉ cần đi đến điểm xuất phát</p>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3">
                    <div className="card mb-4 border-0">
                        <img className="card-img-top" src="/Home/Images/Experience.svg" alt="Experience" width="50" height="50" />
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">Trải nghiệm vui lạ</h5>
                            <p className="card-text">Hoạt động nhập vai ngộ nghĩnh với các thử thách lý thú trong đời thực</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Top quest */}
        <div className="container mt-5">
            <h2 className="text-center text-dark">Trải nghiệm hot nhất</h2>
            <div className="row my-5">
                {topQuests.map((quest) => (        
                   <div key={quest.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3 text-start">
                       <Link to={`/quest/${quest.id}`} className="text-decoration-none text-dark">
                            <div className="card h-100 mb-4 border-0 shadow-none" style={{ borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <img src={quest.image} className="card-img-top" alt={quest.title} style={{ borderRadius: '2rem', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                                <div className="card-body p-0 d-flex flex-column justify-content-between">
                                  <div>
                                       <p className="m-0">
                                           <RatingStars rating={quest.averageRating} /> {quest.averageRating} ({quest.ratings.length}) - {quest.location}
                                        </p>
                                      <h5 style={{ textTransform: 'capitalize' }} className="my-1 text-dark">{quest.title}</h5>
                                   </div>
                                    <p className='text-dark'>{quest.price.toLocaleString()}đ/người - {quest.duration} phút</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="row justify-content-center">
                {/* <button className="btn btn-outline-primary text-center rounded-pill w-auto">Khám phá thêm</button> */}
                <Link to="/explore" className="btn btn-outline-primary text-center rounded-pill w-auto">Khám phá thêm</Link>
            </div>
        </div>

        {/* Top places */}
        <div className="container mt-5">
            <h2 className="text-center text-dark">Top địa điểm</h2>
            <div className="row justify-content-center my-5">
                <div className="col-xs-6 col-md-4 col-lg-2">
                    <div className="card mb-4" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                        <img src="/Home/Images/HCM.png" className="card-img-top" alt="TP Hồ Chí Minh" style={{ borderRadius: '2rem' }} />
                        <div className="card-img-overlay d-flex align-items-center justify-content-center">
                            <h1 className="text-white text-center">TP Hồ Chí Minh</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-4 col-lg-2">
                    <div className="card mb-4" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                        <img src="/Home/Images/TN.png" className="card-img-top" alt="Tây Ninh" style={{ borderRadius: '2rem' }} />
                        <div className="card-img-overlay d-flex align-items-center justify-content-center">
                            <h1 className="text-white text-center">Tây Ninh</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-4 col-lg-2">
                <div className="card mb-4" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                    <img src="/Home/Images/Hue.png" className="card-img-top" alt="Huế" style={{ borderRadius: '2rem' }} />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                    <h1 className="text-white text-center">Huế</h1>
                    </div>
                </div>
                </div>
                <div className="col-xs-6 col-md-4 col-lg-2">
                    <div className="card mb-4" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                        <img src="/Home/Images/HN.png" className="card-img-top" alt="Hà Nội" style={{ borderRadius: '2rem' }} />
                        <div className="card-img-overlay d-flex align-items-center justify-content-center">
                            <h1 className="text-white text-center">Hà Nội</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6 col-md-4 col-lg-2">
                    <div className="card mb-4" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                        <img src="/Home/Images/NT.png" className="card-img-top" alt="Nha Trang" style={{ borderRadius: '2rem' }} />
                        <div className="card-img-overlay d-flex align-items-center justify-content-center">
                            <h1 className="text-white text-center">Nha Trang</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Become a creator */}
        <div className="container mt-5">
            <h2 className="text-center text-dark">Trở thành người sáng tạo</h2>
            <p className="text-center">
                <b>
                Chúng tôi cung cấp các Quest là các tour du lịch tự túc đã được game
                hoá với các thử thách thú vị trong chuyến đi
                </b>
            </p>
            <div className="row justify-content-center my-5">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="card mb-4" style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }}>
                        <img className="card-img-top" src="/Home/Images/Travel Company.svg" alt="Travel Company" width="100" height="100"/>
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">Công ty du lịch lữ hành</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="card mb-4" style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }}>
                        <img className="card-img-top" src="/Home/Images/Tour guide.svg" alt="Tour guide" width="100" height="100"/>
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">Hướng dẫn viên du lịch</h5>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="card mb-4" style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }}>
                        <img className="card-img-top" src="/Home/Images/Blogger.svg" alt="Blogger" width="100" height="100"/>
                        <div className="card-body text-center">
                            <h5 className="card-title text-dark">Chuyên gia địa phương & Blogger</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <button className="btn btn-outline-primary text-center rounded-pill w-auto">Tìm hiểu ngay</button>
            </div>
        </div>

        </>
    );
}

export default Home;