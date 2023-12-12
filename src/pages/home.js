import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { PlayFill } from 'react-bootstrap-icons';
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
        <Jumbotron className="text-white row align-items-center justify-content-start" style={{ height: '75vh', backgroundImage: `url("/Home/Images/Hero background.png")`, backgroundSize: 'cover', width: '100vw' }}>
            <Container className="text-dark" style={{ padding: '0' }}>
                <Row>
                    <Col xs={10} sm={8} md={6} lg={4}>
                        <h1>Game tour khám phá thành phố</h1>
                        <p>Ứng dụng sẽ dẫn lối bạn đến những điểm tham quan thú vị, tham gia giải mã thử thách và mở khoá những câu chuyện đặc sắc xung quanh thành phố!</p>
                        <Button variant="warning" className="rounded-pill mr-3">Khám phá ngay</Button>
                        <Button variant="outline-warning" className="rounded-pill"><PlayFill size={24} />Demo</Button>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>

        {/* Introduction */}
        <Container className="mt-5">
            <h2 className="text-center">Vì sao Geoquiz được yêu thích</h2>
            <p className='text-center'><b>Chúng tôi cung cấp các Quest là các tour du lịch tự túc đã được game hoá với các thử thách thú vị trong chuyến đi</b></p>
            <Row className="justify-content-center my-5">
                <Col xs={12} sm={6} md={4} lg={3} gap={3}>
                    <Card className="mb-4" border="0">
                        <Card.Img variant="top" src="/Home/Images/Safety.svg" width='50' height='50'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>An toàn & riêng tư</Card.Title>
                            <Card.Text>Đi riêng cùng bạn bè và gia đình. Thích hợp với thời kì covid-19</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} gap={3}>
                    <Card className="mb-4" border="0">
                        <Card.Img variant="top" src="/Home/Images/Payment.svg" width='50' height='50'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Thanh toán tức thời</Card.Title>
                            <Card.Text>Không cần đặt trước. Đặt vào phút cuối và mở khoá Quest ngay lập tức</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} gap={3}>
                    <Card className="mb-4" border="0">
                        <Card.Img variant="top" src="/Home/Images/Time.svg" width='50' height='50'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Thời gian linh hoạt</Card.Title>
                            <Card.Text>Bất cứ khi nào bạn muốn chỉ cần đi đến điểm xuất phát</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} gap={3}>
                    <Card className="mb-4" border="0">
                        <Card.Img variant="top" src="/Home/Images/Experience.svg" width='50' height='50'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Trải nghiệm vui lạ</Card.Title>
                            <Card.Text>Hoạt động ngộ nghĩnh với các thử thách lý thú trong thời gian thực</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

        {/* Top quest */}
        <Container className="mt-5">
            <h2 className="text-center">Trải nghiệm hot nhất</h2>
            <Row className='my-5'>
            {topQuests.map((quest) => (
                <Col key={quest.id} xs={12} sm={6} md={4} lg={3} gap={3}>
                    <Link to={`/quest/${quest.id}`} className='text-decoration-none text-dark'>
                        <Card className="mb-4" border="0">
                            <Card.Img variant="top" src={quest.image} alt={quest.title} style={{ borderRadius: '2rem' }} />
                            <Card.Body className="p-0">
                                <Card.Text className="m-0">
                                    <RatingStars rating={quest.averageRating} /> {quest.averageRating} ({quest.ratings.length})
                                </Card.Text>
                                <Card.Title style={{ textTransform: 'capitalize' }} className="my-1">{quest.title}</Card.Title>                                
                                <Card.Text>{quest.price} đ / người - </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))}
            </Row>
            <Row className='justify-content-center'>
                <Button variant="outline-primary" className="text-center rounded-pill">Khám phá thêm</Button>
            </Row>
        </Container>
        
        {/* Top places */}
        <Container className="mt-5">
            <h2 className="text-center">Top địa điểm</h2>
            <Row className="justify-content-center my-5">
                <Col xs={6} md={4} lg={2} gap={3}>
                    <Card className="mb-4" border="0">
                    <Card.Img variant="top" src="/Home/Images/HCM.png" style={{ borderRadius: '2rem'}}/>
                    <Card.ImgOverlay className="row align-items-center justify-content-center">
                        <h1 className="text-light text-center">TP Hồ Chí Minh</h1>
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col xs={6} md={4} lg={2} gap={3}>
                    <Card className="mb-4" border="0">
                    <Card.Img variant="top" src="/Home/Images/TN.png" style={{ borderRadius: '2rem'}}/>
                    <Card.ImgOverlay className="row align-items-center justify-content-center">
                        <h1 className="text-light text-center">Tây Ninh</h1>
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col xs={6} md={4} lg={2} gap={3}>
                    <Card className="mb-4" border="0">
                    <Card.Img variant="top" src="/Home/Images/Hue.png" style={{ borderRadius: '2rem'}}/>
                    <Card.ImgOverlay className="row align-items-center justify-content-center">
                        <h1 className="text-light text-center">Huế</h1>
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col xs={6} md={4} lg={2} gap={3}>
                    <Card className="mb-4" border="0">
                    <Card.Img variant="top" src="/Home/Images/HN.png" style={{ borderRadius: '2rem'}}/>
                    <Card.ImgOverlay className="row align-items-center justify-content-center">
                        <h1 className="text-light text-center">Hà Nội</h1>
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col xs={6} md={4} lg={2} gap={3}>
                    <Card className="mb-4" border="0">
                    <Card.Img variant="top" src="/Home/Images/NT.png" style={{ borderRadius: '2rem'}}/>
                    <Card.ImgOverlay className="row align-items-center justify-content-center">
                        <h1 className="text-light text-center">Nha Trang</h1>
                    </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
        </Container>

        {/* Become a creator */}
        <Container className="mt-5">
            <h2 className="text-center">Trở thành người sáng tạo</h2>
            <p className='text-center'><b>Chúng tôi cung cấp các Quest là các tour du lịch tự túc đã được game hoá với các thử thách thú vị trong chuyến đi</b></p>
            <Row className="justify-content-center my-5">
                <Col xs={12} sm={6} md={4} lg={4} gap={3}>
                    <Card className="py-4" border="0" style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'}}>
                        <Card.Img variant="top" src="/Home/Images/Travel Company.svg" width='100' height='100'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Công ty du lịch lữ hành</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4} gap={3}>
                    <Card className="py-4" border="0" style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'}}>
                        <Card.Img variant="top" src="/Home/Images/Tour guide.svg" width='100' height='100'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Hướng dẫn viên du lịch</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={4} lg={4} gap={3}>
                    <Card className="py-4" border="0" style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'}}>
                        <Card.Img variant="top" src="/Home/Images/Blogger.svg" width='100' height='100'>
                        </Card.Img>
                        <Card.Body className="text-center">
                            <Card.Title>Chuyên gia địa phương & Blogger</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Button variant="outline-primary" className="text-center rounded-pill">Tìm hiểu ngay</Button>
            </Row>
        </Container>

        </>
    );
}

export default Home;