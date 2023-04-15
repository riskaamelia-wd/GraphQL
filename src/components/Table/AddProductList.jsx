import {useLocation, useNavigate} from "react-router-dom"
import Button from "../../elements/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/products/productsSlice";
import {GetProductList} from '../Table/AddProduct'
import { gql , useQuery, useMutation} from "@apollo/client"


const AddProductList = ({nama, category, freshness, price,id, imageFile, description}) => {

    const deleteProductList = gql`
    mutation Product($id : String!) {
        delete_Product_by_pk(id: $id) {
            id
        }
    }
    `

    // const products = useSelector((state) => state.products);
    const [deleteProduct] = useMutation(deleteProductList, {
        refetchQueries: [GetProductList]
    })
    


    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const action = () => {
        navigate(          
            `/account/${id}`,
            {state: {
                
                // name : name,
                nama : nama,
                price : price,
                category : category,
                freshness : freshness,
                imageFile : imageFile,
                description : description,
                id : id
            }}            
        )
    }

    const edit = () => {
        navigate(
            
            `/edit-product/${id}`,
            {state: {
                id : id
            }}
            
        )
    }

    const onDeleteItem = (idx) => {
        console.log('id = ',id);
        // console.log('var ', {variables});
        deleteProduct({ variables : {
            // object : {
                
                id: idx,
            // }
        }})
    }
    
    return (
        <tr>
            {console.log('image = ',imageFile)}
            <td onClick={action}>{id}</td>
            {/* <td onClick={()=>navigate(`/account/${id}`)}>{id}</td> */}
            <td>{nama}</td>
            <td>{category}</td>
            {/* <td>{imageFile}</td> */}
            <td><img style={{width:'100px'}} src={imageFile} alt="" /></td>
            <td>{freshness}</td>
            <td>{description}</td>
            <td>{price}</td>
            <td>
                
                <Button
                    className = "btn  btn-danger"
                    type = "submit"
                    text = "Delete"
                    // onClick =  {() => dispatch(deleteProduct(id))}
                    onClick = {() => onDeleteItem(id)}
                />
                {/* <Link to={`/edit-product/${id}` */}
            {/* }> */}
                    <Button
                        className = "btn btn-success me-1"
                        type = "submit"
                        text = "Edit"
                        onClick={edit}
                        />
                {/* </Link> */}
            </td>
        </tr>
    )
}

export default AddProductList;