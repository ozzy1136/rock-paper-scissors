import "./App.css";
import { ReactComponent as Logo } from "./assets/images/logo.svg";
import { ReactComponent as Triangle } from "./assets/images/bg-triangle.svg";
import { ReactComponent as IconPaper } from "./assets/images/icon-paper.svg";
import { ReactComponent as IconScissors } from "./assets/images/icon-scissors.svg";
import { ReactComponent as IconRock } from "./assets/images/icon-rock.svg";
import { ReactComponent as IconClose } from "./assets/images/icon-close.svg";
import { ReactComponent as ImgRules } from "./assets/images/image-rules.svg";

export default function App() {
	return (
		<div className="l-page">
			<main>
				<div className="l-info center-children">
					<div className="heading">
						<h1 className="sr-only">Rock, paper, scissors</h1>
						<Logo className="logo" />
					</div>

					<div
						className="score center-children"
						aria-live="polite"
						aria-atomic="true"
					>
						<p className="title">Score</p>
						<p className="value">12</p>
					</div>
				</div>

				<div className="l-match page-section-container">
					<Triangle className="background" />
					<div className="tokens">
						<label className="token">
							<IconPaper className="icon" />
							<button
								className="button sr-only"
								type="button"
								id="token-paper"
							>
								Paper
							</button>
						</label>
						<label className="token">
							<IconScissors className="icon" />
							<button
								className="button sr-only"
								type="button"
								id="token-scissors"
							>
								Scissors
							</button>
						</label>
						<label className="token">
							<IconRock className="icon" />
							<button
								className="button sr-only"
								type="button"
								id="token-rock"
							>
								Rock
							</button>
						</label>
					</div>
				</div>

				<div className="l-rules page-section-container">
					<button className="button" type="button">
						Rules
					</button>
					<div hidden>
						<IconClose />
						<ImgRules />
					</div>
				</div>
			</main>

			<footer className="l-page-footer page-section-container">
				<div className="attribution">
					Challenge by{" "}
					<a
						className="link"
						href="https://www.frontendmentor.io?ref=challenge"
					>
						Frontend Mentor
					</a>
					. Coded by{" "}
					<a className="link" href="https://github.com/ozzy1136">
						Ozmar Mendoza
					</a>
					.
				</div>
			</footer>
		</div>
	);
}
