import { foobar } from "./foobar.js";

describe('foobar', () => {
    it('should return correct output for each number from 1 to 100', () => {
        const result = foobar();

        expect(result.length).toBe(100);
        expect(result[0]).toBe(1);
        expect(typeof result[0]).toBe("number")
        expect(result[2]).toBe("Foo");
        expect(typeof result[2]).toBe("string")
        expect(result[4]).toBe("Bar");
        expect(typeof result[4]).toBe("string")
        expect(result[5]).toBe("Foo");
        expect(result[14]).toBe("FooBar");
        expect(typeof result[14]).toBe("string")
        expect(result[19]).toBe("Bar");
        expect(result[21]).toBe(22);
        expect(typeof result[21]).toBe("number")
        expect(result[24]).toBe("Bar");
        expect(result[27]).toBe(28);
        expect(typeof result[27]).toBe("number")
        expect(result[29]).toBe("FooBar");
    });
});