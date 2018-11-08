import * as React from "react";
import { graphql } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";
import { LocaleProvider } from "antd";
import moment from "moment";

interface IProps {
  data: any;
}

interface IState {
  locale: any;
}

class AppContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      locale: "en_us"
    };
  }
  public changeLocale = (localeValue: any) => {
    console.log(localeValue);
    this.setState({ locale: localeValue });
    if (!localeValue) {
      moment.locale("en");
    } else {
      moment.locale("zh-cn");
    }
  };

  public render() {
    const { data } = this.props;
    const { locale } = this.state;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <LocaleProvider locale={locale}>
            <AppPresenter
              key={
                locale
                  ? locale.locale
                  : "en" /* Have to refresh for production environment */
              }
              changeLocale={this.changeLocale}
              isLoggedIn={data.auth.isLoggedIn}
            />
          </LocaleProvider>
        </ThemeProvider>
        <ToastContainer draggable={true} position={"bottom-center"} />
      </React.Fragment>
    );
  }
}

export default graphql(IS_LOGGED_IN)(AppContainer);
