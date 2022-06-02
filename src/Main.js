import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	loadTermsFB,
	deleteTermsFB,
	updateTermsFB,
} from "./redux/modules/termsList";
import theme from "./theme";

const Main = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const terms = useSelector((state) => state.termsList.list);
	const [ani, setAni] = useState("");
	const startAnimation = () => {
		setAni("ani_in");
		setTimeout(() => setAni("ani_in ani_done"), 300);
	};

	useEffect(() => {
		dispatch(loadTermsFB());
		setTimeout(() => {
			startAnimation();
		}, 300);
		return () => {
			clearTimeout(startAnimation());
		};
	}, []);

	console.log(terms.length)
	if (terms.length > 0) {
		return (
			<div>
				<ThemeProvider theme={theme}>
					<CardsGroup>
						{terms.map((v, i) => {
							const _length = v.example.split(`<br/>`).length;
							return (
								<CardItem
									key={i}
									className={`${v.done && "completed"} ${ani}`}
									delay={i * 20}
								>
									<CardInner className="card_inner">
										<h3>{v.term}</h3>
										<div>
											<h4>DESCRIPTION</h4>
											<p>{v.desc}</p>
										</div>
										<div>
											<h4>EXAMPLES</h4>
											<p className="example">
												{
													_length > 1 ?
													v.example.split(`<br/>`).map((v,i) => {
														if(_length === i-1){
															return <span key={i}>{v}</span>;
														}else{
															return <span key={i}>{v}<br /></span>;
														}
													})
													: v.example
												}
											</p>
										</div>
										<Functions className="btns_group">
											<div className="btns">
												<Button
													inline
													outline
													onClick={() => {
														dispatch(deleteTermsFB(v.id)); 
													}}
												>
													삭제
												</Button>
												<Link to={`/edit/${v.id}`}>
													<ButtonStyle inline>수정</ButtonStyle>
												</Link>
											</div>
											<Button
												primary
												inline
												onClick={() => {
													dispatch(
														updateTermsFB(v.id, {
															term: v.term,
															desc: v.desc,
															example: v.example,
															done: !v.done,
														})
													);
												}}
											>
												{v.done ? "다시 공부 ㅜ.ㅜ" : "공부 완료~!"}
											</Button>
										</Functions>
									</CardInner>
								</CardItem>
							);
						})}
					</CardsGroup>
				</ThemeProvider>
				<RegisterButton type="button" onClick={() => navigate("/register/")}>
					<span>등록하기</span>
				</RegisterButton>
			</div>
		);
	} else {
		// 수정 페이지에서 뒤로가기로 돌아올 경우를 위해 분기(temrs 데이터 불러오기 전)
		return <div></div>;
	}
};

const CardsGroup = styled.ul`
	-moz-column-count: 3;
	-moz-column-gap: 60px;
	-webkit-column-count: 3;
	-webkit-column-gap: 60px;
	column-count: 3;
	column-gap: 60px;
	width: 100%;
	margin-top: -60px;
	@media ${({ theme }) => theme.device.laptop} {
		margin-top: -40px;
		-moz-column-gap: 40px;
		-webkit-column-gap: 40px;
		column-gap: 40px;
	}
	@media ${({ theme }) => theme.device.tablet} {
		-moz-column-count: 2;
		-webkit-column-count: 2;
		column-count: 2;
	}
	@media ${({ theme }) => theme.device.tablet_s} {
		-moz-column-count: 1;
		-webkit-column-count: 1;
		column-count: 1;
		margin-top: -20px;
		-moz-column-gap: 20px;
		-webkit-column-gap: 20px;
		column-gap: 20px;
	}
`;

