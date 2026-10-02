module.exports = {
  apps: [
    {
      name: "backend",
      script: "server.js",
      cwd: "/mnt/d/productboost/discrepto/backend",
    },
    {
      name: "frontend",
      script: "bash",
      args: "-c 'npm run preview'",
      cwd: "/mnt/d/productboost/discrepto",
    },
    {
      name: "tunnel",
      script: "bash",
      args: "-c 'cloudflared tunnel --protocol http2 run aiwrite'",
    }
  ],
};
