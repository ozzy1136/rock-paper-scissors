import { useState, useRef } from "react";
import { A11yDialog } from "react-a11y-dialog";

import "./App.css";

import { ReactComponent as Logo } from "@assets/images/logo.svg";
import { ReactComponent as IconClose } from "@assets/images/icon-close.svg";
import { ReactComponent as ImgRules } from "@assets/images/image-rules.svg";

import TokensContainer from "@components/TokensContainer";

export default function App() {
	const rulesDialog = useRef();
	const [score, setScore] = useState(0);

	function openRulesDialog() {
		rulesDialog.current.show();
	}

	return (
		<div className="l-page">
			<main>
				<div className="l-info center-children">
					<div className="heading">
						<h1 className="sr-only">Rock, paper, scissors</h1>
						<Logo className="logo" />
					</div>
					<div className="score center-children">
						<p
							className="text"
							aria-live="polite"
							aria-atomic="true"
						>
							<span className="title">Score</span>
							<br />
							<span className="value">{score}</span>
						</p>
					</div>
				</div>
				<TokensContainer setScore={setScore} />
				<div className="l-rules page-section-container">
					<div className="button-wrapper center-children">
						<button
							className="button"
							type="button"
							onClick={openRulesDialog}
						>
							Rules
						</button>
					</div>
					<A11yDialog
						id="dialog-rules"
						title="Rules"
						dialogRef={(instance) =>
							(rulesDialog.current = instance)
						}
						closeButtonContent={<IconClose />}
						closeButtonPosition="last"
						classNames={{
							container: "dialog-container",
							overlay: "dialog-overlay",
							dialog: "dialog-content",
							title: "dialog-title",
							closeButton: "dialog-closeButton",
						}}
					>
						<ImgRules className="dialog-svg" />
					</A11yDialog>
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
