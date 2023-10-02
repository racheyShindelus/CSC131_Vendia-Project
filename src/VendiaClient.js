import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://zc3kfaa6p7.execute-api.us-west-2.amazonaws.com/graphql/`,
    apiKey: '7Wgz8nttNdnQKagjsRqXJVb96fokgfSf7kMdoA44U6Nw', // <---- API key
  })

export const vendiaClient = () =>
{
    return{client}
}