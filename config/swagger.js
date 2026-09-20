import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SERVER_URL } from "./env.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subscription Tracker API",
      version: "1.0.0",
      description:
        "A production-ready REST API to manage digital subscriptions and send automated email reminders before renewal dates. Built with Node.js, Express, MongoDB, JWT Authentication, and Upstash QStash workflow scheduling.",
      contact: {
        name: "Sonak Jha",
        email: "sonakjha369@gmail.com",
      },
    },
    servers: [
      {
        url: SERVER_URL || "https://subscription-tracking-api-ahrw.onrender.com",
        description: "Production Server (Render)",
      },
      {
        url: "http://localhost:5500",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
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
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6a6b302ef250b87ad168ed79",
            },
            name: {
              type: "string",
              example: "Sonak Jha",
            },
            email: {
              type: "string",
              format: "email",
              example: "sonak@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-07-30T11:06:22.102Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-07-30T11:06:22.102Z",
            },
          },
        },

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
        Subscription: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6a6b3034f250b87ad168ed7d",
            },
            name: {
              type: "string",
              example: "Netflix Premium",
            },
            price: {
              type: "number",
              example: 19.99,
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
              example: "2026-07-01T00:00:00.000Z",
            },
            renewalDate: {
              type: "string",
              format: "date-time",
              example: "2026-07-31T00:00:00.000Z",
            },
            user: {
              type: "string",
              example: "6a6b302ef250b87ad168ed79",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-07-30T11:06:28.643Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-07-30T11:06:28.643Z",
            },
          },
        },

        CreateSubscriptionRequest: {
          type: "object",
          required: [
            "name",
            "price",
            "currency",
            "frequency",
            "category",
            "paymentMethod",
            "startDate",
          ],
          properties: {
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
            },
          },
        },

        UpdateSubscriptionRequest: {
          type: "object",
          properties: {
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
          },
        },

        // ─── Common Response Schemas ────────────────────────────────────
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
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
          },
        },
      },
    },
    tags: [
      {
        name: "Auth",
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
      },
    ],
  },
  apis: ["./routes/*.js"],
};

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
