import { Link } from "react-router-dom";

import RatingStars from "./RatingStars";
// {topQuests.map((topQuest) => (
//     <div key={topQuest.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3 text-start">
//         <Link to={`/quest/${topQuest.id}`} className="text-decoration-none text-dark">
//             <div className="card mb-4 border-0" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
//                 <img
//                     src={topQuest.image}
//                     className="card-img-top"
//                     alt={topQuest.title}
//                     style={{ borderRadius: '2rem' }}
//                 />
//                 <div className="card-body p-0">
//                     <p className="m-0">
//                         <RatingStars rating={topQuest.averageRating} /> {topQuest.averageRating} (
//                         {topQuest.ratings.length}) - {topQuest.location}
//                     </p>
//                     <h5 style={{ textTransform: 'capitalize' }} className="my-1">
//                         {topQuest.title}
//                     </h5>
//                     <p>{topQuest.price}đ - {topQuest.duration} minutes</p>
//                 </div>
//             </div>
//         </Link>
//     </div>
// ))}

const Tile = ({ item }) => {
    console.log("ITEMSSSS");
    console.log(item);
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 gap-3 text-start">
            <Link to={`/quest/${item.id}`} className="text-decoration-none text-dark">
                <div className="card mb-4 border-0" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
                    <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.title}
                        style={{ borderRadius: '2rem', height: '250px' }}
                    />
                    <div className="card-body p-0">
                        <p className="m-0">
                            <RatingStars rating={item.averageRating} />
                             {item.averageRating} (
                            {item.ratings.length}) - {item.location}
                        </p>
                        <h5 style={{ textTransform: 'capitalize' }} className="my-1">
                            {item.title}
                        </h5>
                        <p>{item.price}đ - {item.duration} minutes</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Tile;