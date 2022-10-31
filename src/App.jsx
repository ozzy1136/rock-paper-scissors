import { useState } from "react";

import "./App.css";

import { ReactComponent as Logo } from "@assets/images/logo.svg";
import { ReactComponent as IconClose } from "@assets/images/icon-close.svg";
import { ReactComponent as ImgRules } from "@assets/images/image-rules.svg";

import TokensContainer from "@components/TokensContainer";

export default function App() {
	const [score, setScore] = useState(0);

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
						<p className="value">{score}</p>
					</div>
				</div>
				<TokensContainer setScore={setScore} />
				<div className="l-rules page-section-container">
					<div className="button-wrapper center-children">
						<button className="button" type="button">
							Rules
						</button>
					</div>
					<div hidden>
						<IconClose />
						<ImgRules />
					</div>
				</div>
			</main>

			<footer className="l-footer page-section-container">
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
