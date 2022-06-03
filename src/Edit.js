import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import theme from "./theme";
import { updateTermsFB, loadTermsFB } from "./redux/modules/termsList";

const Edit = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.termsList.list);
	const param = useParams();
	const input_term = useRef();
	const input_desc = useRef();
	const input_example = useRef();
	const [term, setTerm] = useState("");
	const [description, setDescription] = useState("");
	const [example, setExample] = useState("");
	const mounted = useRef(false);
	const this_term = data.reduce((acc, cur) => {
		if (cur.id === param.id) {
			acc = cur;
		}
		return acc;
	}, "");
	const [validation, setValidation] = useState({
		term: false,
		desc: false,
		exam: false,
	});
	const checkForm = () => {
		// form 빈칸인지 확인하는 validation
		let _validation = validation;
		if (input_term.current.value.trim().length <= 0) {
			_validation.term = true;
			setValidation({ ..._validation });
		} else {
			_validation.term = false;
			setValidation({ ..._validation });
		}

		if (description.trim().length <= 0) {
			_validation.desc = true;
			setValidation({ ..._validation });
		} else {
			_validation.desc = false;
			setValidation({ ..._validation });
		}

		if (example.trim().length <= 0) {
			_validation.exam = true;
			setValidation({ ..._validation });
		} else {
			_validation.exam = false;
			setValidation({ ..._validation });
		}

		if (!validation.term && !validation.desc && !validation.exam) {
			dispatch(
				updateTermsFB(this_term.id, {
					term: term,
					desc: description,
					example: example,
					done: this_term.done,
				})
			);
		}
	};

	useEffect(() => {
		if (!mounted.current) { // data 배열 비어있을 때
			dispatch(loadTermsFB()); 
			mounted.current = true;
		} else { // dependency 값(data 배열) 업데이트 됐을 때
			setTerm(this_term.term);
			setDescription(this_term.desc);
			setExample(this_term.example);
		}
	}, [data]);

	return (
		<div>
			<ThemeProvider theme={theme}>
				<CardView>
					<h3>용어 수정하기</h3>
					<form>
						<InputArea>
							<label>TERM</label>
							<input
								placeholder="등록할 단어를 입력하세요. (최대 30자)"
								required
								ref={input_term}
								value={term}
								onInput={() => {
									setTerm(input_term.current.value);
								}}
								maxLength="30"
							/>
							{validation.term && <ErrorText>단어를 입력해주세요!</ErrorText>}
						</InputArea>
						<InputArea>
							<label>DESCRIPTION</label>
							<textarea
								placeholder="단어 설명을 입력하세요. (최대 300자)"
								ref={input_desc}
								onInput={() => {
									setDescription(input_desc.current.value);
								}}
								value={description}
								required
							></textarea>
							<div className="info_box">
								{validation.desc && <ErrorText>설명을 입력해주세요!</ErrorText>}
								<Limit className="txt_limit">
									{description ? description.length : "0"} / 300
								</Limit>
							</div>
						</InputArea>
						<InputArea>
							<label>EXAMPLE</label>
							<textarea
								placeholder="예시를 입력하세요. (최대 200자)"
								ref={input_example}
								onInput={() => {
									setExample(input_example.current.value);
								}}
								value={example}
								required
							></textarea>
							<div className="info_box">
								{validation.exam && <ErrorText>예시를 입력해주세요!</ErrorText>}
								<Limit className="txt_limit">
									{example ? example.length : "0"} / 200
								</Limit>
							</div>
						</InputArea>
						<ButtonArea>
							<Button outline onClick={() => navigate("/")}>
								취소
							</Button>
							<Button primary type="button" onClick={checkForm}>
								수정하기
							</Button>
						</ButtonArea>
					</form>
				</CardView>
			</ThemeProvider>
		</div>
	);
};

const CardView = styled.div`
	width: 500px;
	max-width: 100%;
	margin: 0 auto;
	h3 {
		font-size: 34px;
		margin-bottom: 40px;
		text-align: center;
		@media ${({ theme }) => theme.device.mobile} {
			font-size: 26px;
		}
	}
`;
const InputArea = styled.div`
	& + div {
		margin-top: 25px;
	}
	label {
		display: inline-block;
		position: relative;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		margin-bottom: 8px;
		@media ${({ theme }) => theme.device.mobile} {
			font-size: 11px;
			margin-bottom: 5px;
		}
	}
	.info_box {
		&:after {
			display: block;
			clear: both;
			content: "";
		}
		p {
			float: left;
			@media ${({ theme }) => theme.device.mobile} {
				font-size: 11px;
			}
		}
		p.txt_limit {
			float: right;
		}
	}
`;
const Limit = styled.p`
	text-align: right;
	font-size: 13px;
	margin-top: 5px;
`;
const ButtonArea = styled.div`
	text-align: center;
	padding-top: 20px;
`;
const Button = styled.button`
	display: inline-block;
	min-width: ${(props) => (props.inline ? "0" : "160px")};
	padding: 0 6px;
	line-height: 38px;
	height: 40px;
	font-size: 15px;
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
		margin-left: 12px;
	}
	@media ${({ theme }) => theme.device.mobile} {
		min-width: ${(props) => (props.inline ? "0" : "120px")};
		line-height: 34px;
		height: 36px;
		font-size: 14px;
	}
`;
const ErrorText = styled.p`
	font-size: 13px;
	color: #ee3333;
	line-height: 1.2;
	margin-top: 5px;
	@media ${({ theme }) => theme.device.mobile} {
		font-size: 11px;
	}
`;
export default Edit;
