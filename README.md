Backend server with Auth and CRUD operations using Express and Mongoose.

ROUTES:
Auth endpoints:
[POST] /AUTH/LOGIN
[POST] /AUTH/REGISTER
[GET] /AUTH/LOGOUT

Get endpoints:
[GET] /GET/LATEST
[GET] /GET/CATALOG
[GET] /GET/POST/:id
[GET] /GET/CATEGORY/:name/page/:page

CRUD endpoints:
[POST] /POST/ADD
[POST] /:id/:operation
[PATCH] /POST/:id
[DELETE] /POST/:id