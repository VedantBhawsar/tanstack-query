// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  peoples: string[] | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = [
    "vedant",
    "dipali",
    "mitalee",
    "dipraj",
    "nehali",
    "ruchita",
    "shruti",
  ];

  if (req.method === "GET") {
    res.status(200).json({ peoples: data });
  }
}
