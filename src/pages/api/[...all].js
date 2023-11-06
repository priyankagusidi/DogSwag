
import httpProxy from "http-proxy";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
};

export default (req, res) =>
  new Promise((resolve, reject) => {
    const proxy = httpProxy.createProxyServer();
    proxy.once("proxyRes", resolve).once("error", reject);
    proxy.web(req, res, {
      changeOrigin: true,
      target: "http://localhost:4000",
    });
  });
