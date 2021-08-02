import { useEffect, useState } from "react"
import _ from "lodash"

const useHideNav = (menuState?: boolean): boolean => {
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const handleScroll = _.throttle(
			() => {
				const currentScrollPos = window.pageYOffset
				setVisible(
					(prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 50) ||
						currentScrollPos < 10
				)

				setPrevScrollPos(currentScrollPos)
			},
			500,
			{ leading: false, trailing: true }
		)

		if (!menuState) window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [prevScrollPos, visible, menuState])

	return visible
}

export { useHideNav }
