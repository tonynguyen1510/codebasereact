/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-02-04 15:43:52
*------------------------------------------------------- */
import React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';

import stylesheet from 'src/theme/antd-theme.less';

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage();
		return { html, head, errorHtml, chunks };
	}

	render() {
		return (
			<html lang="en" dir="ltr">
				<Head>
					<title>IPP Education</title>
					<link rel="shortcut icon" type="image/x-icon" href="/static/assets/favicon.ico" />
					<meta charSet="utf-8" />
					<meta
						name="description"
						content="IPP Education - Every Student is an Achiever"
					/>
					{/* Use minimum-scale=1 to enable GPU rasterization */}
					<meta
						name="viewport"
						content={
							'user-scalable=0, initial-scale=1, ' +
							'minimum-scale=1, width=device-width, height=device-height'
						}
					/>
					{/* PWA primary color */}
					<meta name="theme-color" content="#000" />
					{/* <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> */}
					<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
