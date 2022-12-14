import { useEffect, useReducer, useRef } from "react";

import { ReactComponent as IconPaper } from "@assets/images/icon-paper.svg";
import { ReactComponent as IconScissors } from "@assets/images/icon-scissors.svg";
import { ReactComponent as IconRock } from "@assets/images/icon-rock.svg";

import Token from "@components/Token";

const matchInit = {
	isDueling: false,
	isResetting: false,
	playAgain: false,
	userToken: null,
	houseToken: null,
	winner: null,
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
		case "ready_to_reset": {
			return {
				...state,
				playAgain: true,
				winner: action.winner,
			};
		}
		case "reset_match": {
			return {
				...state,
				isDueling: false,
				playAgain: false,
				isResetting: true,
			};
		}
		case "init_match": {
			// TODO focus first button after init_match
			return {
				...state,
				...matchInit,
			};
		}
		default:
			throw new Error("Unknown action: " + action.type);
	}
}

export default function TokensContainer({ setScore }) {
	const rockToken = useRef(null);
	const paperToken = useRef(null);
	const scissorsToken = useRef(null);
	const resetButton = useRef(null);
	const [matchState, updateMatchState] = useReducer(matchReducer, matchInit);

	// matchState.winner is only set after reset_match is dispatched
	useEffect(() => {
		if (!!matchState.winner) {
			resetButton.current.focus();

			if (matchState.userToken === matchState.winner) {
				setScore((score) => score + 1);
			}
		}
	}, [matchState.winner]);

	useEffect(() => {
		// Take into account instant animations while other animations are still running (e.g. On mobile, user paper token reset takes 0.01s while house rock token still takes 1s to complete)
		let finishedResetAnimations = 0;

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

		function handleAnimationEnd(e) {
			// reveal-house-token-icon is the last animation to end after a token is clicked
			if (/icon$/.test(e.animationName)) {
				e.stopPropagation();

				// At the moment, there is no possibility of a draw, because house token will never be the same as user token
				if (matchState.userToken === "rock") {
					if (matchState.houseToken === "scissors") {
						updateMatchState({
							type: "ready_to_reset",
							winner: matchState.userToken,
						});
					} else {
						updateMatchState({
							type: "ready_to_reset",
							winner: matchState.houseToken,
						});
					}
				} else if (matchState.userToken === "scissors") {
					if (matchState.houseToken === "paper") {
						updateMatchState({
							type: "ready_to_reset",
							winner: matchState.userToken,
						});
					} else {
						updateMatchState({
							type: "ready_to_reset",
							winner: matchState.houseToken,
						});
					}
				} else if (matchState.userToken === "paper") {
					if (matchState.houseToken === "rock") {
						updateMatchState({
							type: "ready_to_reset",
							winner: matchState.userToken,
						});
					} else {
						updateMatchState({
							type: "ready_to_reset",
							winner: matchState.houseToken,
						});
					}
				}
			}

			// Reset animation ends when a token is back in initial place
			if (/^reset/.test(e.animationName)) {
				e.stopPropagation();
				// Only set initial match state after all tokens are back in their initial place
				if (finishedResetAnimations > 1) {
					updateMatchState({
						type: "init_match",
					});
				} else {
					finishedResetAnimations++;
				}
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
		<div
			className={`l-match page-section-container ${
				matchState.isDueling
					? "is-dueling"
					: matchState.isResetting
					? "is-resetting"
					: ""
			}`}
		>
			<div className="tokens-container">
				{[
					["paper", paperToken, IconPaper],
					["scissors", scissorsToken, IconScissors],
					["rock", rockToken, IconRock],
				].map((curr) => (
					<Token
						key={curr[0]}
						tokenName={curr[0]}
						tokenRef={curr[1]}
						Icon={curr[2]}
						tokenClass={
							matchState.userToken === curr[0]
								? "user"
								: matchState.houseToken === curr[0]
								? "house"
								: matchState.isDueling || matchState.isResetting
								? "hidden"
								: ""
						}
						winnerClass={
							matchState.winner === curr[0] ? "winner" : ""
						}
						isDisabled={
							matchState.isDueling || matchState.isResetting
						}
						handleTokenClick={handleTokenClick}
					/>
				))}
			</div>
			{/* TODO figure out aria-live to announce the picked tokens */}
			<p className="label user">
				{matchState.isDueling && (
					<>
						You picked
						<span className="sr-only">{matchState.userToken}</span>
					</>
				)}
			</p>
			<p className="label house">
				{matchState.isDueling && (
					<>
						The house picked
						<span className="sr-only">{matchState.houseToken}</span>
					</>
				)}
			</p>
			<div className="result-wrapper center-children">
				<p className="result" aria-live="polite" aria-relevant="text">
					{matchState.playAgain &&
						(matchState.userToken === matchState.winner
							? "You win"
							: "You lose")}
				</p>
			</div>
			<div className="resetButton-wrapper center-children">
				{matchState.playAgain && (
					<button
						className="resetButton"
						type="button"
						onClick={handleResetClick}
						ref={resetButton}
						data-reset-button
					>
						Play again
					</button>
				)}
			</div>
		</div>
	);
}
