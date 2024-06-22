import {foobar} from '../../foobar/foobar.js';

export const makeFoobar = (foobarContainer: HTMLDivElement): void => {
  foobarContainer.innerHTML = `
    <h2>Foobar Output</h2>
    <ul class="number-list">
      ${foobar()
        .map((item, index) => `<li key="${index}">${item}</li>`)
        .join('')}
    </ul>
  `;
};
