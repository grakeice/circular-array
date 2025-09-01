# circular-array

A TypeScript utility for circular array access. Allows you to access array elements cyclically with positive or negative indices.

## Features

-   Wrap any array and access elements cyclically (positive/negative indices)
-   Get one full cycle as an array, infinite iterator, and for...of support
-   TypeScript compatible

## Installation

```bash
npm install @grakeice/circular-array
```

## Usage

```ts
import { CircularArray } from "./src/CircularArray";

const arr = new CircularArray([1, 2, 3]);
console.log(arr.at(4)); // 2
console.log(arr.at(-1)); // 3

for (const v of arr) {
	console.log(v); // 1, 2, 3
}

const gen = arr.cycle();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // 1 (infinite loop)
```

## License

MIT
