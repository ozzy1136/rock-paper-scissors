export default function Token({
	tokenName,
	tokenClass,
	isDisabled,
	tokenRef,
	handleTokenClick,
	TokenIcon,
}) {
	return (
		<label
			className={`token ${tokenClass}`}
			data-tokentype={tokenName}
			ref={tokenRef}
		>
			<TokenIcon className="icon" />
			<button
				className="button sr-only"
				type="button"
				disabled={isDisabled}
				onClick={handleTokenClick}
				data-tokentype={tokenName}
			>
				{tokenName.toUpperCase()}
			</button>
		</label>
	);
}
