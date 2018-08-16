const initAccbookState = {
	outEnvironment:process.env.NODE_ENV,
	accBookData:[],
	accBook:'',
	isAccBook:false,
};
export default function accbook(state = initAccbookState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
