"use client";
import { useRouter } from "next/navigation";
import { Backdrop } from "../components/Backdrop";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export type BottomDrawerProps = {
	children?: React.ReactNode,
}

export function BottomDrawer(props: BottomDrawerProps){
	const {
		children,
	} = props;

	const pathname = usePathname();
	const router = useRouter();

	const open = pathname !== "/";

	return <div>
		<Backdrop open={open} onClick={() => router.push("/")} />
		<div className={`
			fixed
			bottom-0 left-0 right-0
			${open ? 'translate-y-0' : 'translate-y-full'}
			transition-transform
			bg-white
			p-4
			grid grid-cols-1 grid-rows-1
		`}>
			<AnimatePresence>
				<motion.div key={pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="row-start-1 col-start-1"
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	</div>
}