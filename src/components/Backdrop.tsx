export type BackdropProps = {
	open?: boolean,
	onClick?: () => void,
};

export function Backdrop(props: BackdropProps){
	const {
		open,
		onClick
	} = props;

	return <div
		className={`
			fixed
			top-0 left-0 right-0 bottom-0
			bg-black
			${open ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}
			transition-opacity
		`}
		onClick={onClick}
	/>
}