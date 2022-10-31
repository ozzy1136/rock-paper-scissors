export default function Token({
	tokenName,
	tokenRef,
	Icon,
	tokenClass,
	isDisabled,
	handleTokenClick,
}) {
	return (
		<div className={`token-wrapper ${tokenClass}`} ref={tokenRef}>
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
