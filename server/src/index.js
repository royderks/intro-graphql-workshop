const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require('apollo-server-core');

// The local variable that represents a shopping cart
let cart = {
  count: 0,
  products: [],
};

// The hard coded data for our GraphQL server
const data = {
  products: [
    {
      id: 1,
      title: 'Canvas Bag Original',
      thumbnail:
        'https://images.pexels.com/photos/9324371/pexels-photo-9324371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 12.99,
      category_id: 1,
    },
    {
      id: 2,
      title: 'Canvas Bag Green',
      thumbnail:
        'https://images.pexels.com/photos/9324372/pexels-photo-9324372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 12.99,
      category_id: 1,
    },
    {
      id: 3,
      title: 'Travel Mug',
      thumbnail:
        'https://images.pexels.com/photos/7488490/pexels-photo-7488490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      price: 9.99,
      category_id: 2,
    },
  ],
  categories: [
    { id: 1, title: 'Bags' },
    { id: 2, title: 'Mugs' },
  ],
};

// A schema is a collection of type definitions (hence "typeDefs") that together define the "shape" of queries that are executed against your data.
const typeDefs = gql`
  type Product {
    id: Int!
    title: String!
    thumbnail: String!
    price: Float
    category: Category
  }
  type Category {
    id: Int!
    title: String!
  }
  type Cart {
    count: Int
    products: [Product]
  }
  type Query {
    product: Product
    products(limit: Int): [Product]
    categories: [Category]
    cart: Cart
  }
  type Mutation {
    addToCart(productId: Int!): Cart
  }
`;

// Resolvers define the technique for fetching the types defined in the schema
const resolvers = {
  Query: {
    cart: () => cart,
    categories: () => data.categories,
    products: (_, { limit }) => {
      const products = data.products.map((product) => ({
        ...product,
        category: data.categories.find(({ id }) => id === product.category_id),
      }));

      if (limit && Number.isInteger(limit)) {
        return products.slice(0, limit);
      }

      return products;
    },
  },
  Mutation: {
    addToCart: (_, { productId }) => {
      const product = data.products.find(({ id }) => id === productId);

      if (!product) {
        return null;
      }

      cart = {
        ...cart,
        count: cart.count + 1,
        products: [...cart.products, product],
      };

      return cart;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers, // Use the "old" GraphQL Playground
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
