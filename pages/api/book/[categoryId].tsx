import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { getBooks } from 'utils/services/book';

export default async function footer(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != 'GET') {
    res.status(StatusCodes.BAD_REQUEST).send({ message: ReasonPhrases.BAD_REQUEST });
    return;
  };
  const { page, categoryId } = req.query;
  console.log('page server', page);
  const data = await getBooks(parseInt(categoryId as string), parseInt(page as string), 12);
  res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: data ? data : [] });  
};