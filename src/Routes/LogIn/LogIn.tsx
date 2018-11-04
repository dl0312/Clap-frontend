import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { LOGIN_MUTATION } from "../../sharedQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { emailSignIn, emailSignInVariables } from "src/types/api";

import { Form, Icon, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

const LoginContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
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
