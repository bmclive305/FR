import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { LockClosedIcon } from '@heroicons/react/20/solid'

import AuthService from "../services/auth.service";

type Props = {};

type State = {
  redirect: string | null,
  username: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({ redirect: "/profile" });
    };
  }

  componentWillUnmount() {
    window.location.reload();
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(username, password).then(
      () => {
        this.setState({
          redirect: "/profile"
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { loading, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
    };

    return (
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href={"/register"} className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up for a free account
              </a>
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleLogin}
            >
              <Form>
                
                <div className="form-group">
                  <label htmlFor="username" className="sr-only">Username</label>
                  <Field name="username" type="text" 
                  placeholder="Username or Email"
                  className="form-control relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <Field name="password" type="password"
                  placeholder="Password" 
                  className="form-control relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className=" mt-5 mb-5 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="form-group group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {/* <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                  </button> */}
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>      
          </div>

 
        </div>
      </div>
    );
  }
}
