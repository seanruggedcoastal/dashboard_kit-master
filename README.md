# Netlify Deploy
  - use the `yarn export` command
  - set directory to `out`
  - set env ```MONGODB_URL=
JWT_SECRET=sfghgfhjfghjfghjfghj
JWT_EXP=1h```

# Backend functions in dev mode
Use the Netlify CLI and run the `yarn dev:lambda` command. This will run the functions and next dev command proxied through `localhost:8888`