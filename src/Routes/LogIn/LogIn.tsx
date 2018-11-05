import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import {
  LOGIN_MUTATION,
  FACEBOOK_CONNECT,
  GOOGLE_CONNECT
} from "../../sharedQueries";
import { toast } from "react-toastify";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { LOG_USER_IN } from "../../sharedQueries.local";
import {
  emailSignIn,
  emailSignInVariables,
  facebookConnect,
  facebookConnectVariables,
  googleConnect,
  googleConnectVariables
} from "src/types/api";

import { Form, Icon, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

const Logo = styled.div`
  text-align: center;
  padding: 0 30px 30px;
  text-decoration: none;
  font-family: "Raleway";
  font-weight: 100;
  letter-spacing: 10px;
  font-size: 20px;
`;

const LoginContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  color: black;
`;

const CompanyIcon = styled.div`
  color: white;
  margin-right: 10px;
`;

interface IProps {
  history: any;
  form: any;
}

interface IState {
  email: string;
  password: string;
}

class LogInQuery extends Mutation<emailSignIn, emailSignInVariables> {}

class FacebookConnectMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

class GoogelConnectMutation extends Mutation<
  googleConnect,
  googleConnectVariables
> {}

class LogIn extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  public handleSubmit = (e: any, mutationFn: any) => {
    console.log(e);
    e.preventDefault();
    mutationFn();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LogInQuery
            mutation={LOGIN_MUTATION}
            onCompleted={data => {
              const { token } = data.EmailSignIn;
              console.log(data);
              if (data.EmailSignIn.ok) {
                toast.success("Log In success");
                if (token !== undefined) {
                  logUserIn({ variables: { token } });
                  this.props.history.push(`/`);
                }
              } else {
                toast.error(data.EmailSignIn.error);
              }
            }}
          >
            {mutation => (
              <LoginContainer>
                <Logo style={{ minWidth: "240px" }}>
                  CLAP
                  <div
                    role="img"
                    aria-label="Game"
                    style={{
                      fontFamily: "Open Sans",
                      fontSize: "5px",
                      letterSpacing: "2px"
                    }}
                  >
                    🕹️POWERED BY GAMERS🕹️
                  </div>
                </Logo>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    this.props.form.validateFields((err: any, values: any) => {
                      mutation({
                        variables: {
                          email: values.email,
                          password: values.password
                        }
                      });
                      if (!err) {
                        console.log("Received values of form: ", values);
                      }
                    });
                  }}
                  className="login-form"
                  style={{ maxWidth: "300px" }}
                >
                  <FormItem>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your email!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="E-mail"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Password!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: true
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a
                      className="login-form-forgot"
                      href=""
                      style={{ float: "right" }}
                    >
                      Forgot password
                    </a>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: "100%" }}
                    >
                      Log in
                    </Button>
                    <Mutation mutation={LOG_USER_IN}>
                      {logUserIn => (
                        <>
                          <FacebookConnectMutation
                            mutation={FACEBOOK_CONNECT}
                            onCompleted={data => {
                              const { FacebookConnect } = data;
                              const { token } = FacebookConnect;
                              console.log(data);
                              if (FacebookConnect.ok) {
                                toast.success("Facebook Connection Success");
                                if (token !== null) {
                                  logUserIn({ variables: { token } });
                                  this.props.history.push(`/`);
                                }
                              } else {
                                toast.error(FacebookConnect.error);
                              }
                            }}
                          >
                            {(facebookConnect, { loading }) => (
                              <FacebookLogin
                                appId="1660436057369700"
                                autoLoad={false}
                                fields="first_name,last_name,name,email,id"
                                callback={(response: any) => {
                                  console.log(response);
                                  facebookConnect({
                                    variables: {
                                      firstName: response.first_name,
                                      lastName: response.last_name,
                                      nickName: response.name,
                                      email: response.email,
                                      fbId: response.id
                                    }
                                  });
                                }}
                                render={(renderProps: any) => (
                                  <Button
                                    onClick={renderProps.onClick}
                                    type="primary"
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#3b5998",
                                      borderColor: "#3b5998"
                                    }}
                                  >
                                    <CompanyIcon className="fab fa-facebook-f" />{" "}
                                    Facebook Log in
                                  </Button>
                                )}
                              />
                            )}
                          </FacebookConnectMutation>
                          <GoogelConnectMutation
                            mutation={GOOGLE_CONNECT}
                            onCompleted={data => {
                              const { GoogleConnect } = data;
                              const { token } = GoogleConnect;
                              console.log(data);
                              if (GoogleConnect.ok) {
                                toast.success("Google Connect Success");
                                if (token !== null) {
                                  logUserIn({ variables: { token } });
                                  this.props.history.push(`/`);
                                }
                              } else {
                                toast.error(GoogleConnect.error);
                              }
                              if (token !== null) {
                                logUserIn({ variables: { token } });
                              }
                            }}
                          >
                            {(GoogleConnect, { loading }) => (
                              <GoogleLogin
                                clientId={
                                  "507629564813-jp4arkeqhitdcf6mlhnums7dib204odf.apps.googleusercontent.com"
                                }
                                autoLoad={false}
                                onSuccess={(response: any) => {
                                  console.log(response);
                                  GoogleConnect({
                                    variables: {
                                      firstName: response.profileObj.givenName,
                                      lastName: response.profileObj.familyName,
                                      nickName: response.profileObj.name,
                                      email: response.profileObj.email,
                                      profilePhoto:
                                        response.profileObj.imageUrl,
                                      googleId: response.googleId
                                    }
                                  });
                                }}
                                onFailure={() =>
                                  toast.error("Google Connect Failed")
                                }
                                render={(renderProps: any) => (
                                  <Button
                                    onClick={renderProps.onClick}
                                    type="primary"
                                    style={{
                                      width: "100%",
                                      backgroundColor: "#ea4335",
                                      borderColor: "#ea4335",
                                      marginBottom: "7px"
                                    }}
                                  >
                                    <CompanyIcon className="fab fa-google" />{" "}
                                    Google Log in
                                  </Button>
                                )}
                              />
                            )}
                          </GoogelConnectMutation>
                          <Button
                            type="primary"
                            style={{
                              width: "100%",
                              backgroundColor: "#008ED5",
                              borderColor: "#008ED5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: "5px"
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 64 64"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "5px"
                              }}
                            >
                              <path
                                id="bot-down-sml"
                                fill="#fff"
                                d="M39.086,22.373c-0.746-0.317-0.623-0.247-0.623-0.247s-0.08-0.088,1.069,0.816 c1.75,1.377,2.907,3.603,3.532,5.768c0.768,2.668,0.204,6.369-2.228,10.053c-5.185,7.856-13.558,12.445-15.226,9.722 c-0.846-1.381,1.926-4.122,1.926-4.122l-1.675,0.91c0,0-2.931,3.497-2.395,5.628c0.915,3.636,10.992,1.171,18.285-10.746 C48.3,29.458,41.053,23.212,39.086,22.373z"
                              />
                              <path
                                id="top-down-sml"
                                fill="#fff"
                                d="M39.047,22.276c-0.746-0.318-0.899-0.293-0.899-0.293s0.066-0.025,1.215,0.879 c1.75,1.377,3.038,3.586,3.662,5.752c0.769,2.667,0.205,6.369-2.228,10.054c-5.185,7.856-13.557,12.444-15.226,9.722 c-0.846-1.382,1.925-4.122,1.925-4.122l-1.675,0.909c0,0-2.931,3.497-2.394,5.628c0.914,3.635,10.991,1.17,18.285-10.746 C48.26,29.36,41.014,23.115,39.047,22.276z"
                              />
                              <path
                                id="bot-left-sml"
                                fill="#fff"
                                d="M36.708,41.727c0,0,0.115-0.025-1.242,0.517c-2.067,0.827-4.573,0.717-6.762,0.174 c-2.694-0.667-5.617-3.007-7.592-6.955c-4.211-8.418-3.999-17.964-0.808-18.048c1.621-0.042,2.608,3.729,2.608,3.729l0.05-1.905 c0,0-1.563-4.288-3.676-4.889c-3.606-1.026-6.51,8.934,0.164,21.208c5.991,11.02,15.023,7.868,16.733,6.583 C36.831,41.655,36.708,41.727,36.708,41.727z"
                              />
                              <path
                                id="top-left-sml"
                                fill="#fff"
                                d="M35.626,42.138c-2.068,0.826-4.625,0.838-6.812,0.295c-2.694-0.667-5.617-3.007-7.593-6.955 c-4.211-8.419-3.999-17.965-0.807-18.048c1.62-0.042,2.608,3.729,2.608,3.729l0.05-1.905c0,0-1.564-4.287-3.677-4.888 c-3.606-1.026-6.51,8.934,0.163,21.208c5.992,11.02,15.024,7.867,16.733,6.583c0.639-0.479,0.701-0.627,0.703-0.632 C36.991,41.532,36.928,41.618,35.626,42.138z"
                              />
                              <path
                                id="bot-rght-sml"
                                fill="#fff"
                                d="M34.536,18.464c-12.539-0.321-14.326,9.077-14.068,11.2c0.098,0.805,0.097,0.663,0.097,0.663 s-0.036,0.113,0.174-1.333c0.317-2.203,1.667-4.319,3.23-5.943c1.925-1.999,5.413-3.361,9.82-3.097 c9.396,0.562,17.556,5.52,16.033,8.325c-0.774,1.423-4.534,0.393-4.534,0.393l1.625,0.996c0,0,4.494,0.79,6.072-0.74 C55.676,26.317,48.503,18.823,34.536,18.464z"
                              />
                              <path
                                id="top-rght-sml"
                                fill="#fff"
                                d="M34.473,18.552c-12.54-0.321-14.325,9.077-14.068,11.2c0.096,0.793,0.193,0.921,0.196,0.925 c-0.003-0.005-0.047-0.102,0.154-1.492c0.318-2.204,1.586-4.424,3.15-6.047c1.925-1.999,5.413-3.361,9.82-3.098 c9.396,0.563,17.556,5.52,16.032,8.325c-0.773,1.424-4.532,0.394-4.532,0.394l1.625,0.996c0,0,4.495,0.79,6.072-0.74 C55.612,26.405,48.44,18.909,34.473,18.552z"
                              />
                              <path
                                id="bot-rght-lrg"
                                fill="#fff"
                                d="M37.273,18.685c-0.865-1.643-3.493-6.421-6.087-8.961c-3.813-3.734-5.904-2.135-6.733-1.241 c-4.759,5.13-1.827,19.291,1.188,27.814c0.447,1.266,0.935,2.507,1.449,3.718c0.223-0.09,0.552-0.229,0.903-0.398 c0.387-0.188,0.682-0.345,0.859-0.442c-0.113-0.321-0.227-0.644-0.338-0.972c-2.773-8.138-5.046-21.607-0.404-24.862 c1.289-0.905,2.777,0.146,3.931,1.247c1.059,1.013,2.408,2.979,3.044,3.943L37.273,18.685z M33.329,49.452l-0.967,0.669 c2.03,3.24,4.031,5.833,5.602,7.46c0.914,0.947,1.553,0.959,1.553,0.959C38.693,57.867,36.151,54.789,33.329,49.452z  M29.644,43.562c-0.208,0.165-0.52,0.401-0.676,0.519c0.679,1.355,1.382,2.653,2.092,3.88l0.117-0.069l1.005-0.708 c-0.619-1.282-1.243-2.666-1.856-4.155C30.166,43.153,29.872,43.382,29.644,43.562z"
                              />
                              <path
                                id="top-left-lrg"
                                fill="#fff"
                                d="M36.207,18.54c0.739,0.048,1.142,0.101,1.145,0.101c-0.894-1.694-3.493-6.395-6.058-8.907 C27.48,6,25.389,7.6,24.56,8.494c-4.76,5.129-1.827,19.292,1.187,27.813c0.448,1.266,0.936,2.51,1.45,3.724 c0.223-0.09,0.552-0.229,0.903-0.4c0.387-0.188,0.682-0.345,0.86-0.442c-0.114-0.323-0.228-0.648-0.34-0.977 c-2.774-8.138-5.046-21.606-0.404-24.862c1.29-0.904,2.778,0.146,3.93,1.248c1.04,0.993,2.356,2.903,3.008,3.887 C35.19,18.487,35.617,18.503,36.207,18.54z M33.434,49.443c-0.065,0.048-0.276,0.202-0.554,0.393 c-0.1,0.069-0.335,0.223-0.435,0.288c2.042,3.274,4.055,5.896,5.632,7.532c0.914,0.946,1.621,0.978,1.621,0.978 C38.872,57.959,36.288,54.833,33.434,49.443z M29.731,43.567c-0.271,0.215-0.636,0.497-0.663,0.518 c0.668,1.338,1.36,2.621,2.059,3.836c0.063-0.033,0.231-0.123,0.591-0.335c0.342-0.201,0.524-0.32,0.591-0.363 c-0.63-1.299-1.263-2.702-1.885-4.21C30.394,43.036,30.033,43.325,29.731,43.567z"
                              />
                              <path
                                id="bot-rght-lrg"
                                fill="#fff"
                                d="M55.438,36.413c-2.063-6.686-15.794-11.227-24.682-12.877c-1.32-0.245-2.638-0.445-3.944-0.605 c-0.034,0.238-0.078,0.593-0.107,0.981c-0.031,0.429-0.041,0.763-0.046,0.965c0.334,0.061,0.671,0.126,1.011,0.193 c8.435,1.666,21.234,6.433,21.733,12.081c0.138,1.57-1.515,2.333-3.046,2.781c-1.406,0.411-3.783,0.595-4.937,0.665l-1.225,1.819 c1.859,0.073,7.308,0.186,10.802-0.791C56.136,40.19,55.797,37.58,55.438,36.413z M6.16,23.567 c-1.276,0.316-1.607,0.864-1.607,0.864c1.001-0.378,4.964-1.045,11.04-0.812l-0.077-1.178C11.655,22.577,8.373,23.016,6.16,23.567 z M22.346,22.527c-1.476-0.087-2.916-0.128-4.3-0.129l-0.003,0.113l0.056,1.25c1.409,0.104,2.909,0.256,4.492,0.469 c-0.016-0.114-0.075-0.521-0.126-0.874C22.422,23.069,22.366,22.675,22.346,22.527z"
                              />
                              <path
                                id="bot-down-lrg"
                                fill="#fff"
                                d="M45.427,23.206c-0.829,1.221-1.752,2.502-2.778,3.829c0.019,0.008,0.448,0.176,0.827,0.326 c0.318,0.126,0.731,0.293,0.782,0.314c0.859-1.299,1.654-2.59,2.379-3.85l-0.099-0.06L45.427,23.206z M40.135,30.128 c-0.221,0.259-0.444,0.519-0.673,0.779c-5.66,6.471-16.188,15.173-21.329,12.781c-1.428-0.664-1.263-2.477-0.885-4.028 c0.357-1.462,1.431-3.689,1.933-4.689l-0.95-1.973c-0.941,1.486-3.85,6.255-4.768,9.834c-1.327,5.168,1.104,6.18,2.293,6.451 c6.821,1.557,17.619-8.064,23.493-14.936c0.872-1.021,1.704-2.063,2.496-3.114c-0.189-0.147-0.475-0.363-0.797-0.582 C40.592,30.409,40.308,30.233,40.135,30.128z M51.575,11.207c-0.171,1.05-1.567,4.787-4.774,9.897l1.063,0.504 c1.788-3.376,3.032-6.404,3.657-8.577C51.884,11.767,51.575,11.207,51.575,11.207z"
                              />
                              <path
                                id="top-down-lrg"
                                fill="#fff"
                                d="M45.373,23.115c-0.81,1.194-1.709,2.445-2.705,3.737c0.069,0.026,0.482,0.184,0.825,0.318 c0.296,0.116,0.693,0.287,0.781,0.325c0.827-1.252,1.595-2.495,2.3-3.711c-0.092-0.054-0.35-0.206-0.582-0.341 C45.737,23.295,45.462,23.158,45.373,23.115z M51.566,11.004c-0.172,1.053-1.587,4.852-4.827,10.018 c0.079,0.036,0.31,0.14,0.605,0.281c0.11,0.052,0.367,0.186,0.475,0.241c1.815-3.407,3.081-6.463,3.708-8.648 C51.891,11.632,51.566,11.004,51.566,11.004z M40.092,30.028c-0.222,0.259-0.446,0.519-0.674,0.78 c-5.66,6.471-16.188,15.172-21.329,12.781c-1.429-0.665-1.263-2.479-0.885-4.028c0.351-1.439,1.397-3.62,1.909-4.642 c-0.023-0.045-0.217-0.421-0.472-0.94c-0.267-0.545-0.444-0.933-0.487-1.03c-0.974,1.542-3.829,6.244-4.737,9.783 c-1.326,5.17,1.104,6.181,2.293,6.452c6.823,1.558,17.621-8.064,23.494-14.936c0.872-1.02,1.704-2.063,2.499-3.114 c-0.19-0.148-0.474-0.363-0.794-0.581C40.55,30.31,40.265,30.132,40.092,30.028z"
                              />
                              <path
                                id="top-rght-lrg"
                                fill="#fff"
                                d="M55.374,36.502c-2.062-6.687-15.793-11.229-24.682-12.878c-1.318-0.245-2.636-0.444-3.944-0.605 c-0.034,0.237-0.078,0.593-0.106,0.981c-0.031,0.429-0.042,0.764-0.046,0.966c0.334,0.062,0.671,0.125,1.011,0.193 c8.434,1.667,21.234,6.433,21.733,12.081c0.139,1.569-1.515,2.332-3.046,2.78c-1.376,0.402-3.683,0.588-4.862,0.661l0.002,0.003 c0,0-0.259,0.387-0.603,0.898c-0.391,0.583-0.634,0.919-0.634,0.919l-0.008,0.006c1.912,0.072,7.285,0.172,10.745-0.794 C56.073,40.278,55.734,37.667,55.374,36.502z M22.305,22.61c-1.462-0.088-2.889-0.132-4.262-0.136 c-0.004,0.098-0.011,0.345-0.005,0.682c0.007,0.397,0.018,0.617,0.022,0.7c1.411,0.104,2.911,0.255,4.491,0.466 c-0.004-0.025-0.082-0.513-0.141-0.915C22.333,22.881,22.309,22.648,22.305,22.61z M15.471,22.512 c-3.896,0.128-7.209,0.562-9.432,1.115c-1.276,0.318-1.658,0.914-1.658,0.914c1.003-0.379,5.036-1.058,11.18-0.826 c-0.008-0.084-0.032-0.33-0.058-0.659C15.494,22.934,15.478,22.636,15.471,22.512z"
                              />
                            </svg>
                            Battle.net Log in
                          </Button>
                          <Button
                            type="primary"
                            style={{
                              width: "100%",
                              backgroundColor: "#2c2f33",
                              borderColor: "#2c2f33"
                            }}
                          >
                            <CompanyIcon className="fab fa-discord" />
                            Discord Log in
                          </Button>
                        </>
                      )}
                    </Mutation>
                    Or <a href="/register">register now!</a>
                  </FormItem>
                </Form>
              </LoginContainer>
            )}
          </LogInQuery>
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

export default Form.create()(LogIn);
