import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
// import {
//   emailSignIn,
//   emailSignInVariables,
//   emailSignUp,
//   emailSignUpVariables
// } from "../../types/api";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import SubmitButton from "../../Components/SubmitButton";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../sharedQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

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

const LoginTitle = styled.div`
  padding-bottom: 10px;
`;

const SearchInput = styled(Input)`
  width: 100%;
  margin-bottom: 30px;
  padding: 0 10px;
  height: 30px;
  border: 1px solid #ced4da;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
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
  color: black
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
  email: string;
  password: string;
  phoneNumber: string;
}

// class LogInQuery extends Mutation<emailSignIn, emailSignInVariables> {}
// class SignUpQuery extends Mutation<emailSignUp, emailSignUpVariables> {}

class LogIn extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      login: true,
      nickName: "",
      email: "",
      password: "",
      phoneNumber: ""
    };
  }

  public render() {
    const { email, password, login, nickName, phoneNumber } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, nickName, phoneNumber }}
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

              if (token !== null) {
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
                      <LoginTitle>E-MAIL</LoginTitle>
                      <SearchInput
                        type="text"
                        value={this.state.email}
                        onChange={(e: any) =>
                          this.setState({
                            email: e.target.value
                          })
                        }
                        placeholder="Your email address"
                      />
                      <LoginTitle>PASSWORD</LoginTitle>
                      <SearchInput
                        type="text"
                        value={this.state.password}
                        onChange={(e: any) =>
                          this.setState({
                            password: e.target.value
                          })
                        }
                        placeholder="password"
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <LoginTitle>NICKNAME</LoginTitle>
                      <SearchInput
                        type="text"
                        value={this.state.nickName}
                        onChange={(e: any) =>
                          this.setState({
                            nickName: e.target.value
                          })
                        }
                      />
                      <LoginTitle>E-MAIL</LoginTitle>
                      <SearchInput
                        type="text"
                        value={this.state.email}
                        onChange={(e: any) =>
                          this.setState({
                            email: e.target.value
                          })
                        }
                      />
                      <LoginTitle>PASSWORD</LoginTitle>
                      <SearchInput
                        type="text"
                        value={this.state.password}
                        onChange={(e: any) =>
                          this.setState({
                            password: e.target.value
                          })
                        }
                      />
                      <LoginTitle>PHONENUMBER</LoginTitle>
                      <SearchInput
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={(e: any) =>
                          this.setState({
                            phoneNumber: e.target.value
                          })
                        }
                      />
                    </React.Fragment>
                  )}
                  <ButtonContainer>
                    <React.Fragment>
                      <Button
                        value={login ? "login" : "create account"}
                        onClick={() => mutation()}
                      />
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
}

export default LogIn;
