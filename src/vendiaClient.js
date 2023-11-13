import { createVendiaClient } from "@vendia/client";

const client = createVendiaClient({
    apiUrl: `https://zc3kfaa6p7.execute-api.us-west-2.amazonaws.com/graphql/`,
    apiKey: 'DcDYNMrdJM3Sib4eBHN4FZbUHXD8VVWu6Dtaa5iktNL4', // <---- API key
    websocketUrl: 'wss://vbgugj44u0.execute-api.us-west-2.amazonaws.com/graphql',
})

export const vendiaClient = () => {
    return {client};
};

export const VendiaClient = {
    uploadTestData: async (testData) => {
      try {
        const response = await client.mutate({
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading test data to Vendia: ', error);
        throw error;
      }
    },
  
    uploadDeviceData: async (deviceData) => {
      try {
        const response = await client.mutate({
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading device data to Vendia: ', error);
        throw error;
      }
    },
  };