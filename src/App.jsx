import { useReducer } from "react";

import "./App.css";
import { ReactComponent as Logo } from "./assets/images/logo.svg";
import { ReactComponent as Triangle } from "./assets/images/bg-triangle.svg";
import { ReactComponent as IconPaper } from "./assets/images/icon-paper.svg";
import { ReactComponent as IconScissors } from "./assets/images/icon-scissors.svg";
import { ReactComponent as IconRock } from "./assets/images/icon-rock.svg";
import { ReactComponent as IconClose } from "./assets/images/icon-close.svg";
import { ReactComponent as ImgRules } from "./assets/images/image-rules.svg";

const matchInit = {
	isDueling: false,
	isResetting: false,
	userToken: null,
	houseToken: null,
};

function matchReducer(state, action) {
	switch (action.type) {
		case "start_match": {
			return {
				...state,
				isDueling: true,
				userToken: action.userToken,
				houseToken: action.houseToken,
			};
		}

		case "reset_match": {
			return {
				...state,
				isDueling: false,
				isResetting: true,
			};
		}

		case "init": {
			return {
				...state,
				...matchInit,
			};
		}

		default:
			throw new Error("Unknown action: " + action.type);
	}
}

export default function App() {
	const [matchState, updateMatchState] = useReducer(matchReducer, matchInit);

	function handleTokenClick(_) {
		updateMatchState({
			type: "start_match",
			userToken: "rock",
			houseToken: "paper",
		});
	}

	function handleResetClick(_) {
		updateMatchState({
			type: "reset_match",
		});
		setTimeout(() => {
			updateMatchState({
				type: "init",
			});
		}, 2000);
	}

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

				<div
					className={[
						"l-match",
						"page-section-container",
						matchState.isDueling && "is-dueling",
						matchState.isResetting && "is-resetting",
					]
						.filter((curr) => curr)
						.join(" ")}
				>
					<Triangle className="background" />
					<div className="tokens">
						<label className="token house">
							<IconPaper className="icon" />
							<button
								className="button sr-only"
								type="button"
								id="token-paper"
								disabled={
									matchState.isDueling ||
									matchState.isResetting
								}
								onClick={handleTokenClick}
								data-tokentype="paper"
							>
								Paper
							</button>
						</label>
						<label className="token hidden">
							<IconScissors className="icon" />
							<button
								className="button sr-only"
								type="button"
								id="token-scissors"
								disabled={
									matchState.isDueling ||
									matchState.isResetting
								}
								onClick={handleTokenClick}
								data-tokentype="scissors"
							>
								Scissors
							</button>
						</label>
						<label className="token user">
							<IconRock className="icon" />
							<button
								className="button sr-only"
								type="button"
								id="token-rock"
								disabled={
									matchState.isDueling ||
									matchState.isResetting
								}
								onClick={handleTokenClick}
								data-tokentype="rock"
							>
								Rock
							</button>
						</label>
					</div>
					<p className="label user" aria-live="polite">
						{matchState.isDueling && (
							<span>
								You picked
								<span className="sr-only">
									{matchState.userToken}
								</span>
							</span>
						)}
					</p>
					<p className="label house" aria-live="polite">
						{matchState.isDueling && (
							<span>
								The house picked
								<span className="sr-only">
									{matchState.houseToken}
								</span>
							</span>
						)}
					</p>
					{/* {matchState.isDueling && (
						<>
							<p className="result" aria-live="polite">
								You win
							</p>
							<button
								className="resetBtn"
								type="button"
								onClick={handleResetClick}
							>
								Play again
							</button>
						</>
					)} */}
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
