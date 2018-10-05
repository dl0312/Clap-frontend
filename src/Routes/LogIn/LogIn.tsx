import React from "react";
import styled from "styled-components";
import { Mutation, ApolloConsumer } from "react-apollo";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import SubmitButton from "../../Components/SubmitButton";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  NICKNAME_OVERLAP,
  EMAIL_OVERLAP
} from "../../sharedQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { validateEmail, validatePassword } from "../../Utility/SignUpValidate";

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
`;

const RealLoginContainer = styled(Form)`
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  padding: 20px;
  min-width: 300px;
  background-color: white;
  color: black;
`;

const LoginTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const LoginTitle = styled.div``;

const UserInfoInput = styled(Input)`
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const UserInfoInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div``;

const Button = styled(SubmitButton)`
  width: 100%;
  height: 30px;
  margin: 2px 0;
  border: none;
  background-color: white;
  text-transform: uppercase;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  transition: box-shadow 0.3s ease;
  color: black;
  &:hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

interface ISignUpFormInfoProps {
  Validity: boolean;
}

const SignUpFormInfo = styled<ISignUpFormInfoProps, any>("div")`
  color: ${props => (props.Validity ? "#2ecc71" : "#e74c3c")};
`;

const OverlapCheckButton = styled.button`
  margin-left: 10px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: white;
  border: 1px solid #ced4da;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

interface IProps {
  history: any;
}

interface IState {
  login: boolean;
  nickName: string;
  nickNameOverlap: boolean;
  nickNameOverlapChecked: boolean;
  email: string;
  emailOverlap: boolean;
  emailOverlapChecked: boolean;
  password: string;
  passwordCheck: string;
}

// class LogInQuery extends Mutation<emailSignIn, emailSignInVariables> {}
// class SignUpQuery extends Mutation<emailSignUp, emailSignUpVariables> {}

