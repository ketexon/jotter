export type BottomDrawerProps = {
	open?: boolean,
}

export function BottomDrawer(props: BottomDrawerProps){
	const {
		open
	} = props;

	return <div className={`
		fixed
		bottom-0 left-0 right-0
		${open ? 'translate-y-0' : 'translate-y-full'}
		transition-transform
		bg-white
		p-4
	`}>

	</div>
}