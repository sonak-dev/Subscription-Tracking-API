<<<<<<< HEAD
import swaggerJSDoc from "swagger-jsdoc";
=======
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SERVER_URL } from "./env.js";
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subscription Tracker API",
      version: "1.0.0",
      description:
<<<<<<< HEAD
        "A RESTful API for tracking and managing user subscriptions, with automated renewal reminders via Upstash Workflow.",
      contact: {
        name: "Subscription Tracker",
=======
        "A production-ready REST API to manage digital subscriptions and send automated email reminders before renewal dates. Built with Node.js, Express, MongoDB, JWT Authentication, and Upstash QStash workflow scheduling.",
      contact: {
        name: "Sonak Jha",
        email: "sonakjha369@gmail.com",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
      },
    },
    servers: [
      {
<<<<<<< HEAD
        url: "http://localhost:5500",
        description: "Development Server",
=======
        url: SERVER_URL || "https://subscription-tracking-api-ahrw.onrender.com",
        description: "Production Server (Render)",
      },
      {
        url: "http://localhost:5500",
        description: "Local Development Server",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
      },
    ],
    components: {
      securitySchemes: {
<<<<<<< HEAD
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token (without 'Bearer ' prefix)",
        },
      },
      schemas: {
        // ─── User ───────────────────────────────────────────────────────────
=======
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter your JWT token obtained from Sign In. Example: `Bearer eyJhbGci...`",
        },
      },
      schemas: {
        // ─── User Schemas ───────────────────────────────────────────────
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
<<<<<<< HEAD
              example: "64f8a1b2c3d4e5f6a7b8c9d0",
            },
            name: {
              type: "string",
              example: "John Doe",
=======
              example: "6a6b302ef250b87ad168ed79",
            },
            name: {
              type: "string",
              example: "Sonak Jha",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
            email: {
              type: "string",
              format: "email",
<<<<<<< HEAD
              example: "john@example.com",
=======
              example: "sonak@example.com",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
            createdAt: {
              type: "string",
              format: "date-time",
<<<<<<< HEAD
=======
              example: "2026-07-30T11:06:22.102Z",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
            updatedAt: {
              type: "string",
              format: "date-time",
<<<<<<< HEAD
=======
              example: "2026-07-30T11:06:22.102Z",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
          },
        },

<<<<<<< HEAD
        // ─── Subscription ────────────────────────────────────────────────────
=======
        SignUpRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "Sonak Jha",
            },
            email: {
              type: "string",
              format: "email",
              example: "sonak@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "MyPassword123!",
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
              example: "sonak@example.com",
            },
            password: {
              type: "string",
              example: "MyPassword123!",
            },
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

        // ─── Subscription Schemas ────────────────────────────────────────
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
        Subscription: {
          type: "object",
          properties: {
            _id: {
              type: "string",
<<<<<<< HEAD
              example: "64f8a1b2c3d4e5f6a7b8c9d1",
            },
            name: {
              type: "string",
              example: "Netflix",
            },
            price: {
              type: "number",
              example: 15.99,
=======
              example: "6a6b3034f250b87ad168ed7d",
            },
            name: {
              type: "string",
              example: "Netflix Premium",
            },
            price: {
              type: "number",
              example: 19.99,
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
              example: "2024-01-01T00:00:00.000Z",
=======
              example: "2026-07-01T00:00:00.000Z",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
            renewalDate: {
              type: "string",
              format: "date-time",
<<<<<<< HEAD
              example: "2024-02-01T00:00:00.000Z",
            },
            user: {
              type: "string",
              example: "64f8a1b2c3d4e5f6a7b8c9d0",
=======
              example: "2026-07-31T00:00:00.000Z",
            },
            user: {
              type: "string",
              example: "6a6b302ef250b87ad168ed79",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
            createdAt: {
              type: "string",
              format: "date-time",
<<<<<<< HEAD
=======
              example: "2026-07-30T11:06:28.643Z",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
            updatedAt: {
              type: "string",
              format: "date-time",
<<<<<<< HEAD
=======
              example: "2026-07-30T11:06:28.643Z",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
          },
        },

<<<<<<< HEAD
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

=======
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
        CreateSubscriptionRequest: {
          type: "object",
          required: [
            "name",
            "price",
<<<<<<< HEAD
=======
            "currency",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            "frequency",
            "category",
            "paymentMethod",
            "startDate",
          ],
          properties: {
<<<<<<< HEAD
            name: { type: "string", example: "Netflix" },
            price: { type: "number", example: 15.99 },
=======
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Netflix Premium",
            },
            price: {
              type: "number",
              minimum: 0,
              example: 19.99,
            },
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
            paymentMethod: { type: "string", example: "Credit Card" },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2024-01-01T00:00:00.000Z",
=======
            paymentMethod: {
              type: "string",
              example: "Credit Card",
            },
            startDate: {
              type: "string",
              format: "date-time",
              example: "2026-07-01T00:00:00.000Z",
            },
            renewalDate: {
              type: "string",
              format: "date-time",
              example: "2026-07-31T00:00:00.000Z",
              description:
                "Optional. Auto-calculated from startDate + frequency if not provided.",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
          },
        },

        UpdateSubscriptionRequest: {
          type: "object",
          properties: {
<<<<<<< HEAD
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
=======
            name: { type: "string", example: "Netflix Standard" },
            price: { type: "number", example: 15.49 },
            currency: {
              type: "string",
              enum: ["USD", "INR", "URA", "GBP"],
              example: "USD",
            },
            paymentMethod: { type: "string", example: "PayPal" },
            frequency: {
              type: "string",
              enum: ["daily", "weekly", "monthly", "yearly"],
              example: "monthly",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
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
<<<<<<< HEAD
=======
              example: "entertainment",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
            },
          },
        },

<<<<<<< HEAD
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
=======
        // ─── Common Response Schemas ────────────────────────────────────
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },

>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
<<<<<<< HEAD
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
=======
            error: {
              type: "string",
              example: "Resource not found",
            },
          },
        },

        UnauthorizedResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Unauthorized" },
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
          },
        },
      },
    },
    tags: [
      {
        name: "Auth",
<<<<<<< HEAD
        description: "Authentication & Authorization endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Subscriptions",
        description: "Subscription tracking & management endpoints",
=======
        description:
          "Authentication endpoints — Sign Up, Sign In, Sign Out using JWT tokens",
      },
      {
        name: "Users",
        description:
          "User management — Create, Read, Update, Delete user accounts",
      },
      {
        name: "Subscriptions",
        description:
          "Subscription tracking — Full CRUD with automated email reminders",
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
      },
    ],
  },
  apis: ["./routes/*.js"],
};

<<<<<<< HEAD
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
=======
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  // Swagger JSON endpoint
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // Swagger UI
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Subscription Tracker API Docs",
      customCss: `
        .swagger-ui .topbar { background-color: #1a1a2e; }
        .swagger-ui .topbar .download-url-wrapper { display: none; }
        .swagger-ui .info .title { color: #4a90e2; }
        .swagger-ui .btn.authorize { background-color: #4a90e2; border-color: #4a90e2; }
        .swagger-ui .btn.authorize svg { fill: white; }
      `,
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: "list",
        filter: true,
        showExtensions: true,
      },
    })
  );

  console.log(`📄 Swagger Docs available at /api-docs`);
};
>>>>>>> 6385dd779f7d0d00a30ed5e405febce4f949fad1
