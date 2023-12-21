import { Link } from "react-router-dom";

import RatingStars from "./RatingStars";

const Tile = ({ item }) => {
    console.log("ITEMSSSS");
    console.log(item);
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3 text-start">
            <Link to={`/quest/${item.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 mb-4 border-0 shadow-none" style={{ borderRadius: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <img src={item.image} className="card-img-top" alt={item.title} style={{ borderRadius: '2rem', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                    <div className="card-body p-0 d-flex flex-column justify-content-between">
                        <div>
                            <p className="m-0">
                                <RatingStars rating={item.averageRating} /> {item.averageRating} ({item.ratings.length}) - {item.location}
                            </p>
                            <h5 style={{ textTransform: 'capitalize' }} className="my-1 text-dark">{item.title}</h5>
                        </div>
                        <p className='text-dark'>{item.price.toLocaleString()}đ/người - {item.duration} phút</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Tile;