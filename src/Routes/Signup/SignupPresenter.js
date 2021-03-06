import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Logo from "Components/Logo";
import { Link } from "react-router-dom";
import $ from "jquery";
import nevAxios from "Src/nev-axios";
import EmailAuth from "Components/EmailAuth";
import TermsOfUse from "Components/TermsOfUse";

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  margin: 0px auto;
`;
const TextContainer = styled.div`
  display: flex;
  margin-top: 5%;
  justify-content: center;
  margin-bottom: 20px;
`;
const Text = styled.div`
  font-size: 35px;
  display: flex;
  margin-top: 27px;
  margin-left: 17px;
`;

const AskSignup = styled.p`
  color: grey;
  text-align: center;
`;

const GotoLogin = styled.span`
  color: #ca444a;
`;

const ShowTerm = styled.a`
  margin-top: 1%;
`;

function initTooltip() {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}
function setSignupTooltipTitleByName(name, title_txt) {
  $(`[name="${name}"]`).attr("title", title_txt);
}
function setSignupTooltipTitleForTermLabels(title_txt) {
  $(".term-label").attr("title", title_txt);
}
function setSignupTooltip() {
  initTooltip();
  setSignupTooltipTitleByName("username", "이름을 입력하세요");
  setSignupTooltipTitleByName("cellphone", "전화번호를 입력하세요");
  setSignupTooltipTitleByName("verify_cellphone", "인증 페이지로 이동합니다");
  setSignupTooltipTitleByName(
    "email",
    "이메일 입력 후<br>본인인증을 클릭하세요"
  );
  setSignupTooltipTitleByName("pwd", "비밀번호를 입력하세요");
  setSignupTooltipTitleByName(
    "pwd_confirm",
    "비밀번호를<br>한번 더 입력하세요"
  );
  setSignupTooltipTitleForTermLabels("필수 약관입니다");
}

function setValidation() {
  $('input:not("[type=submit]")').each((i, e) => {
    const inputHandler = function () {
      if ($(this).val().length > 0) {
        $(this).addClass("is-valid");
        $(this).removeClass("is-invalid");
      } else {
        $(this).addClass("is-invalid");
        $(this).removeClass("is-valid");
      }
    };
    $(e).click(inputHandler);
    $(e).keyup(inputHandler);
  });
}

async function register(authnum) {
  try {
    if (authnum) {
      const res = await nevAxios.register({
        email: $('[name="email"]').val(),
        pwd: $('[name="pwd"]').val(),
        username: $('[name="username"]').val(),
        cellphone: $('[name="cellphone"]').val(),
      });
      console.log(res.data);
    } else {
      alert("이메일 인증을 완료해주세요.");
    }
  } catch {
    console.log("can't register");
  }
}

const SignupPresenter = ({ authnum, handleEmailAuth }) => {
  useEffect(() => {
    setSignupTooltip();
    setValidation();
  });
  const [email, setEmail] = useState("");

  return (
    <Container>
      <Helmet>
        <title>Sign Up | Nevermind</title>
      </Helmet>
      <TextContainer>
        <Logo width="90px" height="80px"></Logo>
        <Text>회원가입</Text>
      </TextContainer>
      <Form className="mt-3">
        <div className="mb-3">
          <label htmlFor="validationServer01">Name</label>
          <input
            type="text"
            name="username"
            className="mt-2 form-control"
            aria-describedby="validatedInputGroupPrepend"
            data-toggle="tooltip"
            data-placement="top"
            data-html="true"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="validationServer01">Cell_Phone</label>
          <input
            type="tel"
            name="cellphone"
            className="mt-2 form-control"
            aria-describedby="validatedInputGroupPrepend"
            data-toggle="tooltip"
            data-placement="top"
            data-html="true"
            required
          />
        </div>

        <div className="d-flex">
          <div className="form-group">
            <label htmlFor="validationServer01">E-mail</label>
            <input
              id="email"
              type="text"
              name="email"
              className="mt-2 form-control"
              aria-describedby="validatedInputGroupPrepend"
              data-toggle="tooltip"
              data-placement="top"
              data-html="true"
              required
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </div>
          <div className="d-flex flex-column justify-content-center mt-2 ml-3">
            <button
              id="call_input_text_"
              type="button"
              className="btn btn-light"
              data-toggle="modal"
              data-target="#EmailAuth"
              data-placement="top"
              data-html="true"
            >
              이메일인증
            </button>
          </div>
        </div>

        <EmailAuth email={email} handleEmailAuth={handleEmailAuth} />

        <div className="mb-3">
          <label htmlFor="validationServer01">Password</label>
          <input
            type="password"
            name="pwd"
            className="mt-2 form-control"
            aria-describedby="validatedInputGroupPrepend"
            data-toggle="tooltip"
            data-placement="top"
            data-html="true"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="validationServer01">Confirm Password</label>
          <input
            type="password"
            name="pwd_confirm"
            className="mt-2 form-control"
            aria-describedby="validatedInputGroupPrepend"
            data-toggle="tooltip"
            data-placement="top"
            data-html="true"
            required
          />
        </div>

        <div className="custom-control custom-checkbox mb-2 was-validated">
          <input
            type="checkbox"
            className="custom-control-input"
            id="agree_nevermind_term_of_use"
            required
          />
          <label
            className="mt-2 pt-1 custom-control-label term-label"
            htmlFor="agree_nevermind_term_of_use"
            data-toggle="tooltip"
            data-placement="top"
            data-html="true"
          >
            Never Mind 이용을 위한 필수 이용약관
          </label>
          <br />
          <ShowTerm
            id="modalbutton"
            type="button"
            data-toggle="modal"
            data-target="#TermsofUse"
            data-placement="top"
            data-html="true"
          >
            전체보기
          </ShowTerm>
        </div>

        <TermsOfUse />
        <div className="d-flex justify-content-center">
          <Link to={authnum ? "Login" : "signup"}>
            <button
              type="button"
              className="mt-1 btn btn-outline-dark"
              onClick={(e) => register(authnum)}
            >
              Submit
            </button>
          </Link>
        </div>
      </Form>
      <AskSignup className="my-3">
        이미 가입하셨나요?&nbsp;
        <Link to={"Login"}>
          <GotoLogin>로그인하기</GotoLogin>
        </Link>
      </AskSignup>
    </Container>
  );
};

SignupPresenter.propTypes = {
  authnum: PropTypes.bool.isRequired,
  handleEmailAuth: PropTypes.func.isRequired,
};

export default SignupPresenter;
