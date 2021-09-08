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

1. Try running the local GraphQL server, what do you see? Can you create a query to get a list of products with their `id`, `title`, `thumbnail`, and `price`?

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

3. The query to get products can also be altered, so the number of products returned can be limited. What would this query look like?

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

With query variables:

```json
{
  "limit": 1
}
```

</p>
</details>

4. We're able to query a list of products, so let's try and add some to the cart. From the playground, you can execute a mutation to add a product to the cart and return the fields `count` and `products` for your cart.

Hint: Check the schema in case you get any errors. There's no field to keep track of the quantity of the product in the cart, so duplicates could be possible.

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

6. Suppose we also want to display the category of the products, how can we add this to our query?

Hint: You can copy most of the logic to display the price to do this.

<details>
<summary>Show solution</summary>
<p>

[https://github.com/royderks/intro-graphql-workshop/tree/ex-6](https://github.com/royderks/intro-graphql-workshop/tree/ex-6)

</p>
</details>

7. We already saw that it's possible to limit the number of products that are returned from the GraphQL server. Add this functionality to the `useQuery` Hook and create a dropdown to change the number of products that are displayed from the application.

Hint: Don't worry too much about the styling of the dropdown.

<details>
<summary>Show solution</summary>
<p>

[https://github.com/royderks/intro-graphql-workshop/tree/ex-7](https://github.com/royderks/intro-graphql-workshop/tree/ex-7)

</p>
</details>

8. Finally, we want to be able to add any of these products to the shopping cart. On the top right of the application, you can already find a placeholder for this. Connect this to the actual query to get the number of products in the cart, and add a button to the `Product` component to add something to the cart using a mutation with the `useMutation` Hook.

Hint: Have a look at the `refetchQueries` option of the `useMutation` Hook.

<details>
<summary>Show solution</summary>
<p>

[https://github.com/royderks/intro-graphql-workshop/tree/ex-8](https://github.com/royderks/intro-graphql-workshop/tree/ex-8)

</p>
</details>

BONUS: You could display the entire contents of the cart for example on a different page or in a popup/modal. By doing so, you can restructure the application to have more (and smaller) React components.
