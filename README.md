### Roadmap

#### 1. Refactor `FetchData` type

```typescript
type FetchData<Err, Data> = Option<Either<Err, Data>>
```

The `FetchData` type encapsulates three variants: loading state, error state (with some error type), and success state (with some success type).

In Haskell it directly translates to

```haskell
type FetchData a b = Maybe (Either a b)
```

which is isomorphic to

```haskell
data FetchData a b = Loading | Error a | Success b
```

To flatten the type we could translate the latter back into TS, and refactor to use that type, but that means writing some helper functions to replace those that come included with `Option`/`Either`.

#### 2. Parse API response

#### 3. Type-safe routing
