import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.podcast.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
}