/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:21
*------------------------------------------------------- */
import React, { PureComponent } from 'react';
import cookie from 'react-cookies';

import Router from 'next/router';

import withReduxSaga from 'src/redux/store';

import AuthStorage from 'src/utils/AuthStorage';
import { getUserAuth } from 'src/redux/actions/auth';

import LoaderGlobal from 'src/components/LoaderGlobal';
import ToastWrapper from 'src/components/ToastWrapper';
// import LoginModal from 'src/components/Modals/Login';
// import SignUpModal from 'src/components/Modals/SignUp';

// Router.onRouteChangeStart = (e) => {
// 	console.log('asd--------------', arguments);
// };

const withRoot = (Child) => {
	@withReduxSaga
	class WrappedComponent extends PureComponent {
		static getInitialProps(ctx) {
			if (!process.browser) {
				cookie.plugToRequest(ctx.req, ctx.res);
			}

			if (AuthStorage.loggedIn) {
				ctx.store.dispatch(getUserAuth());
			}

			if (Child.getInitialProps) {
				return Child.getInitialProps(ctx);
			}

			return {};
		}

		render() {
			return ([
				<LoaderGlobal key="loading-global" />,
				<Child key="child" {...this.props} />,
				<ToastWrapper key="toastify" />,
				// <LoginModal key="login-modal" />,
				// <SignUpModal key="sign-up-modal" />,
			]);
		}
	}

	return WrappedComponent;
};

export default withRoot;
