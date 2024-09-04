// import { NextApiRequest, NextApiResponse } from 'next';
// import { setCookie } from 'nookies';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { refreshToken } = req.body;

//   // Logic to verify and refresh the token
//   try {
//     const response = await fetch('http://localhost:5000/auth/refresh', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to refresh token');
//     }

//     const { accessToken, newRefreshToken } = await response.json();

//     // Set new tokens in cookies
//     setCookie({ res }, 'access_token', accessToken, { path: '/' });
//     setCookie({ res }, 'refresh_token', newRefreshToken, { path: '/' });

//     res.status(200).json({ accessToken });
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     res.status(500).json({ error: 'Failed to refresh token' });
//   }
// }
