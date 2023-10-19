// import { createVendiaClient } from "@vendia/client";

// const client = createVendiaClient({
//     apiUrl: `https://zc3kfaa6p7.execute-api.us-west-2.amazonaws.com/graphql/`,
//     apiKey: '7Wgz8nttNdnQKagjsRqXJVb96fokgfSf7kMdoA44U6Nw', // <---- API key
//   })

// export const vendiaClient = () =>
// {
//     return{client}
// }

// export const VendiaClient = {
//   uploadTestData: async (testData) => {
//     try {
//       const response = await client.mutate({
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error uploading test data to Vendia: ', error);
//       throw error;
//     }
//   },

//   uploadDeviceData: async (deviceData) => {
//     try {
//       const response = await client.mutate({
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error uploading device data to Vendia: ', error);
//       throw error;
//     }
//   },
// };