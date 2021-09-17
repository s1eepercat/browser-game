import { TEST } from './test';
import { TEST_2 } from './test';
import { TestEnum } from './types';

(() => {
    const some = { a: TEST };
    const someTwo = { ...some };
    console.log(someTwo);
})();

console.log(TEST_2);

const testTypescript = {
    test: TestEnum.Hello
};

console.log(testTypescript);

//some test here