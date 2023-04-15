import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../elements/Button/Button";

const Account = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location)
    return (
        <div>
            <div className="container-fluid">
                <h1 >Info Product</h1>
                <p>Product Name = {location.state.nama}</p>
                <p>category product = {location.state.category}</p>
                <p>Product Image : <img style={{width:'100px'}} src={location.state.imageFile} alt="" /></p>
                <p>Prodect Freshness = {location.state.freshness}</p>
                <p>additional description = {location.state.description}</p>
                <p>Id Product = {location.state.id}</p>
                <p>Price = $ {location.state.price}</p>
                < Button
                    className="btn bg-primary text-white" 
                    onClick={() => navigate('/create')}
                    text="Go Back"
                />
            </div>
            
        </div>
    )
}

export default Account;