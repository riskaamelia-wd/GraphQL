import Input from '../../elements/Input/Input';
import Button from '../../elements/Button/Button';
import React, { useContext,useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
// import ProductData from '../../context/ProductData';
import AddProductList from './AddProductList';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from '../../redux/products/productsSlice';
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client"
// import { useEffect, useState } from "react"
// import Items from '../../context/Items';

const GetProductList = gql`
    subscription GetProduct {
        Product {
            id
            category
            description
            nama
            price
            freshness
            imageFile
        }
    }
   
`

// const GetProductListSubscription = gql `
//     subscription MySubscription {
//         Product {
//         description
//         freshness
//         id
//         imageFile
//         nama
//         price
//         category
//         }
//     }
// `







const AddProduct = () => {
    // const products = useSelector((state) => 
    //     state.products
    // );

    const [search, setSearch] = useState('')



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


    //  const filterProduct = gql`
    // query GetProduct($_eq: String!) {
    //     Product(where: {nama: {_eq: $_eq}}) {
    //       category
    //       description
    //       freshness
    //       id
    //       imageFile
    //       nama
    //       price
    //     }
    //   }
      
    // `
    // const [filterProductbyName] = useMutation(filterProduct, {
    //     refetchQueries: [GetProductList]
    // })

    const onFilter = (e, search) => {
        e.preventDefault()
        alert('nama = ',search);
        // console.log('var ', {variables});
        filterProductbyName({ variables : {
            // object : {
                
                nama: search,
            // }
        }})
    }

    // const onFilter = (e) => {
    //     e.preventDefault()
    //     if (search !== ''){

    //         alert( search)
    //     } else {
    //         alert('ha')
    //     }

    //     // console.log('haii');
    // }


    return(
        <>
          <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Product category</th>
                        <th>Product Image</th>
                        <th>Product Freshness</th>
                        <th>Additional Desctiption</th>
                        <th>Product Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        loading? 
                        <tr>
                            <td>Loading...</td>
                        </tr>
                        :
                        data?.Product.map(item => 
                            <AddProductList
                                key={item.id}
                                id={item.id}
                                nama={item.nama}
                                category={item.category}
                                imageFile={item.imageFile}
                                freshness={item.freshness}
                                description={item.description}
                                price={item.price}
                            />
                        )}
                </tbody>
            </table>
            <div className="col-6 col-md-4 col-lg-3">
                <form onSubmit={onFilter} >
                    < Input 
                        className = "form-control"
                        type = "text"
                        placeholder = "Search"
                        name="search"
                        value={search}
                        onChangeText={(e)=>setSearch(e.target.value)}

                    />
                    <div className="col-10 row btn-group ms-1">
                        < Button 
                            className = "btn col-6 bg-primary text-white"
                            type = "submit"
                            text = "Deletion"
                        />
                        < Button 
                            className = "btn col-6 border-primary"
                            type = "submit"
                            text = "Search"
                            // onClick = {() => onFilter}
                        />
                    </div>
                </form>
            </div>
        </>

    )
}

// export default AddProduct
export {GetProductList, AddProduct}