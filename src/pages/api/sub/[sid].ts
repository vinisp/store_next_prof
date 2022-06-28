import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sid } = req.query
  res.end(`Post: ${sid}`)
}
