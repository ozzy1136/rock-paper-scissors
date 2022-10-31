import { useEffect, useReducer, useRef } from "react";

import { ReactComponent as Triangle } from "@assets/images/bg-triangle.svg";
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
			// TODO focus play again button after ready_to_reset
			return {
				...state,
				playAgain: true,
			};
		}
		case "reset_match": {
			return {
				...state,
				isDueling: false,
				isResetting: true,
				playAgain: false,
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

		function handleAnimationEnd(e) {
			if (/icon$/.test(e.animationName)) {
				e.stopPropagation();
				updateMatchState({
					type: "ready_to_reset",
				});
			}

			if (/^reset/.test(e.animationName)) {
				e.stopPropagation();
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
						isDisabled={
							matchState.isDueling || matchState.isResetting
						}
						handleTokenClick={handleTokenClick}
					/>
				))}
			</div>
			<p className="label user" aria-live="polite">
				{matchState.isDueling && (
					<span>
						You picked
						<span className="sr-only">{matchState.userToken}</span>
					</span>
				)}
			</p>
			<p className="label house" aria-live="polite">
				{matchState.isDueling && (
					<span>
						The house picked
						<span className="sr-only">{matchState.houseToken}</span>
					</span>
				)}
			</p>
			{matchState.playAgain && (
				<>
					{/* <p className="result" aria-live="polite">
						You win
					</p> */}
					<div className="resetButton-wrapper center-children">
						<button
							className="resetButton"
							type="button"
							onClick={handleResetClick}
						>
							Play again
						</button>
					</div>
				</>
			)}
		</div>
	);
}
