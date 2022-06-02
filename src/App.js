import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import Main from "./Main";
import Register from "./Register";
import Edit from "./Edit";
import Modal from "./Modal";
import theme from "./theme";

function App() {
	const title = [`<Glossary>`,`Web Development Terms`,`</Glossary>`];
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Header>
					<h1>
						<span style={{ fontWeight: "300" }}>{title[0]}</span>
						<span style={{ fontWeight: "500" }}> {title[1]} </span>
						<span style={{ fontWeight: "300" }}>{title[2]}</span>
					</h1>
				</Header>
				<Container>
					<Inner>
						<Routes>
							<Route path="/" element={<Main />}></Route>
							<Route path="/register" element={<Register />}></Route>
							<Route path="/edit/:id" element={<Edit />}></Route>
						</Routes>
					</Inner>
				</Container>
				<Modal></Modal>
			</ThemeProvider>
		</div>
	);
}

const Header = styled.header`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 46px;
	box-sizing: border-box;
	background: #1b3b93;
	color: #fcf8ee;
	text-align: center;
	z-index: 2;
	h1 {
		font-size: 18px;
		line-height: 46px;
		@media ${({ theme }) => theme.device.mobile} {
			font-size: 14px;
		}
		@media ${({ theme }) => theme.device.mobile_s} {
			font-size: 12px;
			span:nth-child(1),
			span:nth-child(3){
				font-size: 10px;
			}
		}
	}
`;

const Container = styled.div`
	position: relative;
	padding-top: 55px;
	z-index: 1;
`;

const Inner = styled.div`
	width: 100%;
	max-width: 1360px;
	padding: 120px 40px;
	box-sizing: border-box;
	margin: 0 auto;
	@media ${({ theme }) => theme.device.tablet_s} {
		padding: 60px 20px;
	}
`;


export default App;
