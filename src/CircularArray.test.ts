import { describe, expect, it } from "bun:test";
import { CircularArray } from "./CircularArray.js";

describe("CircularArray", () => {
	it("constructor throws on empty array", () => {
		expect(() => new CircularArray([])).toThrow("Base array is empty.");
	});

	it("at() returns correct elements for positive and negative indices", () => {
		const arr = new CircularArray([1, 2, 3]);
		expect(arr.at(0)).toBe(1);
		expect(arr.at(1)).toBe(2);
		expect(arr.at(2)).toBe(3);
		expect(arr.at(3)).toBe(1);
		expect(arr.at(-1)).toBe(3);
		expect(arr.at(-2)).toBe(2);
		expect(arr.at(-3)).toBe(1);
		expect(arr.at(-4)).toBe(3);
	});

	it("length property returns correct value", () => {
		const arr = new CircularArray([1, 2, 3, 4]);
		expect(arr.length).toBe(4);
	});

	it("getOneCycle returns a new array with correct values", () => {
		const arr = new CircularArray([1, 2, 3]);
		const cycle = arr.getOneCycle();
		expect(cycle).toEqual([1, 2, 3]);
		cycle[0] = 100;
		expect(arr.at(0)).toBe(1); // 元配列は不変
		expect(cycle).not.toBe(arr.getOneCycle());
	});

	it("for...of iterates one cycle", () => {
		const arr = new CircularArray([1, 2, 3]);
		const result: number[] = [];
		for (const v of arr) result.push(v);
		expect(result).toEqual([1, 2, 3]);
	});

	it("cycle() yields infinite sequence", () => {
		const arr = new CircularArray([1, 2]);
		const gen = arr.cycle();
		expect(gen.next().value).toBe(1);
		expect(gen.next().value).toBe(2);
		expect(gen.next().value).toBe(1);
		expect(gen.next().value).toBe(2);
	});
});
