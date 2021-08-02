/* 

    These states are applied via tailwind classnames to all UI elements depending on the type of UI element.

    Ex: A button element might receive a enabled, muted, hover, focused, pressed states. 
        Whereas, a text element will receive enabled and muted states only.

    The states are as follows:

    * `enabled`: The component is enabled.
    * `muted`: The component is in a muted state.
    * `hover`: The component is hovered.
    * `focus`: The component is focused.
    * `selected`: The component that is selected in a list.
    * `pressed`: The component that is being pressed.
    * `dragged`: The component that is being dragged.

*/
export type StateType = {
	enabled?: string
	muted?: string
	hover?: string
	focused?: string
	selected?: string
	pressed?: string
	draggered?: string
}
