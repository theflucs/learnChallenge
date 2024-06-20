export const foobar = (): (string | number)[] => {
    const result: (string | number)[] = [];

    for (let i = 1; i <= 100; i++) {
        let output: string | number = "";

        if (i % 3 === 0 && i % 5 === 0) {
            output = "FooBar";
        } else if (i % 3 === 0) {
            output = "Foo";
        } else if (i % 5 === 0) {
            output = "Bar";
        } else {
            output = i;
        }

        result.push(output);
    }

    result.forEach(el => console.log(el));

    return result;
}