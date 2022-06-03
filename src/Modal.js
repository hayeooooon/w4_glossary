import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { toggleModal } from "./redux/modules/modal";
import { deleteTermsFB } from "./redux/modules/termsList";
import theme from "./theme";

const Modal = () => {
  const dispatch = useDispatch();
  const status = useSelector(state=>state.modal.status);
  const item = useSelector(state=>state.modal.item);

	return (
		<ThemeProvider theme={theme}>
			<ModalWrap show={status}>
				<ModalBox>
					<h4>단어를 삭제하시겠습니까?</h4>
					<div className="btn_area">
						<Button outline type="button" onClick={()=>dispatch(toggleModal({status: !status, item: null}))}>취소</Button>
						<Button primary type="button" onClick={()=>{
              dispatch(deleteTermsFB(item));
              dispatch(toggleModal({status: !status, item: null}));
            }}>삭제</Button>
					</div>
				</ModalBox>
			</ModalWrap>
		</ThemeProvider>
	);
};

const ModalWrap = styled.div`
	display: ${(props) => (props.show  ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 2;
`;
const ModalBox = styled.div`
	position: relative;
	max-width: 420px;
	width: 90%;
	padding: 30px;
	background-color: #fff;
	margin: 60px auto;
	box-sizing: border-box;
	text-align: center;
  h4{
    font-size: 16px;
    padding: 10px 0 40px;
		@media ${({ theme }) => theme.device.mobile} {
			font-size: 14px;
			padding-bottom: 30px;
		}
  }
	@media ${({ theme }) => theme.device.mobile} {
		padding: 30px 20px;
	}
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
		@media ${({ theme }) => theme.device.mobile} {
			margin-left: 6px;
		}
	}
	@media ${({ theme }) => theme.device.mobile} {
		min-width: ${(props) => (props.inline ? "0" : "120px")};
		line-height: 34px;
		height: 36px;
		font-size: 14px;
	}
	@media ${({ theme }) => theme.device.mobile_s} {
		min-width: 100px;
	}
`;
export default Modal;
