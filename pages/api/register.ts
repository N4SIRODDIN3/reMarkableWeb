import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { v4 } from "uuid";

type Data = {
  deviceToken: string;
};

export default async (
  req: NextApiRequest & { body: { code: string } },
  res: NextApiResponse<Data>
) => {
  try {
    if (req.method === "POST") {
      const code = req.body.code;
      // Note: API expects Content-Type: text/plain and raw JSON string!
      const payload = JSON.stringify({
        code,
        deviceDesc: "browser-chrome",
        deviceID: v4(),
      });

      const result = await axios.post<string>(
        "https://webapp.cloud.remarkable.com/token/json/2/device/new",
        payload,
        {
          headers: {
            "Content-Type": "text/plain;charset=UTF-8",
          },
        }
      );
      res.status(200).json({ deviceToken: result.data });
    }
  } catch (e) {
    console.error(e);
    // @ts-ignore
    return res.status(500).send({ success: false });
  }
};