class LogIn extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      login: true,
      nickName: "",
      nickNameOverlap: false,
      nickNameOverlapChecked: false,
      email: "",
      emailOverlap: false,
      emailOverlapChecked: false,
      password: "",
      passwordCheck: ""
    };
  }

  public render() {
    const {
      email,
      emailOverlap,
      emailOverlapChecked,
      password,
      passwordCheck,
      login,
      nickName,
      nickNameOverlap,
      nickNameOverlapChecked
    } = this.state;
    const EmailValidity = validateEmail(email);
    const PasswordValidity = validatePassword(password);
    const PasswordCheck = password === passwordCheck;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, nickName }}
            onCompleted={data => {
              const { token } = this.state.login
                ? data.EmailSignIn
                : data.EmailSignUp;
              if (this.state.login) {
                if (data.EmailSignIn.ok) {
                  toast.success("Log In success");
                } else {
                  toast.error(data.EmailSignIn.error);
                }
              } else {
                if (data.EmailSignUp.ok) {
                  toast.success("Sign Up success");
                } else {
                  toast.error(data.EmailSignUp.error);
                }
              }

              if (token !== undefined) {
                logUserIn({ variables: { token } });
                this.props.history.push(`/`);
              }
            }}
          >
            {mutation => (
              <LoginContainer>
                <RealLoginContainer submitFn={() => mutation()}>
                  {login ? (
                    <React.Fragment>
                      <LoginTitleContainer>
                        <LoginTitle>E-MAIL</LoginTitle>
                      </LoginTitleContainer>
                      <UserInfoInputContainer>
                        <UserInfoInput
                          type={"email"}
                          value={this.state.email}
                          onChange={this.onInputChange}
                          placeholder="Email"
                          name={"email"}
                        />
                      </UserInfoInputContainer>

                      <LoginTitleContainer>
                        <LoginTitle>PASSWORD</LoginTitle>
                      </LoginTitleContainer>
                      <UserInfoInputContainer>
                        <UserInfoInput
                          type={"password"}
                          value={this.state.password}
                          onChange={this.onInputChange}
                          placeholder="Password"
                          name={"password"}
                        />
                      </UserInfoInputContainer>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/* <NickNameOverlapQuery
                        query={NICKNAME_OVERLAP}
                        onCompleted={(data: any) => {
                          console.log(data);
                          const { NickNameOverlap } = data;
                          if (NickNameOverlap.ok) {
                            if (nickName === "") {
                              this.setState({ nickNameOverlap: false });
                            } else {
                              this.setState({
                                nickNameOverlap: false,
                                nickNameOverlapChecked: true
                              });
                            }
                          } else {
                            if (nickName === "") {
                              this.setState({ nickNameOverlap: true });
                            } else {
                              this.setState({
                                nickNameOverlap: true,
                                nickNameOverlapChecked: true
                              });
                            }
                          }
                        }}
                      > */}
                      <ApolloConsumer>
                        {client => (
                          <React.Fragment>
                            <LoginTitleContainer>
                              <LoginTitle>NICKNAME</LoginTitle>
                              <SignUpFormInfo Validity={!nickNameOverlap}>
                                {nickName !== "" && nickNameOverlapChecked
                                  ? !nickNameOverlap
                                    ? "😎 Very Unique Nick Name!"
                                    : "👿 Same Nick Name is already exist"
                                  : ""}
                              </SignUpFormInfo>
                            </LoginTitleContainer>
                            <UserInfoInputContainer>
                              <UserInfoInput
                                type="text"
                                placeholder="nickname"
                                value={this.state.nickName}
                                onChange={(e: any) => {
                                  this.setState({
                                    nickName: e.target.value,
                                    nickNameOverlapChecked: false
                                  });
                                }}
                              />
                              <OverlapCheckButton
                                onClick={async () => {
                                  const { data }: any = await client.query({
                                    query: NICKNAME_OVERLAP,
                                    variables: { nickName }
                                  });
                                  console.log(data);
                                  this.setState({
                                    nickNameOverlap: !data.NickNameOverlap.ok,
                                    nickNameOverlapChecked: true
                                  });
                                }}
                              >
                                CHECK
                              </OverlapCheckButton>
                            </UserInfoInputContainer>
                          </React.Fragment>
                        )}
                      </ApolloConsumer>
                      <ApolloConsumer>
                        {client => (
                          <React.Fragment>
                            <LoginTitleContainer>
                              <LoginTitle>E-MAIL</LoginTitle>
                              <SignUpFormInfo
                                Validity={EmailValidity && !emailOverlap}
                              >
                                {email !== "" && emailOverlapChecked
                                  ? EmailValidity
                                    ? !emailOverlap
                                      ? "😎 Email is Valid"
                                      : "👿 Same Email is already exist"
                                    : "👿 Email is not Valid"
                                  : ""}
                              </SignUpFormInfo>
                            </LoginTitleContainer>
                            <UserInfoInputContainer>
                              <UserInfoInput
                                type="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={(e: any) =>
                                  this.setState({
                                    email: e.target.value,
                                    emailOverlapChecked: false
                                  })
                                }
                              />
                              <OverlapCheckButton
                                onClick={async () => {
                                  const { data }: any = await client.query({
                                    query: EMAIL_OVERLAP,
                                    variables: { email }
                                  });
                                  console.log(email);
                                  console.log(data);
                                  this.setState({
                                    emailOverlap: !data.EmailOverlap.ok,
                                    emailOverlapChecked: true
                                  });
                                }}
                              >
                                CHECK
                              </OverlapCheckButton>
                            </UserInfoInputContainer>
                          </React.Fragment>
                        )}
                      </ApolloConsumer>

                      <LoginTitleContainer>
                        <LoginTitle>PASSWORD</LoginTitle>
                        <SignUpFormInfo Validity={PasswordValidity}>
                          {password !== ""
                            ? PasswordValidity
                              ? "😎 Password is Valid"
                              : "👿 Password is not Valid"
                            : ""}
                        </SignUpFormInfo>
                      </LoginTitleContainer>
                      <UserInfoInputContainer>
                        <UserInfoInput
                          type={"password"}
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onInputChange}
                          name={"password"}
                        />
                      </UserInfoInputContainer>

                      <LoginTitleContainer>
                        <LoginTitle>PASSWORD CHECK</LoginTitle>
                        <SignUpFormInfo
                          Validity={PasswordCheck && PasswordValidity}
                        >
                          {passwordCheck !== ""
                            ? PasswordCheck && PasswordValidity
                              ? "😎 Password is Checked"
                              : "👿 Password is not Same"
                            : ""}
                        </SignUpFormInfo>
                      </LoginTitleContainer>
                      <UserInfoInputContainer>
                        <UserInfoInput
                          type={"password"}
                          placeholder="Password Check"
                          value={this.state.passwordCheck}
                          onChange={(e: any) =>
                            this.setState({
                              passwordCheck: e.target.value
                            })
                          }
                          name={"password"}
                        />
                      </UserInfoInputContainer>

                      {/* <SignUpFormInfo>
                        ● Contain at least 1 number
                      </SignUpFormInfo>
                      <SignUpFormInfo>
                        ● Contain at least 1 lowercase character (a-z)
                      </SignUpFormInfo> */}

                      {/* <LoginTitle>PHONENUMBER</LoginTitle>
                      <UserInfoInput
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={(e: any) =>
                          this.setState({
                            phoneNumber: e.target.value
                          })
                        }
                      /> */}
                    </React.Fragment>
                  )}
                  <ButtonContainer>
                    <React.Fragment>
                      {login ? (
                        <Button value={"login"} />
                      ) : (
                        <Button
                          value={"create account"}
                          disabled={
                            !(
                              emailOverlapChecked &&
                              nickNameOverlapChecked &&
                              !emailOverlap &&
                              !nickNameOverlap &&
                              PasswordCheck
                            )
                          }
                        />
                      )}
                    </React.Fragment>
                    <Button
                      value={
                        login
                          ? "need to create an account?"
                          : "already have an account?"
                      }
                      onClick={(e: any) => {
                        e.preventDefault();
                        this.setState({ login: !login });
                      }}
                    />
                  </ButtonContainer>
                </RealLoginContainer>
              </LoginContainer>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default LogIn;
