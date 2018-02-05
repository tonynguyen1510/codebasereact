/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2018-01-10 23:30:22
 *-------------------------------------------------------*/
import { SINGLE_API } from 'src/redux/actions/type';

export const getFeedsFb = (payload = {}, next, nextError) => {
	const { paging = '' } = payload;
	return {
		type: SINGLE_API,
		payload: {
			uri: 'feeds/get-feeds-fb?paging=' + encodeURIComponent(paging),
			// beforeCallType: 'CLEAR_CACHE_FEEDS_FB',
			afterCallType: !paging && 'CLEAR_CACHE_FEEDS_FB',
			successType: 'GET_FEEDS_FB_SUCCESS',
			// loading: false,
			afterSuccess: next,
			afterError: nextError,
		},
	};
};
