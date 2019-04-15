import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('neon-text-board')
export class NeonTextBoard extends LitElement {
	/**
	 * Text that is shown on the board
	 */
	@property({type: String})
	public text: string | null = null;

	/**
	 * Index of the text that is in the foreground. 0 -> text1, 1 -> text2
	 */
	@property({type: Number})
	private activeText: number = 0;

	@property({type: String})
	private text1: string | null = null;

	@property({type: String})
	private text2: string | null = null;

	static get styles() {
		return css`
			:host {
				display: inline-block;
				position: relative;
			}
			.text {
				-webkit-animation-duration: 1s;
				animation-duration: 1s;
				-webkit-animation-fill-mode: both;
				animation-fill-mode: both;
				margin: 30px 0;
				text-align: center;
				width: 100%;
				@apply --paper-font-display1;
				font-family: var(--neon-text-board-font-family);
				font-size: var(--neon-text-board-font-size);
				font-weight: var(--neon-text-board-font-weight);
				text-align: var(--neon-text-board-text-align);
			}
			.text2 {
				position: absolute;
				top: 0;
			}
			.enter {
				-webkit-animation-name: enter;
				animation-name: enter;
			}
			.leave {
				-webkit-animation-name: leave;
				animation-name: leave;
			}
			@-webkit-keyframes enter {
				0% {
					opacity: 0;
					-webkit-transform-origin: 50% 0%;
					-webkit-transform: scale(.2) translate(0%, -200%);
				}
				100% {
					opacity: 1;
					-webkit-transform-origin: 50% 0%;
					-webkit-transform: scale(1) translate(0%, 0%);
				}
			}
			@keyframes enter {
				0% {
					opacity: 0;
					transform-origin: 50% 0%;
					transform: scale(.2) translate(0%, -200%);
				}
				100% {
					opacity: 1;
					transform-origin: 50% 0%;
					transform: scale(1) translate(0%, 0%);
				}
			}
			@-webkit-keyframes leave {
				0% {
					opacity: 1;
					-webkit-transform-origin: 50% 100%;
					-webkit-transform: scale(1) translate(0%, 0%);
				}
				100% {
					opacity: 0;
					-webkit-transform-origin: 50% 100%;
					-webkit-transform: scale(.2) translate(0%, 200%);
				}
			}
			@keyframes leave {
				0% {
					opacity: 1;
					transform-origin: 50% 100%;
					transform: scale(1) translate(0%, 0%);
				}
				100% {
					opacity: 0;
					transform-origin: 50% 100%;
					transform: scale(.2) translate(0%, 200%);
				}
			}
		`;
	}

	protected render() {
		return html `
			<div id="text1" class="text">
				${this.text1}
			</div>
			<div id="text2" class="text text2">
				${this.text2}
			</div>
		`;
	}

	protected updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('text')) {
			const oldText: string = changedProperties.get('text');
			const newText: string | null = this.text;

			this.activeText = (this.activeText + 1) % 2;
			this.text1 = this.activeText === 1 ? newText : oldText;
			this.text2 = this.activeText === 0 ? newText : oldText;

			// Don't animate the initial set of text
			if (oldText) {
				if (this.activeText === 1) {
					this._animate('enter', 'leave');
				} else {
					this._animate('leave', 'enter');
				}
			}
		}
	}

	private _animate(text1Animation: string, text2Animation: string) {
		this.text1El.classList.add(text1Animation);
		this.text2El.classList.remove(text1Animation);
		this.text1El.classList.remove(text2Animation);
		this.text2El.classList.add(text2Animation);
	}

	private get text1El(): HTMLDivElement {
		return this.shadowRoot!.getElementById('text1')! as HTMLDivElement;
	}

	private get text2El(): HTMLDivElement {
		return this.shadowRoot!.getElementById('text2')! as HTMLDivElement;
	}
}
