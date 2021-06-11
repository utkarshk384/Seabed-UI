import NextImage, { ImageProps } from "next/image"

type IProps<T = Record<string, never>> = T & ImageProps

const Image: React.FC<IProps<{ localSrc: string }>> = ({ src, localSrc, ...rest }) => {
	if (process.env.NODE_ENV === "production") return <NextImage src={src} {...rest} />
	if (localSrc) return <NextImage src={localSrc} {...rest} />
	return <NoImage />
}

const NoImage: React.FC = (props) => {
	return (
		<svg width={800} height={600} xmlns="http://www.w3.org/2000/svg" {...props}>
			<title>{"Layer 1"}</title>
			<path
				fill="#4c4c4c"
				d="M608 492H192c-26.51 0-48-21.49-48-48V156c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM256 164c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zm-48 264h384V316l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L352 364l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L208 380v48z"
			/>
			<path
				strokeWidth={52}
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke="#000"
				fill="none"
				d="M51 48l689 518"
			/>
		</svg>
	)
}

export default Image
