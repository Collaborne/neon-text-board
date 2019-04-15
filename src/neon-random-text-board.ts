import { css, customElement, html, LitElement, property } from 'lit-element';

import './neon-text-board';

/**
 * Text board which shows randomly one of the provided texts.
 * ### Example
 * ```html
 * <neon-random-text-board texts="[[arrayOfStrings]]"></neon-random-text-board>
 */
@customElement('neon-random-text-board')
export class NeonRandomTextBoard extends LitElement {
	/**
	 * List of values from which one is randomly choosen
	 */
	@property({type: Array})
	public values: string[] = [];

	/**
	 * Currently shown text
	 */
	@property({type: String})
	public selected: string = '';

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			.board {
				width: 100%;
			}
		`;
	}

	/**
	 * Selects the another random value
	 */
	public next() {
		if (!Array.isArray(this.values) || this.values.length === 0) {
			// Ignore if no values are provided
			return;
		}
		if (this.values.length === 1) {
			// Select the only available value
			this.selected = this.values[0];
			return;
		}
		// Select a new random value which is not the current value
		const currentIndex = this.values.indexOf(this.selected);
		let nextIndex;
		do {
			nextIndex = Math.floor(Math.random() * this.values.length);
		} while (nextIndex === currentIndex);
		this.selected = this.values[nextIndex];
	}

	protected render() {
		return html `
			<neon-text-board .text="${this.selected}" class="board"></neon-text-board>
		`;
	}
}
