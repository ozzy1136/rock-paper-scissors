import { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { ReactComponent as Logo } from "./assets/images/logo.svg";
import { ReactComponent as Triangle } from "./assets/images/bg-triangle.svg";
import { ReactComponent as IconPaper } from "./assets/images/icon-paper.svg";
import { ReactComponent as IconScissors } from "./assets/images/icon-scissors.svg";
import { ReactComponent as IconRock } from "./assets/images/icon-rock.svg";
import { ReactComponent as IconClose } from "./assets/images/icon-close.svg";
import { ReactComponent as ImgRules } from "./assets/images/image-rules.svg";
import Token from "./components/Token";

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
		case "init_match": {
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
	const rockToken = useRef(null);
	const paperToken = useRef(null);
	const scissorsToken = useRef(null);
	const [matchState, updateMatchState] = useReducer(matchReducer, matchInit);

	useEffect(() => {
		if (matchState.userToken) {
			rockToken.current.addEventListener(
				"animationend",
				handleAnimationEnd
			);
			paperToken.current.addEventListener(
				"animationend",
				handleAnimationEnd
			);
			scissorsToken.current.addEventListener(
				"animationend",
				handleAnimationEnd
			);
		}

		// TODO event won't fire if paper is user and scissors is house since these states don't have animations
		function handleAnimationEnd(e) {
			if (e.animationName.includes("reverse")) {
				updateMatchState({
					type: "init_match",
				});
			}
		}

		return () => {
			rockToken.current.removeEventListener(
				"animationend",
				handleAnimationEnd
			);
			paperToken.current.removeEventListener(
				"animationend",
				handleAnimationEnd
			);
			scissorsToken.current.removeEventListener(
				"animationend",
				handleAnimationEnd
			);
		};
	}, [matchState.userToken]);

	function handleTokenClick(e) {
		updateMatchState({
			type: "start_match",
			userToken: e.target.dataset.tokentype,
			houseToken: ["rock", "paper", "scissors"].filter(
				(curr) => curr !== e.target.dataset.tokentype
			)[Math.round(Math.random())],
		});
	}

	function handleResetClick(_) {
		updateMatchState({
			type: "reset_match",
		});
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
					className={`l-match page-section-container ${
						matchState.isDueling
							? "is-dueling"
							: matchState.isResetting
							? "is-resetting"
							: ""
					}`}
				>
					<Triangle className="background" />
					<div className="tokens">
						<Token
							tokenName="paper"
							tokenClass={
								matchState.userToken === "paper"
									? "user"
									: matchState.houseToken === "paper"
									? "house"
									: matchState.isDueling ||
									  matchState.isResetting
									? "hidden"
									: ""
							}
							isDisabled={
								matchState.isDueling || matchState.isResetting
							}
							tokenRef={paperToken}
							handleTokenClick={handleTokenClick}
							TokenIcon={IconPaper}
						/>
						<Token
							tokenName="scissors"
							tokenClass={
								matchState.userToken === "scissors"
									? "user"
									: matchState.houseToken === "scissors"
									? "house"
									: matchState.isDueling ||
									  matchState.isResetting
									? "hidden"
									: ""
							}
							isDisabled={
								matchState.isDueling || matchState.isResetting
							}
							tokenRef={scissorsToken}
							handleTokenClick={handleTokenClick}
							TokenIcon={IconScissors}
						/>
						<Token
							tokenName="rock"
							tokenClass={
								matchState.userToken === "rock"
									? "user"
									: matchState.houseToken === "rock"
									? "house"
									: matchState.isDueling ||
									  matchState.isResetting
									? "hidden"
									: ""
							}
							isDisabled={
								matchState.isDueling || matchState.isResetting
							}
							tokenRef={rockToken}
							handleTokenClick={handleTokenClick}
							TokenIcon={IconRock}
						/>
					</div>
					<p className="label user" aria-live="polite">
						{matchState.isDueling && (
							<span>
								You picked
								{/* <span className="sr-only">
									{matchState.userToken}
								</span> */}
							</span>
						)}
					</p>
					<p className="label house" aria-live="polite">
						{matchState.isDueling && (
							<span>
								The house picked
								{/* <span className="sr-only">
									{matchState.houseToken}
								</span> */}
							</span>
						)}
					</p>
					{matchState.isDueling && (
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
					)}
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
