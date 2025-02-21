Backend server with Auth and CRUD operations using Express and Mongoose.

ROUTES:\
Auth endpoints:\
[POST] /AUTH/LOGIN\
[POST] /AUTH/REGISTER\
[GET] /AUTH/LOGOUT

Get endpoints:\
[GET] /GET/LATEST\
[GET] /GET/CATALOG\
[GET] /GET/POST/:ID\
[GET] /GET/CATEGORY/:NAME/PAGE/:PAGE

CRUD endpoints:\
[POST] /POST/ADD\
[POST] /:ID/:OPERATION\
[PATCH] /POST/:ID\
[DELETE] /POST/:ID\
[POST] /COMMENT/ADD\
[PATCH] /COMMENT/:ID\
[DELETE] /COMMENT/:ID