const CardItem = styled.li`
	display: inline-block;
	width: 100%;
	margin-top: 60px;
	transform: translateY(40px);
	opacity: 0;
	transition: ease-out 320ms;
	transition-delay: ${(props) => props.delay}ms;
	&.ani_in {
		opacity: 1;
		transform: translateY(0);
	}
	&.completed .card_inner {
		background-color: #efece1;
		& > h3,
		& > div {
			opacity: 0.6;
			transition: ease-out 240ms;
		}
		& > .btns_group {
			opacity: 1;
		}
		&:hover > h3,
		&:hover > div {
			opacity: 1;
		}
		.example{
			background-color: #E5E2D7;
		}
	}
	&.ani_in.ani_done {
		transition-delay: 0s;
		transition-duration: 240ms;
		&:hover {
			transform: translateY(-15px);
		}
	}
	&:hover .btns {
		opacity: 1;
	}
	h3 {
		display: flex;
		align-items: center;
		font-size: 26px;
		border-bottom: 1px solid #1b3b93;
		line-height: 1.2;
		padding: 30px 0 20px;
		box-sizing: content-box;
		min-height: 2.4em;
		& ~ div {
			padding-top: 20px;
		}
		& + div {
			padding-top: 25px;
		}
		@media ${({ theme }) => theme.device.tablet_s} {
			font-size: 20px;
			min-height: 0;
			padding: 20px 0 14px;
			& ~ div {
				padding-top: 10px;
			}
			& + div {
				padding-top: 15px;
			}
		}
	}
	div {
		h4 {
			display: inline-block;
			position: relative;
			font-size: 12px;
			font-weight: 700;
			letter-spacing: 0.1em;
			margin-bottom: 5px;
			&:before {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 0.5em;
				background-color: rgba(27, 59, 147, 0.2);
				content: "";
			}
			@media ${({ theme }) => theme.device.tablet_s} {
				font-size: 10px;
			}
		}
		p {
			line-height: 1.4;
			&.example{
				padding: 10px 14px;
				background-color: rgba(201,215,255,.25);
				font-size: 14px;
				margin-top: 6px;
			}
			@media ${({ theme }) => theme.device.tablet_s} {
				font-size: 14px;
			}
		}
	}
	@media ${({ theme }) => theme.device.tablet_s} {
		margin-top: 20px;
		&.ani_in.ani_done:hover {
			transform: translateY(0);
		}
		&.completed .card_inner:hover > h3,
		&.completed .card_inner:hover > div {
			opacity: 0.6;
		}
		&.completed .card_inner:hover > div.btns_group {
			opacity: 1;
		}
		&.completed .card_inner > h3,
		&.completed .card_inner > div {
			/* opacity: 1; */
		}
	}
`;

const CardInner = styled.div`
	position: relative;
	background-color: #fff;
	padding: 0 20px 30px;
	@media ${({ theme }) => theme.device.tablet_s} {
		padding: 0 20px 20px;
	}
`;
const Functions = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	.btns {
		opacity: 0;
		transition: ease-out 240ms;
	}
	@media ${({ theme }) => theme.device.tablet_s} {
		margin-top: 8px;
		.btns {
			opacity: 1;
		}
	}
`;
const Button = styled.button`
	display: inline-block;
	min-width: ${(props) => (props.inline ? "0" : "160px")};
	padding: 0 6px;
	line-height: 22px;
	height: 24px;
	font-size: 12px;
	color: ${(props) => (props.primary ? "#fcf8ee" : "#1b3b93")};
	border: 1px solid
		${(props) =>
			props.outline || props.primary ? "#1b3b93" : "rgba(27,59,147,0.2)"};
	cursor: pointer;
	transition: ease-out 0.2s;
	background-color: ${(props) =>
		props.primary
			? "#1B3B93"
			: props.outline
			? "transparent"
			: "rgba(27,59,147,0.2)"};
	font-weight: 700;
	& + button,
	& + a {
		margin-left: 6px;
	}
`;
const ButtonStyle = styled.span`
	display: inline-block;
	min-width: ${(props) => (props.inline ? "0" : "160px")};
	padding: 0 6px;
	line-height: 22px;
	height: 24px;
	font-size: 12px;
	color: ${(props) => (props.primary ? "#fcf8ee" : "#1b3b93")};
	border: 1px solid
		${(props) =>
			props.outline || props.primary ? "#1b3b93" : "rgba(27,59,147,0.2)"};
	cursor: pointer;
	transition: ease-out 0.2s;
	background-color: ${(props) =>
		props.primary
			? "#1B3B93"
			: props.outline
			? "transparent"
			: "rgba(27,59,147,0.2)"};
	font-weight: 700;
	vertical-align: top;
	box-sizing: border-box;
`;
const RegisterButton = styled.button`
	position: fixed;
	width: 40px;
	height: 40px;
	right: 40px;
	bottom: 40px;
	font-size: 0;
	cursor: pointer;
	border: none;
	background: transparent;
	@media ${({ theme }) => theme.device.tablet_s} {
		right: 20px;
	}
	&:before,
	&:after {
		position: absolute;
		content: "";
		left: 0;
		right: 0;
		top: 50%;
		margin: 0 auto;
		width: 20px;
		height: 1px;
		background: #fcf8ee;
		z-index: 2;
		transform: rotate(0);
		transition: ease-out 250ms;
	}
	&:after {
		transform: rotate(90deg);
	}
	span {
		position: absolute;
		left: 50%;
		top: 50%;
		background: #1b3b93;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		z-index: 1;
		transition: ease-out 250ms;
	}
	&:hover {
		span {
			width: 120%;
			height: 120%;
		}
		&:before {
			transform: rotate(90deg);
		}
		&:after {
			transform: rotate(180deg);
		}
	}
`;
export default Main;
