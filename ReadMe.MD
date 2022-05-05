# About

Create a simple nodejs application with express and mongoose <br />
<br />
I create a simple product model with name, price and description properties using mongoose.
<br />
<br />
Using express, I create a simple RestFul CRUD API for the model

## Endpoints

---

## Products

<br />
### Create a single product

```
path: http://localhost:5000/api/product

method: POST

Json payload:
    {
        "name": "product name",
        "price": "number product price",
        "description": "string product description"
    }

response:

    success:
        status: 201
        json:
            {
                "message": "product created successfully", "data": "payload + id"
            }

    error:
        status: 400,
        json:
            {
                "message": "Invalid product"
            }
```

### Get all products

```
path: http://localhost:5000/api/products
method: GET

response:

    success:
        status: 200
        json:
            {
                data: [all products]
            }

    error:
        status: 400,
        json:
            {
                "message": "Not found"
            }
```

### Get a single product

```
path: http://localhost:5000/api/products/:id
method: GET

response:

    success:
        status: 200
        json:
            {
                data: single product
            }

    error:
        status: 400,
        json:
            {
                "message": "Invalid product Id"
            }
```

### Search for product by name or category

```
path: http://localhost:5000/api/products/search?query
method: GET
query:
    {
        category: "product category",
        name: "product name"
    }

response:

    success:
        status: 200
        json:
            {
                data: [products matching query],
                success: true
            }

    error:
        status: 404,
        json:
            {
                message: "No Product Found",
                success: false
            }
```

### Update a product

```
path: http://localhost:5000/messages/:id
method: PATCH

Json Payload:
    {
        // optionally add fields
        name: "product name",
        description: "product description",
        price: "product price"
    }

response:

    success:
        status: 200
        json:
            {
                "message": "update successful"
            }

    error:
        status: 401,
        json:
            {
                "message": "Invalid product Id"
            }
```

### Delete a product

```
path: http://localhost:5000/api/products/:id
method: DELETE

response:

    success:
        status: 200
        json:
            {
                "message": "product deleted successfully"
            }

    error:
        status: 401,
        json:
            {
                "message": "Invalid product Id"
            }
```

## Users

### Create an Account

```
path: http://localhost:5000/api/accounts/signup
method: POST

Json Payload:
    {
        "firstName": "user's first name",
        "lastName": "user's last name",
        "email" "user's email",
        "password": "user's password"
    }

response:
    success:
        {
            status: 201,
            success: true,
            data: {
                firstName: "user's first name",
                Id: "Database generated user id",
                lastName: "user's last name",
                email: "user's email"
            }
        }
    failure:
        {
            status: 400
            success: false,
            message: "Error message"
        }
```

### Get All Users

```
path: http://localhost:5000/api/accounts/users
method: GET

response:
    success: {
        status: 200,
        success: true,
        data: [all users]
    }
    failure: {
        status: 404,
        success: false,
    }
```

### Get a user by Id

```
path: http://localhost:5000/api/accounts/users/:id
method: GET

response:
    success: {
        status: 200,
        success: true,
        data: [user data]
    }
    failure: {
        success: false,
    }
```

### Update User password

```
path: http://localhost:5000/api/accounts/users/:id/password-update

method: PATCH

Json payload:
    {
        password: "new user password"
    }

response:
    success: {
        status: 204
    }
    error: {
        status: 404,
        success: false
    }
```

### Update User Details

```
path: http://localhost:5000/api/accounts/users/:id/update-user-details

method: PATCH

Json payload:
    {
        // optionally supply all user account fields except email and password
    }

response:
    success: {
        status: 204
    }
    error: {
        status: 404,
        success: false
    }
```
