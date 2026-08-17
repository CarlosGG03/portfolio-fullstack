# ADR-002: Use Clean Architecture

## Status

Accepted

## Context

The project contains multiple backend services and should remain maintainable
as new functionality is introduced.

We want business logic to remain independent from frameworks, databases and
external services.

## Decision

Backend services will follow Clean Architecture principles.

The dependency direction should point toward the domain.

```text
Presentation
     ↓
Application
     ↓
Domain
     ↑
Infrastructure
