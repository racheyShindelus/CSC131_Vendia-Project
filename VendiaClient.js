import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://9m87ws3ni2.execute-api.us-west-2.amazonaws.com/graphql/`,
    apiKey: 'H75K7g6idrFYrteXpJHxLxcJsVxNpq3odj7viWPKozDN', // <---- API key
  })

  export const vendiaClient = () => {
    return {client};
  }
  
