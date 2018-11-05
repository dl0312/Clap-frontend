import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { SIGNUP_MUTATION } from "../../sharedQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { emailSignUp, emailSignUpVariables } from "src/types/api";
import Recaptcha from "react-recaptcha";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Checkbox,
  Button,
  DatePicker
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

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

const Logo = styled.div`
  text-align: center;
  padding: 0 30px 30px;
  text-decoration: none;
  font-family: "Raleway";
  font-weight: 100;
  letter-spacing: 10px;
  font-size: 20px;
`;

interface IProps {
  history: any;
  form: any;
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
  phoneNumber: string;
  gender: string;
  birthday: string;
  confirmDirty: boolean;
  autoCompleteResult: any[];
  isVerified: boolean;
}

class SignUpQuery extends Mutation<emailSignUp, emailSignUpVariables> {}

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      login: true,
      nickName: "",
      nickNameOverlap: false,
      nickNameOverlapChecked: false,
      email: "",
      emailOverlap: false,
      emailOverlapChecked: false,
      password: "",
      passwordCheck: "",
      phoneNumber: "",
      gender: "",
      birthday: "",
      confirmDirty: false,
      autoCompleteResult: [],
      isVerified: false
    };
  }

  public handleSubmit = (e: any, mutationFn: any) => {
    e.preventDefault();
    mutationFn();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  public handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  public compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  public validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  public handleWebsiteChange = (value: any) => {
    let autoCompleteResult: any[];
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  public handleAgreement = (rule: any, value: boolean, callback: any) => {
    if (value === false) {
      callback("If you uncheck agreement, you can't register");
    } else {
      callback();
    }
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "010"
    })(
      <Select style={{ width: 70 }}>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
      </Select>
    );

    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <SignUpQuery
            mutation={SIGNUP_MUTATION}
            onCompleted={data => {
              const { token } = data.EmailSignUp;
              if (data.EmailSignUp.ok) {
                toast.success("Sign Up success");
                if (token !== undefined) {
                  logUserIn({ variables: { token } });
                  this.props.history.push(`/`);
                }
              } else {
                toast.error(data.EmailSignUp.error);
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
                  style={{ minWidth: "500px" }}
                  onSubmit={e => {
                    e.preventDefault();
                    this.props.form.validateFields((err: any, values: any) => {
                      console.log(values);
                      if (!err && this.state.isVerified) {
                        console.log("Received values of form: ", values);
                        mutation({
                          variables: {
                            email: values.email,
                            password: values.password,
                            phoneNumber: values.prefix + values.phoneNumber,
                            nickName: values.nickName,
                            gender: values.gender,
                            birthday: values.birthday._d
                          }
                        });
                      }
                    });
                  }}
                >
                  <FormItem {...formItemLayout} label="E-mail">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: "The input is not valid E-mail!"
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!"
                        }
                      ]
                    })(<Input />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Password">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        },
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(<Input type="password" />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Confirm Password">
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Please confirm your password!"
                        },
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Phone Number">
                    {getFieldDecorator("phoneNumber", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phone number!"
                        }
                      ]
                    })(
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                      />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={
                      <span>
                        Nickname&nbsp;
                        <Tooltip title="What do you want others to call you?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator("nickName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your nickname!",
                          whitespace: true
                        }
                      ]
                    })(<Input />)}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Gender">
                    {getFieldDecorator("gender", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your gender"
                        }
                      ]
                    })(
                      <Select placeholder="Gender" style={{ width: 120 }}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Birthday">
                    {getFieldDecorator("birthday", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your birthday!"
                        }
                      ]
                    })(<DatePicker size={"default"} />)}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="CAPTCHA"
                    extra="We must make sure that your are a human."
                  >
                    {getFieldDecorator("verify", {
                      rules: [
                        {
                          required: true,
                          message: "You should check this box"
                        }
                      ]
                    })(<Captcha />)}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator("agreement", {
                      rules: [
                        {
                          required: true,
                          message: "You should check, if you want to register"
                        },
                        {
                          validator: this.handleAgreement
                        }
                      ]
                    })(
                      <Checkbox>
                        I have read the <a href="">agreement</a>
                      </Checkbox>
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>
                  </FormItem>
                </Form>
              </LoginContainer>
            )}
          </SignUpQuery>
        )}
      </Mutation>
    );
  }

  public recaptchaLoaded = () => {
    console.log("reCAPTHCHA Loaded");
  };

  public verifyCallback = (res: any) => {
    if (res) {
      this.setState({ isVerified: true });
    }
  };
}

class Captcha extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  public verifyCallback(result: any) {
    console.log("verifyCallback", result);
    this.props.onChange(result); // notify the form after verified
  }
  render() {
    return (
      <Recaptcha
        sitekey="6LekqngUAAAAALuE3_XnMU2VW2dfedk14mdwFuEQ"
        render="explicit"
        onloadCallback={() => console.log("captcha is loaded")}
        verifyCallback={this.verifyCallback}
      />
    );
  }
}

export default Form.create()(Register);
