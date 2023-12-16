import { Link } from "react-router-dom";

{/* <div class="col-md-6 col-lg-4 mb-3">
                  <div class="card h-100">
                    <img class="card-img-top" src="../assets/img/elements/2.jpg" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </p>
                      <a href="javascript:void(0)" class="btn btn-outline-primary">Go somewhere</a>
                    </div>
                  </div>
                </div> */}

const Card = ({ item }) => {
    return (
        <div className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
                <img className="card-img-top" src={item.image} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                        {item.description}
                    </p>
                    <Link to={`/management/${item.id}`} className="btn btn-outline-primary">Edit</Link>
                </div>
            </div>
        </div>
    );
}