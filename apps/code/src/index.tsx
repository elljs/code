import { ModalProvider } from "@/components/custom/modal-provider";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<ThemeProvider defaultTheme="dark">
			<ModalProvider>
				<TooltipProvider>
					<RouterProvider router={router} />
				</TooltipProvider>
			</ModalProvider>
		</ThemeProvider>,
	);
}
