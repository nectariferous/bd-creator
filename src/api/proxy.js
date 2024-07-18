// api/proxy.js
import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "https://api.foxithub.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // remove /api prefix when forwarding to target
  },
});
