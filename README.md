# NestJS Notes

## Table of Contents

* [NestJS Basics](#nestjs-basics)
* [Project Structure](#project-structure)
* [Modules](#modules)
* [Decorators](#decorators)
* [Controllers](#controllers)
* [Routes](#routes)
* [Query Parameters](#query-parameters)
* [Route Parameters](#route-parameters)
* [Request Body](#request-body)
* [Services](#services)
* [Dependency Injection](#dependency-injection)
* [DTOs](#dtos)
* [HTTP Methods](#http-methods)
* [HTTP Status Codes](#http-status-codes)
* [CRUD Service Methods](#crud-service-methods)
* [Pipes](#pipes)
* [Validation](#validation)
* [Guards](#guards)
* [Authentication and Authorization](#authentication-and-authorization)
* [Passport.js](#passportjs)
* [Passport Strategies](#passport-strategies)
* [Pipe vs Guard](#pipe-vs-guard)
* [Request Flow](#request-flow)
* [Quick Summary](#quick-summary)

---

# NestJS Basics

NestJS is a Node.js framework for building server-side applications and APIs.

It is built with TypeScript and provides a structure for organizing backend applications.

Some important concepts are:

```text
Modules
Controllers
Services
Dependency Injection
DTOs
Pipes
Guards
Authentication
```

---

# Project Structure

A basic NestJS project contains files like:

```text
src/
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

Usually, a feature can have its own files:

```text
profiles/
├── profiles.controller.ts
├── profiles.service.ts
├── profiles.module.ts
└── dto/
    └── create-profile.dto.ts
```

---

# Modules

A module organizes related parts of the application.

Example:

```ts
@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
```

A module can contain:

```text
controllers → handle requests
providers   → services/business logic
imports     → other modules
exports     → providers shared with other modules
```

Simple definition:

> Module = organizes related components and their dependencies.

---

# Decorators

Decorators use the `@` symbol and tell NestJS what a class or method is supposed to do.

Examples:

```ts
@Controller()
@Get()
@Post()
@Injectable()
@Module()
@Body()
@Param()
@Query()
```

For example:

```ts
@Controller('profiles')
export class ProfilesController {}
```

`@Controller()` tells NestJS that this class is a controller.

---

# Controllers

A controller handles HTTP requests and sends responses.

Example:

```ts
@Controller('profiles')
export class ProfilesController {

  @Get()
  findAll() {
    return [];
  }
}
```

Request:

```text
GET /profiles
```

The controller receives the request and handles it.

Simple idea:

```text
Controller = What request came?
```

---

# Routes

The controller defines the base route:

```ts
@Controller('profiles')
```

Then HTTP decorators define the specific route:

```ts
@Get()
@Post()
@Put()
@Patch()
@Delete()
```

Example:

```ts
@Controller('profiles')
export class ProfilesController {

  @Get()
  findAll() {
    return [];
  }

  @Post()
  create() {
    return {};
  }
}
```

Routes:

```text
GET  /profiles
POST /profiles
```

---

# Query Parameters

Query parameters come after `?`.

Example:

```text
GET /profiles?name=azra
```

Use `@Query()`:

```ts
@Get()
find(@Query('name') name: string) {
  return { name };
}
```

If the request is:

```text
/profiles?name=azra
```

Then:

```text
name = "azra"
```

You can also get all query parameters:

```ts
@Query() query
```

---

# Route Parameters

Route parameters are dynamic values inside the URL.

Example:

```text
GET /profiles/123
```

Route:

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return id;
}
```

Here:

```text
:id → dynamic parameter
```

Difference:

```text
/profiles/123
      ↓
@Param('id')

/profiles?id=123
      ↓
@Query('id')
```

---

# Request Body

`@Body()` gets data sent in the request body.

Example:

```ts
@Post()
create(@Body() body: CreateProfileDto) {
  return body;
}
```

Request:

```json
{
  "name": "Azra",
  "description": "Developer"
}
```

`@Body()` gets the whole object.

You can also get one property:

```ts
@Body('name') name: string
```

---

# Services

Services contain the actual business logic.

Example:

```ts
@Injectable()
export class ProfilesService {

  findAll() {
    return [];
  }

}
```

The controller should handle the request, while the service does the actual work.

```text
Controller → handles request
Service    → handles business logic
```

Typical flow:

```text
Client
  ↓
Controller
  ↓
Service
  ↓
Database / Logic
  ↓
Service
  ↓
Controller
  ↓
Response
```

---

# Dependency Injection

NestJS has a Dependency Injection system.

Instead of creating a service manually:

```ts
const service = new ProfilesService();
```

NestJS can create it and inject it into the controller.

```ts
constructor(private profilesService: ProfilesService) {}
```

For a service to be managed by NestJS, we normally use:

```ts
@Injectable()
```

Simple definition:

> Dependency Injection means NestJS creates and provides the dependencies a class needs.

---

# DTOs

DTO means **Data Transfer Object**.

A DTO defines the structure of data coming into an API.

Example:

```ts
export class CreateProfileDto {
  name: string;
  description: string;
}
```

Then:

```ts
@Post()
create(@Body() body: CreateProfileDto) {
  return this.profilesService.create(body);
}
```

DTOs are useful because they give us a clear structure for incoming data.

## DTO vs Interface

An interface is mainly used for TypeScript type checking.

A DTO class exists at runtime and can work with validation decorators.

For NestJS APIs, DTO classes are commonly used.

---

# HTTP Methods

## GET

Used to get data.

```ts
@Get()
findAll() {}
```

## POST

Used to create data.

```ts
@Post()
create() {}
```

## PUT

Usually used to replace or update the whole resource.

```ts
@Put(':id')
update() {}
```

## PATCH

Used to update part of a resource.

```ts
@Patch(':id')
update() {}
```

## DELETE

Used to delete data.

```ts
@Delete(':id')
remove() {}
```

Quick summary:

```text
GET    → Read
POST   → Create
PUT    → Replace/update
PATCH  → Partial update
DELETE → Delete
```

---

# HTTP Status Codes

Some common status codes:

```text
200 → OK
201 → Created
204 → No Content
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error
```

NestJS commonly returns:

```text
GET    → 200
POST   → 201
PUT    → 200
PATCH  → 200
DELETE → 200
```

If a DELETE request should return no content:

```ts
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
remove() {}
```

---

# CRUD Service Methods

A service can contain methods for common operations.

## findAll()

Gets all profiles.

```ts
findAll() {
  return this.profiles;
}
```

## findOne()

Gets one profile by ID.

```ts
findOne(id: string) {
  return this.profiles.find(
    profile => profile.id === id
  );
}
```

## create()

Creates a new profile.

```ts
create(body: CreateProfileDto) {
  const profile = {
    id: randomUUID(),
    ...body,
  };

  this.profiles.push(profile);

  return profile;
}
```

`randomUUID()` creates a unique ID.

Import:

```ts
import { randomUUID } from 'crypto';
```

## update()

Updates an existing profile.

```ts
update(id: string, body: UpdateProfileDto) {
  const profile = this.findOne(id);

  if (!profile) return;

  Object.assign(profile, body);

  return profile;
}
```

## remove()

Removes a profile.

```ts
remove(id: string) {
  const index = this.profiles.findIndex(
    profile => profile.id === id
  );

  if (index === -1) return;

  return this.profiles.splice(index, 1);
}
```

Quick summary:

```text
findAll() → Get all
findOne() → Get one
create()  → Create
update()  → Update
remove()  → Delete
```

---

# Pipes

A Pipe runs before the controller method.

Main purposes:

```text
Validation
Transformation
```

Basic flow:

```text
Request
   ↓
Pipe
   ↓
Controller
```

For example, URL parameters normally come as strings.

```ts
@Get(':id')
getUser(@Param('id') id: string) {}
```

We can convert the ID to a number:

```ts
@Get(':id')
getUser(
  @Param('id', ParseIntPipe) id: number
) {}
```

So:

```text
"10" → 10
```

Simple definition:

> Pipe = validates or transforms incoming data.

---

# class-validator and class-transformer

Install them:

```bash
npm install class-validator class-transformer
```

## class-validator

Used to validate data.

Example:

```ts
import {
  IsEmail,
  IsString,
  MinLength
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
```

Now NestJS can check whether the data follows these rules.

## class-transformer

Used to transform plain request data into class instances and help with type transformation.

Easy way to remember:

```text
class-validator
→ Is the data valid?

class-transformer
→ Transform the data
```

---

# ValidationPipe

`ValidationPipe` is a built-in NestJS pipe used to validate DTOs.

Example:

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

## whitelist

```ts
whitelist: true
```

removes properties that are not defined in the DTO.

For example:

DTO:

```ts
class CreateUserDto {
  name: string;
  email: string;
}
```

Request:

```json
{
  "name": "Azra",
  "email": "azra@example.com",
  "age": 22
}
```

`age` is not part of the DTO, so `whitelist` can remove it.

## transform

```ts
transform: true
```

allows NestJS to transform incoming values into the expected types when possible.

---

# Built-in Pipes

Some common built-in pipes are:

```text
ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
DefaultValuePipe
ParseFilePipe
```

Example:

```ts
@Get(':id')
getUser(
  @Param('id', ParseIntPipe) id: number
) {
  return id;
}
```

---

# Custom Pipes

We can create our own pipe when the built-in pipes are not enough.

A custom pipe implements `PipeTransform`.

```ts
@Injectable()
export class UppercasePipe implements PipeTransform {

  transform(value: string) {
    return value.toUpperCase();
  }

}
```

Use it:

```ts
@Get()
getName(
  @Query('name', UppercasePipe) name: string
) {
  return name;
}
```

Request:

```text
/profiles?name=azra
```

Result:

```text
AZRA
```

A custom pipe can:

```text
Validate data
Transform data
Return modified data
Throw an error
```

---

# Guards

A Guard decides whether a request is allowed to access a route.

Basic flow:

```text
Request
   ↓
Guard
   ↓
Allowed → Controller
   ↓
Rejected
```

Guards are commonly used for:

```text
Authentication
Authorization
Roles
Permissions
Protected routes
```

Simple definition:

> Guard = decides whether a request can access a route.

---

# Creating a Guard

A Guard implements `CanActivate`.

```ts
@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    return true;
  }

}
```

If:

```ts
return true;
```

the request continues.

If:

```ts
return false;
```

the request is rejected.

---

# Using Guards

A Guard can protect a single route:

```ts
@Get('profile')
@UseGuards(AuthGuard)
getProfile() {
  return 'Profile';
}
```

It can also protect the whole controller:

```ts
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

  @Get()
  getUsers() {
    return [];
  }

  @Get(':id')
  getUser() {
    return {};
  }

}
```

---

# Authentication and Authorization

These two concepts are different.

## Authentication

Authentication answers:

> Who are you?

Example:

```text
Login
  ↓
Verify credentials
  ↓
User authenticated
```

## Authorization

Authorization answers:

> What are you allowed to do?

Example:

```text
User logged in
      ↓
Role = user
      ↓
Try /admin
      ↓
Access denied
```

Easy way to remember:

```text
Authentication → Who are you?
Authorization  → What can you access?
```

Guards are commonly used for both.

---

# Passport.js

Passport.js is an authentication middleware/library.

It provides different authentication strategies.

Some common strategies are:

```text
JWT
Local username/password
Google
GitHub
```

Install:

```bash
npm install @nestjs/passport passport
```

For JWT:

```bash
npm install passport-jwt
```

Passport is useful because it gives us a standard way to implement authentication instead of writing everything from scratch.

---

# Passport Strategies

A Strategy defines how authentication should be performed.

For example, a JWT strategy handles JWT authentication.

Simplified example:

```ts
@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy) {

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }

}
```

The strategy generally:

```text
Get token
   ↓
Verify token
   ↓
Read payload
   ↓
Return user information
```

---

# Passport with JWT

A common JWT authentication flow is:

```text
User Login
    ↓
Server verifies credentials
    ↓
Server creates JWT
    ↓
Client sends JWT
    ↓
Auth Guard
    ↓
JWT Strategy
    ↓
Token verified
    ↓
Controller
```

A protected route can look like:

```ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile() {
  return 'Private profile';
}
```

If the JWT is valid, the request continues.

If it is missing or invalid, the request is rejected.

---

# Pipe vs Guard

This is an important difference.

| Pipe                    | Guard                           |
| ----------------------- | ------------------------------- |
| Validates data          | Controls access                 |
| Transforms data         | Checks authentication           |
| Works with input        | Checks permissions              |
| DTO validation          | JWT authentication              |
| Converts `"10"` to `10` | Checks if user can access route |

Easy way to remember:

```text
Pipe  → Is the data okay?
Guard → Is this request allowed?
```

---

# Request Flow

A simplified NestJS request flow looks like:

```text
Client
  ↓
Guards
  ↓
Pipes
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Service
  ↓
Controller
  ↓
Response
```

For JWT authentication:

```text
Request
   ↓
JWT AuthGuard
   ↓
Passport JWT Strategy
   ↓
Token verified
   ↓
Controller
   ↓
Service
   ↓
Response
```

This is the basic picture I use to understand how the different NestJS concepts work together.

---

# Quick Summary

```text
Module
→ Organizes related components

Decorator
→ Gives NestJS information about code

Controller
→ Handles HTTP requests

Service
→ Contains business logic

Dependency Injection
→ NestJS creates and provides dependencies

DTO
→ Defines the structure of incoming data

GET
→ Read

POST
→ Create

PUT
→ Replace/update

PATCH
→ Partial update

DELETE
→ Delete

Pipe
→ Validate or transform data

ValidationPipe
→ Validates DTOs

class-validator
→ Defines validation rules

class-transformer
→ Transforms request data

Guard
→ Controls access to routes

Authentication
→ Who are you?

Authorization
→ What are you allowed to do?

Passport.js
→ Provides authentication strategies

JWT Strategy
→ Handles JWT authentication
```

## Main idea

The concepts I have learned so far can be connected like this:

```text
Request
   ↓
Guard
   ↓
Pipe
   ↓
Controller
   ↓
Service
   ↓
Database
```

Each part has a different responsibility, which keeps the NestJS application organized.
