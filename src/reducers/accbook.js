import update from 'react-addons-update';
import {LOAD_ENV,LOAD_ACCBOOKDATA,LOAD_ACCBOOKTREE,LOAD_DEFAULTACCBOOK,UPDATE_ACCBOOKOBJ,UPDATE_DEFAULTACCBOOK} from '../constants/ActionTypes';
const initAccbookState = {
	outEnvironment:process.env.NODE_ENV,
	accBookData:[],
	accBookTree:[],
	accBook:'',
	accBookName:'',
	accBookObj:null,
};
export default function accbook(state = initAccbookState, action) {
	switch (action.type) {
		default:
			return state;
		case LOAD_ENV:
			return{...state,outEnvironment:action.data.outEnvironment};
		case LOAD_ACCBOOKDATA:
			return { ...state,
				accBookData: action.data.accBookData,
				accBook: action.data.accBook,
				accBookName:action.data.accBookObj.name,
				accBookObj: action.data.accBookObj,
			};
		case LOAD_ACCBOOKTREE:
			return { ...state,
				accBookTree: action.data,
			};
		case UPDATE_ACCBOOKOBJ:
			return { ...state,
				accBookObj: action.data,
				accBookName:action.data.name,
			};
		case LOAD_DEFAULTACCBOOK:
			return { ...state,
				accBook: action.data.accBook,
				accBookObj: action.data.accBookObj,
				accBookName:action.data.accBookObj.name,
			};
			// return update(state, {
			// 		accBook: {$set: action.data.accBook},
			// 		accBookObj: {$set: action.data.accBookObj}
			// 	}
			// );
		case UPDATE_DEFAULTACCBOOK:
			return update(state, {
				accBook: {$set: action.data.accBook},
				accBookObj: {$set: action.data.accBookObj},
				accBookName:{$set: action.data.accBookObj.name}
				}
			);
		// case UPDATE_DEFAULTACCBOOK:
		// 	return { ...state,
		// 		accBook: action.data.accBook,
		// 		accBookObj: action.data.accBookObj,
		// 		accBookName:action.data.accBookObj.name,
		// 	};
	}
}
