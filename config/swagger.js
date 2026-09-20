import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subscription Tracker API",
      version: "1.0.0",
      description:
        "A RESTful API for tracking and managing user subscriptions, with automated renewal reminders via Upstash Workflow.",
      contact: {
        name: "Subscription Tracker",
      },
    },
    servers: [
      {
        url: "http://localhost:5500",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token (without 'Bearer ' prefix)",
        },
      },
      schemas: {
        // ─── User ───────────────────────────────────────────────────────────
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64f8a1b2c3d4e5f6a7b8c9d0",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // ─── Subscription ────────────────────────────────────────────────────
        Subscription: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64f8a1b2c3d4e5f6a7b8c9d1",
            },
            name: {
              type: "string",
              example: "Netflix",
            },
            price: {
              type: "number",
              example: 15.99,
            },
            currency: {
              type: "string",
              enum: ["USD", "INR", "URA", "GBP"],
              example: "USD",
            },
            frequency: {
              type: "string",
              enum: ["daily", "weekly", "monthly", "yearly"],
              example: "monthly",
            },
            category: {
              type: "string",
              enum: [
                "sports",
                "news",
                "entertainment",
                "lifestyle",
                "technology",
                "finance",
                "politics",
                "other",
              ],
              example: "entertainment",
            },
            paymentMethod: {
              type: "string",
              example: "Credit Card",
            },
            status: {
              type: "string",
              enum: ["active", "cancelled", "expired"],
              example: "active",
            },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
            renewalDate: {
              type: "string",
              format: "date-time",
              example: "2024-02-01T00:00:00.000Z",
            },
            user: {
              type: "string",
              example: "64f8a1b2c3d4e5f6a7b8c9d0",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        // ─── Request Bodies ──────────────────────────────────────────────────
        SignUpRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "secret123",
            },
          },
        },

        SignInRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: { type: "string", example: "secret123" },
          },
        },

        CreateSubscriptionRequest: {
          type: "object",
          required: [
            "name",
            "price",
            "frequency",
            "category",
            "paymentMethod",
            "startDate",
          ],
          properties: {
            name: { type: "string", example: "Netflix" },
            price: { type: "number", example: 15.99 },
            currency: {
              type: "string",
              enum: ["USD", "INR", "URA", "GBP"],
              example: "USD",
            },
            frequency: {
              type: "string",
              enum: ["daily", "weekly", "monthly", "yearly"],
              example: "monthly",
            },
            category: {
              type: "string",
              enum: [
                "sports",
                "news",
                "entertainment",
                "lifestyle",
                "technology",
                "finance",
                "politics",
                "other",
              ],
              example: "entertainment",
            },
            paymentMethod: { type: "string", example: "Credit Card" },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
            },
          },
        },

        UpdateSubscriptionRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Netflix Premium" },
            price: { type: "number", example: 22.99 },
            currency: {
              type: "string",
              enum: ["USD", "INR", "URA", "GBP"],
            },
            paymentMethod: { type: "string", example: "Debit Card" },
            frequency: {
              type: "string",
              enum: ["daily", "weekly", "monthly", "yearly"],
            },
            category: {
              type: "string",
              enum: [
                "sports",
                "news",
                "entertainment",
                "lifestyle",
                "technology",
                "finance",
                "politics",
                "other",
              ],
            },
          },
        },

        UpdateUserRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
            password: { type: "string", minLength: 6, example: "newpass123" },
          },
        },

        // ─── Responses ───────────────────────────────────────────────────────
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "An error occurred" },
          },
        },

        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "User created successfully" },
            data: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Auth",
        description: "Authentication & Authorization endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Subscriptions",
        description: "Subscription tracking & management endpoints",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
