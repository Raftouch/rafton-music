// export async function fetchWithAuth(url: string, accessToken: string | null) {
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: accessToken ? `Bearer ${accessToken}` : '',
//         },
//       });
  
//       if (response.status === 401) {
//         // Handle unauthorized access here (e.g., refresh tokens)
//       }
  
//       if (!response.ok) {
//         throw new Error(`Failed to fetch: ${response.statusText}`);
//       }
  
//       return response;
//     } catch (error) {
//       console.error('Error fetching:', error);
//       throw error;
//     }
//   }
  