import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { Link } from "react-router-dom"
import { GetProductList } from "../components/Table/AddProduct"

const DisplayPage = () => {
    const navigate = useNavigate();
    const {data, loading, error} = useSubscription(GetProductList)
     const [product, setProduct] = useState([])
     useEffect(() => {
        console.log('loading', loading);
        console.log('data ', data);
        console.log('error = ', error);

        if(!loading && error !== undefined){
            setProduct(data.Product)
        }
     })

     return (
        <>
            <div className="container-fluid">
                    <div className="col-12 row mx-auto">
                        {
                        loading? 
                        <p>Loading...</p>
                        :
                        data?.Product.map(item =>
                            
                            <div className="col-lg-2 col-12 col-md-5 m-3">
                                <div className="card shadow-sm">
                                    <img src={item.imageFile} height={225} alt=""/>
                                    <div className="card-body">
                                    <h4>
                                        {item.nama}
                                    </h4>
                                    <p className="card-text">
                                        {item.description}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                        <button
                                            type="button"
                                            // onClick={action}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            {" "}
                                            Detail View
                                        </button>
                                        </div>
                                        <small className="text-muted">9 mins</small>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                
                                )}
                            </div>
            </div>
            {/* <Link to="/display" style={{ textDecoration: "none" }}>
                Load more...
            </Link> */}
        </>
     )
}

export default DisplayPage