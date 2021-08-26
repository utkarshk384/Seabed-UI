import React from "react"

const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={16.7}
			height={15.8}
			viewBox="0 0 16.7 15.8"
			overflow="visible"
			{...props}
		>
			<animateMotion dur="6s" repeatCount="indefinite" rotate="360">
				<g id="__spinner">
					<path
						d="M16 .2c0-.1-.2-.2-.3-.2h-.2C7 0 0 6.9 0 15.5c0 .1.1.2.2.2h.4c.1 0 .2-.1.3-.3v-.7c0-.2.1-.7.1-.9C1.7 6.9 7.5 1.3 14.7 1h1.1c.1 0 .2-.1.2-.2"
						fill="currentColor"
					/>
					<path d="M16.7 1.8h-1v12.7c0 .1-.1.2-.2.2H1.8v1h14.7c.1 0 .2-.1.2-.2" fill="none" />
				</g>
			</animateMotion>
		</svg>
	)
}

export { Spinner }
