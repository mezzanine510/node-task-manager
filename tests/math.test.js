const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calculateTip(50, 0.20);
    expect(total).toBe(60);
});

test('Should caulculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert fahrenheit to celcuius', () => {
    const fToC = fahrenheitToCelsius(32);
    expect(fToC).toBe(0);
});

test('Should convert celcius to fahrenheit', () => {
    const cToF = celsiusToFahrenheit(0);
    expect(cToF).toBe(32);
});

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 3000);
// });

test('Should add 2 numbers', (done) => {
    add(3, 2).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

test('Should add 2 numbers async/await', async () => {
    const sum = await add(30, 40);
    expect(sum).toBe(70);
});