import Link from "next/link";

export type JotActionsProps = {
}

export function JotActions(props: JotActionsProps){
	const {
	} = props;

	return <div className="
			flex flex-row justify-center items-center
			h-full
			gap-1
			text-xl
	">
		<Link href="/jots/place" className="button">Place Jot</Link>
		<button className="button">See Surrounding Jots</button>
	</div>
}