import Navbar from "../components/Navbar/Navbar"
import background from "../assets/hero.svg"
import '../App.css'
import { Link } from "react-router-dom"
import { GetProductList } from "../components/Table/AddProduct"
import { gql , useQuery, useMutation, useSubscription} from "@apollo/client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
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

     const action = () => {
        // console.log(data.Product);
        // navigate(          
        //     `/account/${id}`,
        //     {state: {
                
        //         // name : name,
        //         nama : product.nama,
        //         price : product.price,
        //         category : product.category,
        //         freshness : product.freshness,
        //         imageFile : product.imageFile,
        //         description : product.description,
        //         id : product.id
        //     }}            
        // )
    }

    return(
        <>
        <div className=" container-fluid p-5 text-white background">
            <div className="row p-5">
            <div className="col-md-6 col-12 p-lg-5">
                <div className="pt-lg-5">
                <h1 className="pt-lg-5">Better Solutions For Your Business</h1>
                <p>
                    We are team of talented designers making websites with Bootstrap
                </p>
                </div>
                <div className="pt-5">
                <Link 
                    to={'/create'}
                    className="btn biru-muda rounded-pill text-white me-4"
                    role="button"
                >
                    Get Started
                </Link>
                <Link 
                    to={'/login'}
                    className="btn biru-muda rounded-pill pe-4 ps-4 text-white me-4"
                    role="button"
                >
                    Sign in
                </Link>
                </div>
            </div>
            <div className="col-md-6 image">
                <img src={background} alt="Gambar Intro" width="100%" />
            </div>
            </div>
        </div>
        <main className=" container">
            <div className="album py-5 row m-0">
            <div className="col-12 ">
                <h3>PRODUCT LIST</h3>
            </div>
            <div>
                <div className="col-12 row mx-auto d-flex justify-content-between">
            {
                        loading? 
                        <p>Loading...</p>
                        :
                        data?.Product.map((item, idx) =>
                            idx < 3 && (

                                <div className="col-lg-3 col-12 col-md-5 p-0">
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
                                            onClick={action}
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
                            )
                            
                                
                                )}
                                </div>
            </div>
            <div className="col-12 d-flex justify-content-end">
                {/* <a
                className="btn btn-primary mt-3"
                href="bootstrap-5.3.0-alpha1-examples/album/index.html"
                role="button"
                >
                Load more...
                </a> */}
                <Link to="/display" style={{ textDecoration: "none" }}>
                    <button className="btn btn-primary mt-3">

                    Load more...
                    </button>
                </Link>
            </div>
            </div>
        </main>
        <footer className="background">
            <div className="container-fluid row bg-light text-center p-5 m-0">
            <div className="col-12">
                <h3>Join Our Newsletter</h3>
                <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster magna
                </p>
            </div>
            <div className="col-lg-6 col-10 mx-auto ">
                <div className="input-group bg-white shadow rounded-pill row ">
                <input
                    type="text"
                    className="col-lg-10 col-8 form-control border-0  rounded-start-pill "
                />
                <input
                    className="btn col-lg-2 col-4 rounded-pill biru-muda border-0 btn-outline-secondary text-white"
                    type="submit"
                    defaultValue="Subscribe"
                />
                </div>
            </div>
            </div>
            <div className="m-0 bg-white">
            <div className="container pt-4 pb-5">
                <div className="row pt-3 d-flex justify-content-between">
                <div className="col-lg-3 col-6 text-abu">
                    <div>
                    <h4 className="text-uppercase text-biru fw-bold mb-0 ">arsha</h4>
                    <p className="mb-0"> A108 Adam Street</p>
                    </div>
                    <div className="ms-2 lh-base">
                    <p style={{ width: 163 }}>New York, NY 535022 United States</p>
                    <p>
                        <strong>Phone :</strong> +1 5589 55488 55 <br />
                        <strong>Email:</strong> info@example.com
                    </p>
                    </div>
                </div>
                <div className="col-lg-3 col-6 row">
                    <p className="col-12 text-biru fw-bold">Useful Links</p>
                    <div className="col-12">
                    <ul>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Home
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            About us
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Services
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Terms of service
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Privacy policy
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-6 row">
                    <p className="col-12 text-biru fw-bold">Our Services</p>
                    <div className="col-12">
                    <ul>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Web Design
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Web Development
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Product Management
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Marketing
                        </a>
                        </li>
                        <li className="list-group-item mb-3">
                        <a className="text-decoration-none text-secondary" href="#">
                            Graphics Design
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-6 row">
                    <p className="col-12 text-biru fw-bold mb-0 p-0">
                    Our Social Networks
                    </p>
                    <p className="col-12 text-abu p-0 mb-0">
                    Cras fermentum odio eu feugiat lide par naso tierra videa magna
                    derita valies
                    </p>
                    <div className="col-12 h-50 p-0 mt-3">
                    <a
                        className="rounded-circle biru-muda text-decoration-none object-fit-fill p-2 me-1 text-blue"
                        href=""
                    >
                        hai
                    </a>
                    <a
                        className="rounded-circle biru-muda text-decoration-none object-fit-fill p-2 me-1 text-blue"
                        href=""
                    >
                        hai
                    </a>
                    <a
                        className="rounded-circle biru-muda text-decoration-none object-fit-fill p-2 me-1 text-blue"
                        href=""
                    >
                        hai
                    </a>
                    <a
                        className="rounded-circle biru-muda text-decoration-none object-fit-fill p-2 me-1 text-blue"
                        href=""
                    >
                        hai
                    </a>
                    <a
                        className="rounded-circle biru-muda text-decoration-none object-fit-fill p-2 text-blue"
                        href=""
                    >
                        hai
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="container d-flex justify-content-between text-white pt-4 pb-2 fw-light">
            <p style={{ fontSize: 14 }}>
                © Copyright <span className="fw-semibold">Arsha</span>. All Rights
                Reserved
            </p>
            <p style={{ fontSize: 14 }}>
                Designed by{" "}
                <a
                className="text-blue text-decoration-none"
                href="https://getbootstrap.com/"
                >
                BootstrapMade
                </a>
            </p>
            </div>
        </footer>
        </>

    )
}
export default LandingPage