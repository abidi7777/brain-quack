import Code from '@hapi/code';
import Lab from '@hapi/lab';

import BQuack from '../src/brain-quack';
import bSortCode from '../examples/bsort.b';
import rot13Code from '../examples/rot13.b';

const { expect } = Code;
const lab = Lab.script();
const { describe, it } = lab;

// eslint-disable-next-line import/prefer-default-export
export { lab };

describe('BQuack', () => {
  it('should increment the value stored at cell 0 in memory', () => {
    const bQuack = new BQuack('+');

    bQuack.interpret();

    expect(bQuack.dump().memory[0]).to.equal(1);
  });

  it('should decrement the value stored at cell 0 in memory', () => {
    const bQuack = new BQuack('-');

    bQuack.interpret();

    expect(bQuack.dump().memory[0]).to.equal(-1);
  });

  it('should increment the memory pointer and increment the value at cell 1', () => {
    const bQuack = new BQuack('>+');

    bQuack.interpret();

    expect(bQuack.dump().memory[1]).to.equal(1);
  });

  it('should increment and decrement the memory pointer and increment the value at cell 0', () => {
    const bQuack = new BQuack('><+');

    bQuack.interpret();

    expect(bQuack.dump().memory[0]).to.equal(1);
  });

  it('shouldn\'t move the pointer beyond cell 0 and increment the value at cell 0', () => {
    const bQuack = new BQuack('<<<<<<<<<<<<<<<+');

    bQuack.interpret();

    expect(bQuack.dump().memory[0]).to.equal(1);
  });

  it('should set the ascii value of the input at cell 0', () => {
    const bQuack = new BQuack(',', 'a');

    bQuack.interpret();

    expect(bQuack.dump().memory[0]).to.equal(97);
  });

  it('should set the value at cell 0', () => {
    const bQuack = new BQuack(',', 'a');

    bQuack.interpret();

    expect(bQuack.dump().memory[0]).to.equal(97); // ascii value
  });

  it('should output the value at cell 0', () => {
    const bQuack = new BQuack(',.', 'a');

    bQuack.interpret();

    expect(bQuack.dump().output).to.equal('a');
  });

  it('should update the program', () => {
    const bQuack = new BQuack(',.');

    bQuack.program = '.';

    expect(bQuack.dump().program).to.equal('.');
  });

  it('should update the input', () => {
    const bQuack = new BQuack('.', 'a');

    bQuack.input = 'b';

    expect(bQuack.dump().input).to.equal('b');
  });

  it('should run bubble sort code', () => {
    const bQuack = new BQuack(bSortCode, 'qwerty');

    bQuack.interpret();

    expect(bQuack.dump().output).to.equal('eqrtwy');
  });

  it('should run rot13 code', () => {
    const bQuack = new BQuack(rot13Code, 'abc');

    bQuack.interpret();

    expect(bQuack.dump().output).to.equal('nop');
  });
});
