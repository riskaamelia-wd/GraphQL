import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink} from '@apollo/client/link/ws'
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
    uri : 'https://frank-reptile-11.hasura.app/v1/graphql',
    // cache : new InMemoryCache(),
    headers : {
        'x-hasura-admin-secret':'EeAPqmX4ZYPNfxTKQ7pFkLBDMoCS0UgQVo1IafLPLkg3vLe2KrWj3F8bsYydQIeb'
    }
})

const wsLink = new WebSocketLink({
    uri : 'wss://frank-reptile-11.hasura.app/v1/graphql',
    options : {
        reconnect : true,
        connectionParams : {
            headers : {
                'x-hasura-admin-secret':'EeAPqmX4ZYPNfxTKQ7pFkLBDMoCS0UgQVo1IafLPLkg3vLe2KrWj3F8bsYydQIeb'
            }
        }
    }
})

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    httpLink
)



const client = new ApolloClient({
    // uri : 'https://frank-reptile-11.hasura.app/v1/graphql',
    link : splitLink,
    cache : new InMemoryCache(),
    // headers : {
    //     'x-hasura-admin-secret':'EeAPqmX4ZYPNfxTKQ7pFkLBDMoCS0UgQVo1IafLPLkg3vLe2KrWj3F8bsYydQIeb'
    // }
})
export default client


// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// // import webs

// const httpLink = new HttpLink({
//     uri : 'https://frank-reptile-11.hasura.app/v1/graphql',
//     // cache : new InMemoryCache(),
//     headers : {
//         'x-hasura-admin-secret':'EeAPqmX4ZYPNfxTKQ7pFkLBDMoCS0UgQVo1IafLPLkg3vLe2KrWj3F8bsYydQIeb'
//     }
// })

// const wsLink = new WebSocketLink({
//     uri : 'https://frank-reptile-11.hasura.app/v1/graphql',
//     // cache : new InMemoryCache(),
//     // headers : {
//     //     'x-hasura-admin-secret':'EeAPqmX4ZYPNfxTKQ7pFkLBDMoCS0UgQVo1IafLPLkg3vLe2KrWj3F8bsYydQIeb'
//     // }
//     Options : {
//         reconnect : true,
//         conectionParams : {
//             headers : {
                
//         }
//     }

// })

// const split = split(
//     ({query}) => {
//         const definition = getMainDefinition(query)
//         definition.kind === 'OperationDefinition' && definition.operation === 'subcripiton'
//     },
//     wsLink,
//     httpLink
//     )


// const client = new ApolloClient({
//     // uri : 'https://frank-reptile-11.hasura.app/v1/graphql',
//     link : split,
//     cache : new InMemoryCache()
//     // cache : new InMemoryCache(),
//     // headers : {
//     //     'x-hasura-admin-secret':'EeAPqmX4ZYPNfxTKQ7pFkLBDMoCS0UgQVo1IafLPLkg3vLe2KrWj3F8bsYydQIeb'
//     // }
// })
// export default client