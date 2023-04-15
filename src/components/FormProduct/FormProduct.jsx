import React, {useContext, useEffect, useState} from "react"
import Input from "../../elements/Input/Input"
import Select from "../../elements/Select/Select"
import Textarea from "../../elements/Textarea/Textarea"
import Button from "../../elements/Button/Button"
import {AddProduct} from "../Table/AddProduct"
// import ProductData from "../../context/ProductData"
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/products/productsSlice"
import { gql , useQuery, useMutation} from "@apollo/client"
import {GetProductList} from '../Table/AddProduct'
import {storage} from '../../config/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


// ada ! agar tidak boleh ada data kosong
const ADD_PRODUCT = gql`
    mutation InsertProduct($object : Product_insert_input!){
        insert_Product_one(object : $object){
            id
            nama
            description
            freshness
            price
            category
            imageFile
        }
     }
`


const FormProduct = () => {
    const [insertProduct] = useMutation(ADD_PRODUCT, {
        refetchQueries: [GetProductList]
    })

    const [percent, setPercent] =  useState(0)
    

    const [regex, setRegex] =useState({
        nama : /^[0-9a-zA-Z]+$/,
        price : /^[0-9]+$/,
        imageFile : /\.(jpe?g|png|gif|bmp)$/i,
        category: /^[category 1|category 2|category 3]+$/,
        // category: /^[----]+$/
        freshness : /^[Brand New|Second Hank|Refurbished]+$/
        // freshness : / /
    })

    const dispatch = useDispatch()

    const [product, setProduct] = useState({

        nama : '',
        price : '',
        description : '',
        imageFile:'',
        freshness:'',
        category:''
    })

    const [errMsg, setErrMsg] = useState({
        nama : '',
        price : '',
        description :'',
        imageFile:'',
        freshness:'',
        category:''
    })

    const [className, setClassName] = useState({
        nama : "form-control",
        price : 'form-control',
        imageFile : "form-control",
        description : "form-control",
        category : "form-select",
        freshness: 'form-check-input'
    })

    const onSubmit = (e) => {
        e.preventDefault()
        

        if(product.nama === ''){
            setClassName({
                ...className,
                nama : "form-control is-invalid"
            })
            setErrMsg({
                ...errMsg,
                nama : 'This field is required' 
            })
        } else if (product.price === ''){
            setClassName({
                ...className,
                price : "form-control is-invalid"
            })
            setErrMsg({
                ...errMsg,
                price : 'This field is required' 
            })
        } else if (product.imageFile === '') {
            setClassName({
                ...className,
                imageFile : "form-control is-invalid"
            })
            setErrMsg({
                ...errMsg,
                imageFile : 'This field is required' 
            })
        } else if (!regex.freshness.test(product.freshness) ){
            setClassName({
                ...className,
                freshness : "form-check-input border border-danger"
            })
            setErrMsg({
                ...errMsg,
                freshness : 'This field is required' 
            })
        } else if (product.category === ''){
            setClassName({
                ...className,
                category : "form-select border border-danger"
            })
            setErrMsg({
                ...errMsg,
                category : 'This field is required' 
            })
        } else if (product.nama != '' && product.price != '' && product.category != '' && product.freshness != '' && product.imageFile != ''){
            dispatch(addProduct({...product, product }))
            setProduct({
                ...product,
                
                category : '',
                nama : '',
                price : '',
                description : '',
                imageFile : '',
                freshness : '',
            })

            handleUpload()
        }
        console.log('add Product => ',addProduct({product}));

    }

    const handleUpload = () => {
        //handle file ref
        const storageRef = ref(storage, `/files/${product.imageFile.name}`)

        //handle file upload progress
        const uploadTask = uploadBytesResumable(storageRef, product.imageFile)

        //handle file upload
        uploadTask .on(
            "state_changed",

            // callback ketika upload
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred /  snapshot.totalBytes) * 100
                )

                // update progress
                setPercent(percent)
                console.log((`progres >>> ${percent
                }%`));
            },

            // callback gagal
            (err) => {
                console.log(('error upload file ', err));
            } ,

            // callback selesai upload
            () => {
                //dw url
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    console.log('url download file ', url);

                    /// update object file di dalam state product.file
                    // setProduct((product) => ({

                    //     ...product, imageFile : url
                    // }
                        
                    // ))

                    // dispatch(addProduct({...product, imageFile : url }))
                    // console.log(imageFile);

                    // trigger mutation dari useMutation
                    insertProduct({
                        variables : {
                            object : {
                                id : uuid(),
                                nama : product.nama,
                                category : product.category,
                                description : product.description,
                                price : product.price,
                                freshness : product.freshness,
                                imageFile : url
                            }
                        }
                    })

                })

            }
            
            )

    }

    const onChange=(e)=>{
        e.preventDefault()

        if (e.target.name === "imageFile"){
            setProduct({
              ...product,[e.target.name]:e.target.files[0]
            })
          } else {
            setProduct({
              ...product,[e.target.name]:e.target.value
            })
          }
        

        const {name, value} = e.target
        // setProduct({
        //     ...product,
        //     [name] : value
        // })

        // if (name === 'ImageFile'){
        //     setProduct((product) => ({
        //         ...product,
        //         [name] : e.target.files[0]
                
        //     }))
        // } else {
        //     setProduct((product) => ({
        //         ...product,
        //         [name] : value
        //     }))

        // }

        if (name === 'nama'){
            if(value < 1){
                setClassName({
                    ...className,
                    nama : "form-control is-invalid"
                })
                setErrMsg({
                    ...errMsg,
                    nama : 'Must be filled in' 
                })
            } else if (!regex.nama.test(value)){
                setClassName({
                    ...className,
                    nama : "form-control is-invalid"
                })
                setErrMsg({
                    ...errMsg,
                    nama : 'Symbol is not allowed' 
                })
            } else if (value.length > 10){
                setClassName({
                    ...className,
                    nama : "form-control is-invalid"
                })
                setErrMsg({
                    ...errMsg,
                    nama : 'Must be 10 characters or less' 
                })
            } else {
                setClassName({
                    ...className,
                    nama : "form-control "
                })
                setErrMsg({
                    ...errMsg,
                    nama : ''
                })
            }

        } else if (name === 'price'){

            if(value < 1){
                setClassName({
                    ...className,
                    price : "form-control is-invalid"
                })
                setErrMsg({
                    ...errMsg,
                    price : 'Must be filled in' 
                })
            } else if(!regex.price.test(value)){
                setClassName({
                    ...className,
                    price : "form-control is-invalid"
                })
                setErrMsg({
                    ...errMsg,
                    price : 'numeric character only' 
                })
            }else {
                setClassName({
                    ...className,
                    price : "form-control "
                })
                setErrMsg({
                    ...errMsg,
                    price : '' 
                })
            }

        } else if (name === 'imageFile'){

            if (!regex.imageFile.test(value)){
                setClassName({
                    ...className,
                    imageFile : "form-control is-invalid"
                })
                setErrMsg({
                    ...errMsg,
                    imageFile : 'Must be an image' 
                })
            } else {

                setClassName({
                    ...className,
                    imageFile : "form-control"
                })
                setErrMsg({
                    ...errMsg,
                    imageFile : '' 
                })


            }

        } else if (name === 'category'){
            // value === "----"
            if (!regex.category.test(value)){
                setErrMsg({
                    ...errMsg,
                    category: 'This field is required'
                })
                setClassName({
                    ...className,
                    category : "form-select border border-danger"
                })
            } else {
                setClassName({
                    ...className,
                    category : "form-select"
                })
                setErrMsg({
                    ...errMsg,
                    category : '' 
                })
            }
        } else if (name === 'freshness'){
            setClassName({
                ...className,
                freshness : "form-check-input"
            })
            setErrMsg({
                ...errMsg,
                freshness : '' 
            })
        }
    }

    const categoryList = [
        {value:'----', text:'Choose...'},
        {value:"category 1", text: "category 1"},
        {value:"category 2", text: "category 2"},
        {value:"category 3", text: "category 3"},   
    ];
    

    return(
        <>
        <div className="col-12 col-lg-7 col-md-10 row mx-auto">
            <h2 className="col-8 mx-auto mt-5">Detail Product</h2>
                <form onSubmit={onSubmit} 
                    className="col-8 mx-auto 
                     "
                >
                    <div className = "col-md-8 col-12 mb-3">
                        <Input   
                            label={'Product Name'}  
                            type={'text'}
                            value={product.nama}
                            name={'nama'}
                            onChangeText={onChange}
                            className={className.nama}
                        />
                        <span className="invalid-feedback">{errMsg.nama}</span>
                    </div>
                    
                    <div className="mb-3">
                        < Select 
                            label={"Product Category"}
                            name={'category'}
                            value = {product.category}
                            options= {categoryList}
                            onSelect={onChange}
                            className={className.category}
                        />
                        <span >{errMsg.category}</span>
                    </div>

                    <div className="col-md-6 col-8 custom-file-button mb-3">
                        < Input
                            label={'Product Image'}  
                            type={'file'}
                            name={'imageFile'}
                            // value={product.imageFile}
                            accept="image/*"
                            onChangeText={onChange}
                            className={className.imageFile}
                        />
                        <p>{percent}%</p>
                        <span className="invalid-feedback">{errMsg.imageFile}</span>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="freshness">
                            Product Freshness
                        </label>

                        <div className="form-check">
                            < Input
                                type={"radio"}
                                className={className.freshness}
                                value={"Brand New"}
                                name="freshness"
                                checked={ product.freshness === "Brand New"}
                                id={'freshness'}
                                label="Brand New"
                                onChangeText={onChange}
                            />
                        </div>

                        <div className="form-check">
                            < Input
                                type={"radio"}
                                className={className.freshness}
                                value={"Second Hank"}
                                name="freshness"
                                id={'freshness'}
                                checked={ product.freshness === "Second Hank"}
                                label="Second Hank"
                                onChangeText={onChange}
                            />                            
                        </div>

                        <div className="form-check"> 
                            < Input
                                type={"radio"}
                                className={className.freshness}
                                value={"Refurbished"}
                                id={'freshness'}
                                checked={ product.freshness === "Refurbished"}
                                name={"freshness"}
                                label="Refurbished"
                                
                                onChangeText={onChange}
                            />
                        </div>
                        <span>{errMsg.freshness}</span>
                    </div>

                    <div>
                        < Textarea 
                            label={'additional description'}
                            className={className.description}
                            name={'description'}
                            value={product.description}
                            onChangeText={onChange}
                        />
                        <span className="invalid-feedback">{errMsg.description}</span>
                    </div>

                    <div>
                        < Input 
                            label={'Product Price'}  
                            type={'text'}
                            value={product.price}
                            name={'price'}
                            className={className.price}
                            onChangeText={onChange}
                            placeholder={'$ 1'}
                        />
                        <span className="invalid-feedback">{errMsg.price}</span>
                    </div>

                    <div>
                        < Button 
                            text = "Submit"
                            type={'submit'}
                            className="btn btn-primary d-grid col-11 mx-auto mt-5 mb-5"
                            // onClick = {onSubmit}
                        />
                    </div>

                </form>
        </div>
        <div className="container-fluid">
            <h3 style={{textAlign:"center"}}>List Product</h3>
            <AddProduct />
        </div>
    </>   
    )
}


export default FormProduct
