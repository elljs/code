import { proxy } from "valtio";

interface UserInfo {
	nickname: string;
	email: string;
	avatar?: string;
}

const state = proxy<{ user: UserInfo; copilotOpen: boolean }>({
	copilotOpen: false,
	user: {
		nickname: "Roy Lin",
		email: "admin@elljs.com",
		avatar: "https://avatars.githubusercontent.com/u/19965768?v=4",
	},
});

const actions = {
	load: async () => {
		const user = state.user;
		return { user };
	},
	login: async () => {},
	logout: async () => {},
	setCopilotOpen: (open: boolean) => {
		state.copilotOpen = open;
	},
};

export default {
	state,
	...actions,
};
