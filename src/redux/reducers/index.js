/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-16 00:42:57
*------------------------------------------------------- */

import auth, { initialState as initialAuth } from './auth';
import feed, { initialState as initialFeed } from './feed';
import loading, { initialState as initialLoading } from './loading';
import modal, { initialState as initialModal } from './modal';

export const initialState = {
	auth: initialAuth,
	feed: initialFeed,
	loading: initialLoading,
	modal: initialModal,
};

export default {
	auth,
	feed,
	loading,
	modal,
};
