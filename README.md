# Getting Started With GraphQL

## Get started

This project consists of two parts, the `server` directory holds the "backend" part and the `app` directory the "frontend" part. In both directories you need to run the following commands:

```
yarn && yarn start
```

This will run a local GraphQL server on [https://localhost:4000](https://localhost:4000) and a React application on [https://localhost:3000](https://localhost:4000)

### Libraries used

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
- [Apollo Client](https://www.apollographql.com/docs/react/get-started/)

## Exercises

### A. "Backend"

1. Try running the local GraphQL server, what do you see? Can you create a query to get a list of products with their `id`, `title`, `thumbnail` and `price`?

Hint: Make sure you have run both `yarn && yarn start` in the `server` directory where the code for the local GraphQL server is.

<details>
<summary>Show solution</summary>
<p>

```graphql
query {
  products {
    id
    title
    thumbnail
    price
  }
}
```

</p>
</details>

2. Can you extend this query to get both the product data and the `title` of its category?

<details>
<summary>Show solution</summary>
<p>

```graphql
query {
  products {
    id
    title
    thumbnail
    price
    category {
      title
    }
  }
}
```

</p>
</details>

3. The query to get products can also be altered, so the amount of products returned can be limited. What would this query look like?

Hint: There are multiple ways to write this query, including a named query using the query variables tab in the GraphQL Playground

<details>
<summary>Show solution</summary>
<p>

```graphql
query {
  products(limit: 1) {
    id
    title
    thumbnail
    price
    category {
      title
    }
  }
}
```

OR

```graphql
query GetProducts($limit: Int) {
  products(limit: $limit) {
    title
    thumbnail
    id
    category {
      title
    }
  }
}
```

With query variables:

```json
{
  "limit": 1
}
```

</p>
</details>

4. We're able to query a list of products, so let's try and add some to the cart. From the playground you can execute a mutation to add a product to the cart, and return the fields `count` and `products` for your cart.

Hint: Check the schema in case you get any errors. There's no field to keep track of the quantitu of the product in the cart, so duplicates could be possible.

<details>
<summary>Show solution</summary>
<p>

```graphql
mutation AddToCart($productId: Int!) {
  addToCart(productId: $productId) {
    count
    products {
      title
      price
    }
  }
}
```

With query variables:

```json
{
  "productId": 1
}
```

</p>
</details>


### B. "Frontend"

5. Try running the React application, what do you see? Can you add Apollo Client to this application and retrieve the products using an `useQuery` Hook?

Hint: Make sure you have run both `yarn && yarn start` in the `app` directory where the code for the React application code is.


<details>
<summary>Show solution</summary>
<p>

[https://github.com/royderks/intro-graphql-workshop/tree/ex-5](https://github.com/royderks/intro-graphql-workshop/tree/ex-5)
</p>
</details>