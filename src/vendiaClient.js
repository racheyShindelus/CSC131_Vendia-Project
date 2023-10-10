import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://zc3kfaa6p7.execute-api.us-west-2.amazonaws.com/graphql/`,
    apiKey: 'DcDYNMrdJM3Sib4eBHN4FZbUHXD8VVWu6Dtaa5iktNL4', // <---- API key
})

export const vendiaClient = () => {
    return {client};

};


