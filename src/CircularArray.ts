/**
 * @license MIT
 * @author grakeice
 */
interface ICircularArray<T> {
	length: number;
	at(index: number): T;
	getOneCycle(): T[];
	cycle(): Generator<T>;
	[Symbol.iterator](): Generator<T>;
}

/**
 * **CircularArray**
 *
 * Circular array implementation that provides cyclical access to array elements.
 *
 * @license MIT
 * @author grakeice
 */
export class CircularArray<T> implements ICircularArray<T> {
	private _base: T[];

	/**
	 * Creates a new CircularArray instance.
	 * @param base The base array (cannot be empty)
	 * @throws When base array is empty
	 */
	constructor(base: T[]) {
		if (base.length === 0) {
			throw new Error("Base array is empty.");
		}
		this._base = base;
	}

	/**
	 * Gets the element at the specified index with circular access.
	 * @param index integer values are allowed
	 * @returns The element at the index
	 *
	 * @example
	 * const circular = new CircularArray([1, 2, 3]);
	 *
	 * // ...
	 * circular.at(-4) // 3
	 * circular.at(-3) // 1
	 * circular.at(-2) // 2
	 * circular.at(-1) // 3
	 * circular.at(0)  // 1
	 * circular.at(1)  // 2
	 * circular.at(2)  // 3
	 * circular.at(3)  // 1
	 * // ...
	 */
	at(index: number) {
		return this._base.at(index % this.length) as T;
	}

	/**
	 * Returns the array for one complete cycle.
	 * @returns Array containing one cycle of elements
	 *
	 * @example
	 * const circular = new CircularArray([1, 2, 3]);
	 * circular.getOneCycle(); // [1, 2, 3]
	 */
	getOneCycle() {
		return Array.from(this);
	}

	/**
	 * The length of the array (cycle period)
	 */
	get length() {
		return this._base.length;
	}

	/**
	 * Returns an infinite iterator that cycles through the array.
	 * @returns Infinite iterator
	 */
	*cycle() {
		let i = 0;
		while (true) {
			yield this._base.at(i % this.length) as T;
			++i;
		}
	}

	/**
	 * Returns an iterator that goes through one cycle of the array.
	 * @returns One-cycle iterator
	 */
	*[Symbol.iterator]() {
		yield* this._base;
	}
}
