import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const accessToken = cookies.access_token || '';
  const refreshToken = cookies.refresh_token || '';

  res.status(200).json({ accessToken, refreshToken });
}
