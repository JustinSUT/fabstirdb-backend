# FabstirDB Backend

## Introduction

Welcome to FabstirDB Backend, a scalable server software that manages a OrbitDB instance, enabling decentralized data storage and querying. This project is designed to work in tandem with our companion library package, FabstirDB, which provides an interface mimicking GUN API to make it easier to integrate into applications.

## Summary

This project exposes several key components for an OrbitDb backend server that uses IPFS to store its data.

#### Functions

- `startServer()`: This function starts the server asynchronously. It includes several middleware functions for user authentication and access control.
- `initAclDB()`: This function initializes the Access Control List (ACL) database.
- `initUserDB()`: This function initializes the User database.

#### API Endpoints

- `GET /acl/:alias`: Retrieves the Access Control List (ACL) entry for a user.
- `GET /:path*`: Fetches data based on a path.
- `POST /:path*`: Saves data to a specified path.
- `DELETE /:path*`: Deletes data at a specified path.

Each function and API endpoint is documented in detail, including its purpose, the parameters it accepts, and any errors it may throw.

## Documentation

#### Functions

<dl>
<dt><a href="#startServer">startServer()</a></dt>
<dd><p>Starts the server asynchronously.</p>
</dd>
<dt><a href="#initAclDB">initAclDB()</a> ⇒ <code>void</code></dt>
<dd><p>Initializes the Access Control List (ACL) database.</p>
</dd>
<dt><a href="#initUserDB">initUserDB()</a> ⇒ <code>void</code></dt>
<dd><p>Initializes the User database.</p>
</dd>P
</dl>

<a name="startServer"></a>

#### startServer()

Starts the server asynchronously.

**Kind**: global function  
**Throws**:

- <code>Error</code> If the server fails to start.

- [Functions](#functions)
- [startServer()](#startserver)
  - [startServer~authenticate(req, res, next) ⇒ void](#startserverauthenticatereq-res-next--void)
  - [startServer~checkWriteAccess(req, res, next) ⇒ void](#startservercheckwriteaccessreq-res-next--void)
  - [startServer~authenticateTempToken(req, res, next) ⇒ void](#startserverauthenticatetemptokenreq-res-next--void)
- [initAclDB() ⇒ void](#initacldb--void)
- [initUserDB() ⇒ void](#inituserdb--void)

<a name="startServer..authenticate"></a>

##### startServer~authenticate(req, res, next) ⇒ <code>void</code>

Middleware function for authenticating a user.

**Kind**: inner method of [<code>startServer</code>](#startServer)  
**Throws**:

- <code>Error</code> If the token is invalid.

| Param | Type                  | Description                   |
| ----- | --------------------- | ----------------------------- |
| req   | <code>Object</code>   | The Express request object.   |
| res   | <code>Object</code>   | The Express response object.  |
| next  | <code>function</code> | The next middleware function. |

<a name="startServer..checkWriteAccess"></a>

##### startServer~checkWriteAccess(req, res, next) ⇒ <code>void</code>

Middleware function for checking write access of a user.

**Kind**: inner method of [<code>startServer</code>](#startServer)  
**Throws**:

- <code>Error</code> If the access check fails.

| Param | Type                  | Description                   |
| ----- | --------------------- | ----------------------------- |
| req   | <code>Object</code>   | The Express request object.   |
| res   | <code>Object</code>   | The Express response object.  |
| next  | <code>function</code> | The next middleware function. |

<a name="startServer..authenticateTempToken"></a>

##### startServer~authenticateTempToken(req, res, next) ⇒ <code>void</code>

Middleware function for authenticating a temporary token.

**Kind**: inner method of [<code>startServer</code>](#startServer)  
**Throws**:

- <code>Error</code> If the token is invalid or expired.

| Param | Type                  | Description                   |
| ----- | --------------------- | ----------------------------- |
| req   | <code>Object</code>   | The Express request object.   |
| res   | <code>Object</code>   | The Express response object.  |
| next  | <code>function</code> | The next middleware function. |

<a name="initAclDB"></a>

#### initAclDB() ⇒ <code>void</code>

Initializes the Access Control List (ACL) OrbitDB database.

**Kind**: global function  
**Throws**:

- <code>Error</code> If there is an error while creating the identity, initializing IPFS, creating the OrbitDB instance, or creating the ACL store.

<a name="initUserDB"></a>

#### initUserDB() ⇒ <code>void</code>

Initializes the User OrbitDB database.

**Kind**: global function  
**Throws**:

- <code>Error</code> If there is an error while creating the IPFS instance.

## API Documentation

#### GET /acl/:alias

Express route handler for retrieving the Access Control List (ACL) entry for a user.

- **Type**: Async
- **Request**: `req` (Object)
  - `req.params` (Object)
    - `req.params.alias` (string): The alias of the user whose ACL entry is being retrieved.
- **Response**: `res` (Object)
- **Returns**: void
- **Throws**: Error if there is an error while retrieving the ACL entry.

#### GET /:path\*

Express route handler for fetching data based on a path.

- **Type**: Async
- **Request**: `req` (Object)
  - `req.params` (Object)
    - `req.params.path` (string): The path of the data to be fetched.
- **Response**: `res` (Object)
- **Returns**: void
- **Throws**: Error if there is an error while fetching the data.

#### POST /:path\*

Express route handler for saving data to a specified path.

- **Type**: Async
- **Request**: `req` (Object)
  - `req.params` (Object)
    - `req.params.path` (string): The path where the data will be saved.
  - `req.body` (Object): The body of the request, containing the data to be saved.
- **Response**: `res` (Object)
- **Returns**: void
- **Throws**: Error if there is an error while saving the data.

#### DELETE /:path\*

Express route handler for deleting data at a specified path.

- **Type**: Async
- **Request**: `req` (Object)
  - `req.params` (Object)
    - `req.params.path` (string): The path of the data to be deleted.
- **Response**: `res` (Object)
- **Returns**: void
- **Throws**: Error if there is an error while deleting the data.
