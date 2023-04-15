import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { editProduct } from "../../redux/products/productsSlice"
import Input from "../../elements/Input/Input"
import Button from "../../elements/Button/Button"
import Textarea from "../../elements/Textarea/Textarea"
import Select from "../../elements/Select/Select"
import {GetProductList} from '../Table/AddProduct'
import { gql , useQuery, useMutation} from "@apollo/client"

const EditProduct = () => {
    
    const  { pathname} = useLocation()
    
    const productId = pathname.replace('/edit-product/','')
    // const products = useSelector((state) => 
    //     state.products.find((product) => product.id === productId)
    // )
    const data = useQuery(GetProductList)
    console.log('pro => s', data.data.Product);
    const products = data.data.Product.find((v) => v.id === productId)
    const editProductList = gql `
    mutation Product($id: String!, $category: String, $description: String, $imageFile: String, $nama: String, $price: String, $freshness: String) {
        update_Product_by_pk(pk_columns: {id: $id}, _set: {category: $category, description: $description, imageFile: $imageFile, nama: $nama, price: $price, freshness: $freshness}) {
          id
        }
      }
      `

      const [editProduct] =  useMutation(editProductList,
        {
            refetchQueries : [GetProductList]
        }
        )

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [product, setProduct] = useState({
        nama : products.nama,
        price : products.price,
        description : products.description,
        // imageFile: products.imageFile,
        freshness: products.freshness,
        category: products.category
    })

    const [ errMsg, setErrMsg] = useState('')

    const categoryList = [
        {value:'----', text:'Choose...'},
        {value:"category 1", text: "category 1"},
        {value:"category 2", text: "category 2"},
        {value:"category 3", text: "category 3"},   
    ];

    const handleChange=(e)=>{
        e.preventDefault()
        const {name, value} = e.target
        setProduct({
            ...product,
            [name] : value
        })
    }

    const handleCancel = () => {
        navigate(-1)
    }

    const handleClick = () => {
        if (product.nama  && product.imageFile  && product.price && product.description  && product.freshness && product.category){
            // dispatch(
            //     editProduct({ 
            //         id : productId,
            //         ...product, product
            //     })
            // )
            // const item = data?.data.Product.find((v) => v.id === product.id)
            // console.log(item);
            editProduct({variables:{
                id : products.id,
                nama : product.nama,
                category : product.category,
                description : product.description,
                price : product.price,
                imageFile: product.imageFile,
                freshness : product.freshness,

            }}
            )
            setErrMsg('')
            navigate('/create')
        } else {
            setErrMsg('fill in all fields')
        }
    }
    
    return(
        
        <div className="col-12 col-lg-7 col-md-10 row mx-auto">
            <h2 className="col-8 mx-auto mt-5">Detail Product</h2>
            <div className = "col-md-8 col-12 mb-3">
                <Input     
                    type={'text'}
                    label={'Product Name'}
                    value={product.nama}
                    name={'nama'}
                    onChangeText={handleChange}
                    className={'form-control'}
                />
            </div>
            
            <div className="mb-3">
                < Select 
                    label={"Product Category"}
                    name={'category'}
                    value = {product.category}
                    options= {categoryList}
                    onSelect={handleChange}
                    className={'form-select'}
                />
            </div>

            <div className="col-md-6 col-8 custom-file-button mb-3">
                < Input
                    label={'Product Image'}  
                    type={'file'}
                    name={'imageFile'}
                    value={product.imageFile}
                    accept="image/*"
                    onChangeText={handleChange}
                    className={'form-control'}
                />
            </div>
            
            <div className="mb-3">
                <label>
                    Product Freshness
                </label>

                <div className="form-check">
                    < Input
                        type={"radio"}
                        className={'form-check-input'}
                        value={"Brand New"}
                        name="freshness"
                        checked={product.freshness
                        }
                        label="Brand New"
                        onChangeText={handleChange}
                    />
                </div>

                <div className="form-check">
                    < Input
                        type={"radio"}
                        className={'form-check-input'}
                        value={"Second Hank"}
                        name="freshness"
                        checked={product.freshness
                        }
                        label="Second Hank"
                        onChangeText={handleChange}
                    />                            
                </div>

                <div className="form-check"> 
                    < Input
                        type={"radio"}
                        className={'form-check-input'}
                        value={"Refurbished"}
                        name="freshness"
                        checked={product.freshness
                        }
                        label="Refurbished"
                        
                        onChangeText={handleChange}
                    />
                </div>
            </div>

            <div>
                < Textarea 
                    label={'additional description'}
                    className={'form-control'}
                    name={'description'}
                    value={product.description}
                    onChangeText={handleChange}
                />
                
            </div>

            <div>
                < Input 
                    label={'Product Price'}  
                    type={'number'}
                    value={product.price}
                    name={'price'}
                    className={'form-control'}
                    onChangeText={handleChange}
                    placeholder={'$ 1'}
                />
            </div>
            
            <span>{errMsg}</span>

            <div>
                < Button 
                    text = "Submit"
                    type={'submit'}
                    className="btn btn-success col-3 mx-auto me-3 "
                    onClick = {handleClick}
                />
                < Button 
                    text = "Cancel"
                    type={'submit'}
                    className="btn btn-danger col-3 mx-auto mt-5 mb-5"
                    onClick = {handleCancel}
                />
            </div>
        </div>
    )
}
export default EditProduct