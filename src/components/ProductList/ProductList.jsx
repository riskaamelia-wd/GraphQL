// import { gql, useQuery } from "@apollo/client"
// import { useEffect, useState } from "react"


// const GetProductList = gql`
//     query GetProduct {
//         Product {
//             id
//             category
//             description
//             name
//             price
//         }
//     }
   
// `

// const ProductList = () => {
//      const {data, loading, error} = useQuery(GetProductList)
//      const [product, setProduct] = useState([])
//      useEffect(() => {
//         console.log('loading', loading);
//         console.log('data ', data);
//         console.log('error = ', error);

//            // cek data sedang fetching
//         if(!loading && error !== undefined){

//             // set data dengan response data state Product
//             setProduct(data.Product)
//         }
//      })

//      return(
//         <>
//             {
//                 loading ? <p>loading guys</p> : 
//                // ngambil ini langsung dari data nya langsung bukan di useEffect 
//                 data?.Product.map(item => 
//                     <div>
//                         <p>{item.name}</p>
//                     </div>
//                 )
//             }
//         </>
//      )
     
// }
// export {ProductList, GetProductList}