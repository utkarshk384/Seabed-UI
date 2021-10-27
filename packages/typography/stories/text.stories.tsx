import { Text, Link } from "../src"

import { Meta } from "@storybook/react"

export default {
	title: "Component/Text",
	component: Text,
} as Meta

export const Article: React.VFC<Record<string, never>> = () => (
	<div>
		<Text textAlign="center" color="yellow[300]" as="h1">
			JavaScript
		</Text>
		<Text color="text.secondary">
			JavaScript often abbreviated as JS, is a programming language that conforms to the ECMAScript
			specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It
			has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class
			functions. Alongside HTML and CSS, JavaScript is one of the core technologies of the World
			Wide Web. Over 97% of websites use it client-side for web page behavior, often incorporating
			third-party libraries. Most web browsers have a dedicated JavaScript engine to execute the
			code on the user&apos;s device.
		</Text>

		<Text>
			Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.
			<sup>[11]</sup>
			Over 97% of websites use it client-side for web page behavior,<sup>[12]</sup> often
			incorporating third-party libraries.<sup>[13]</sup> Most web browsers have a dedicated
			JavaScript engine to execute the code on the user&apos;s device. As a multi-paradigm language,
			JavaScript supports event-driven, functional, and imperative programming styles. It has
			application programming interfaces (APIs) for working with text, dates, regular expressions,
			standard data structures, and the Document Object Model (DOM). The ECMAScript standard does
			not include any input/output (I/O), such as networking, storage, or graphics facilities. In
			practice, the web browser or other runtime system provides JavaScript APIs for I/O. JavaScript
			engines were originally used only in web browsers, but they are now core components of other
			software systems, most notably servers and a variety of applications. Although there are
			similarities between JavaScript and Java, including language name, syntax, and respective
			standard libraries, the two languages are distinct and differ greatly in design.
		</Text>
		<Text mt="10" as="small" pt="14">
			Source:{" "}
			<Link href="https://en.wikipedia.org/wiki/JavaScript" externalLink>
				Wikipedia
			</Link>
		</Text>
	</div>
)
