/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-01-10 22:17:21
*------------------------------------------------------- */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import NProgress from 'nprogress';

import Router from 'next/router';

import withReduxSaga from 'src/redux/store';

import AuthStorage from 'src/utils/AuthStorage';
import { getUserAuth } from 'src/redux/actions/auth';

// import LoaderGlobal from 'src/components/LoaderGlobal';

Router.onRouteChangeStart = (/* url */) => {
	NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const withRoot = (Child) => {
	@withReduxSaga
	class WrappedComponent extends PureComponent {
		static propTypes = {
			url: PropTypes.object.isRequired,
		}

		static getInitialProps(ctx) {
			if (!process.browser) {
				cookie.plugToRequest(ctx.req, ctx.res);
			}

			if (AuthStorage.loggedIn && !ctx.store.getState().auth.email) {
				ctx.store.dispatch(getUserAuth());
			}

			if (Child.getInitialProps) {
				return Child.getInitialProps(ctx);
			}

			return {};
		}

		componentWillMount() {
			if (!AuthStorage.loggedIn && this.props.url.pathname !== '/login' && this.props.url.pathname !== '/login-first') {
				this.props.url.push('/login');
			}
		}

		render() {
			if (!AuthStorage.loggedIn && this.props.url.pathname !== '/login' && this.props.url.pathname !== '/login-first') {
				return null;
			}

			return (
				<Child {...this.props} />
			);
		}
	}

	return WrappedComponent;
};

export default withRoot;
