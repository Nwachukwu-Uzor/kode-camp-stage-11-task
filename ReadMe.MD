# About

Create a simple nodejs application with express and mongoose <br />
<br />
I create a simple product model with name, price and description properties using mongoose.
<br />
<br />
Using express, I create a simple RestFul CRUD API for the model

## Endpoints

---

### Create products

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

### Get all messages

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

### Get a single messages

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

### Update a message

```
path: http://localhost:5000/messages/:id
method: PATCH

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

### Delete a message

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
