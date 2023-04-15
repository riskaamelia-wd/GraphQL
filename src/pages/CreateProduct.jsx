import Navbar from "../components/Navbar/Navbar"
import Jumbotron from "../components/Jumbotron/Jumbotron"
import FormProduct from "../components/FormProduct/FormProduct"
// import ProductData from "../context/ProductData"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import ItemProvider from "../context/ItemProvider"
import { useContext, useEffect } from "react"

const CreateProduct = () => {

    // const { items } = useContext(ProductData)
    // useEffect(() => {
    //     console.log(items);
    // })

    return (
        <>
            {/* <div className="container-fluid">
                < Navbar />
            </div> */}
            <div className="container-fluid">
                <div className="row">
                    {/* <div>
                        < Jumbotron />
                    </div> */}
                    <FormProduct />
                </div>       
            </div>
        </>
    )
} 

export default CreateProduct