const INITIAL_MEM_CELLS = 30_000;

class BrainQuack {
  #memory = Array(INITIAL_MEM_CELLS).fill(0);

  #program;

  #input;

  #state = {
    pPtr: 0, // program ptr
    mPtr: 0, // memory ptr
    iPtr: 0, // input ptr
    output: '',
  };

  constructor(program = '', input = '') {
    this.#program = program;
    this.#input = input;
  }

  get program() {
    return this.#program;
  }

  set program(program) {
    this.#program = program;
  }

  get input() {
    return this.#input;
  }

  set input(input) {
    this.#input = input;
  }

  interpret() {
    while (this.#state.pPtr < this.#program.length) {
      this.#state = this.#reducer(this.#state);
    }

    return this;
  }

  dump() {
    return Object.freeze({
      program: this.#program,
      input: this.#input,
      memory: [...this.#memory],
      output: this.#state.output,
    });
  }

  #reducer(state) {
    const {
      iPtr, mPtr, pPtr, output,
    } = state;

    switch (this.#program[pPtr]) {
      case '+': {
        this.#memory[mPtr] += 1;

        return {
          ...state,
          pPtr: pPtr + 1,
        };
      }

      case '-': {
        this.#memory[mPtr] -= 1;

        return {
          ...state,
          pPtr: pPtr + 1,
        };
      }

      case '<':
        return {
          ...state,
          pPtr: pPtr + 1,
          mPtr: mPtr - 1 >= 0 ? mPtr - 1 : mPtr,
        };
      case '>':
        return {
          ...state,
          pPtr: pPtr + 1,
          mPtr: mPtr + 1,
        };
      case ',': {
        if (iPtr < this.#input.length) {
          this.#memory[mPtr] = this.#input.charCodeAt(iPtr);
        }

        return {
          ...state,
          pPtr: pPtr + 1,
          iPtr: iPtr + 1,
        };
      }

      case '.':
        return {
          ...state,
          pPtr: pPtr + 1,
          output: output + String.fromCharCode(this.#memory[mPtr]),
        };
      case '[':
        return {
          ...state,
          pPtr: this.#memory[mPtr] > 0 ? pPtr + 1 : this.#jumpForward(pPtr),
        };
      case ']':
        return {
          ...state,
          pPtr: this.#jumpBackward(pPtr) + 1,
        };
      case undefined:
      default:
        return {
          ...state,
          pPtr: pPtr + 1,
        };
    }
  }

  #jumpBackward(pPtr) {
    let tempPtr = pPtr - 1;
    let closeBrackets = 1;

    while (closeBrackets > 0) {
      if (this.#program[tempPtr] === '[') {
        closeBrackets -= 1;
      } else if (this.#program[tempPtr] === ']') {
        closeBrackets += 1;
      }

      tempPtr -= 1;
    }

    return tempPtr;
  }

  #jumpForward(pPtr) {
    let tempPtr = pPtr + 1;
    let openBrackets = 1;

    while (openBrackets > 0) {
      if (this.#program[tempPtr] === '[') {
        openBrackets += 1;
      } else if (this.#program[tempPtr] === ']') {
        openBrackets -= 1;
      }

      tempPtr += 1;
    }

    return tempPtr;
  }
}

if (typeof window !== 'undefined') {
  window.BQuack = BrainQuack;
}

export default BrainQuack;
