const initBalanceState = {
	outEnvironment:process.env.NODE_ENV,
	accBookData:[],
	accBook:'',
	isAccBook:false,
};
export default function balance(state = initBalanceState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
