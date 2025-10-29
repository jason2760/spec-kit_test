# 系統測試範例 Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-28

## Active Technologies

- C# .NET 9 + ASP.NET Core MVC (001-customer-management, 002-personnel-access)
- Vue3 (001-customer-management, 002-personnel-access)
- SQL Server (001-customer-management, 002-personnel-access)
- xUnit (001-customer-management, 002-personnel-access)
- Playwright (001-customer-management, 002-personnel-access)
- Vitest (001-customer-management, 002-personnel-access)
- Cypress (001-customer-management, 002-personnel-access)
- Entity Framework Core (001-customer-management, 002-personnel-access)

## Project Structure

```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

## Commands

C#: dotnet test
Vue3: npm test; npm run lint

## Code Style

C#: Follow standard C# coding conventions.
Vue3: Follow standard Vue.js style guide.

## Recent Changes

- 002-personnel-access: Added C# .NET 9 + ASP.NET Core MVC, Vue3, SQL Server, EF Core, xUnit, Playwright, Vitest, Cypress
- 001-customer-management: Added C# .NET 10.8 + ASP.NET Core MVC, Vue3, SQL Server, EF Core, xUnit, Playwright, Vitest, Cypress

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->