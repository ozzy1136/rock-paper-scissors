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
			<main className="page-section-container">
				<div className="info">
					<div className="info-heading">
						<h1 className="sr-only">Rock, paper, scissors</h1>
						<Logo />
					</div>

					<div className="info-score">
						<p aria-live="polite" aria-atomic="true">
							<span>Score</span>
							<span>12</span>
						</p>
					</div>
				</div>

				<div className="match">
					<Triangle />
					<IconPaper />
					<IconScissors />
					<IconRock />
				</div>

				<div className="rules">
					<button type="button">Rules</button>
					<div>
						<IconClose />
						<ImgRules />
					</div>
				</div>
			</main>

			<footer className="page-section-container">
				<div className="attribution">
					Challenge by{" "}
					<a
						className="attribution-link"
						href="https://www.frontendmentor.io?ref=challenge"
					>
						Frontend Mentor
					</a>
					. Coded by{" "}
					<a
						className="attribution-link"
						href="https://github.com/ozzy1136"
					>
						Ozmar Mendoza
					</a>
					.
				</div>
			</footer>
		</div>
	);
}
