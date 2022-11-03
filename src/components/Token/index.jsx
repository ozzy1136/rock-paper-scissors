export default function Token({
	tokenName,
	tokenRef,
	Icon,
	tokenClass,
	winnerClass,
	isDisabled,
	handleTokenClick,
}) {
	return (
		<div
			className={`token-wrapper ${tokenClass} ${winnerClass}`}
			ref={tokenRef}
		>
			<label className={`token`}>
				<Icon className="icon" />
				<button
					className="button sr-only"
					type="button"
					disabled={isDisabled}
					onClick={handleTokenClick}
					data-tokentype={tokenName}
				>
					{tokenName}
				</button>
			</label>
		</div>
	);
}
