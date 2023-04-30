import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

type ResponseData = any;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy();

    const accessToken = "test-token";

    proxy.on("proxyReq", function (proxyReq) {
      proxyReq.setHeader("Authrozation", `Bearer ${accessToken}`);
    });

    const target = "API_URL";

    proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
      changeOrigin: true,
      target,
      secure: !process.env.IS_LOCAL,
    });
  });
}
