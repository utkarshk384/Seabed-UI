import React, { useCallback } from "react"

function setRefs<T>(ref: React.Ref<T>, value: T): void {
	if (typeof ref === "function") {
		ref(value)
	} else if (ref) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, prettier/prettier
		(ref.current as any) = value
	}
}

export function useMergeRefs<ForwardRef, LocalRef extends ForwardRef>(
	forwardedRef: React.Ref<ForwardRef>,
	localRef: React.Ref<LocalRef>
): (instance: LocalRef | null) => void {
	return useCallback(
		(value) => {
			setRefs(forwardedRef, value)
			setRefs(localRef, value)
		},
		[forwardedRef, localRef]
	)
}

export function ThrowError(error: Error, message?: string, reverse?: boolean): Error {
	error.message = error.message + message
	if (reverse) error.message = message + error.message

	return error
}
