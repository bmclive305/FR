<Formik
initialValues={initialValues}
validationSchema={this.validationSchema}
onSubmit={this.handleLogin}
>
<Form>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
      id="email1"
      type="email"
      placeholder="name@flowbite.com"
      required={true}
    />
  </div>

  <div className="form-group">
    <label htmlFor="username">Username</label>
    <Field name="username" type="text" className="form-control" />
    <ErrorMessage
      name="username"
      component="div"
      className="alert alert-danger"
    />
  </div>




  <div className="form-group">
    <label htmlFor="password">Password</label>
    <Field name="password" type="password" className="form-control" />
    <ErrorMessage
      name="password"
      component="div"
      className="alert alert-danger"
    />
  </div>

  <div className="form-group">
    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
      {loading && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      <span>Login</span>
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


{/* <form className="flex flex-col gap-4">
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="email1"
        value="Your email"
      />
    </div>
    <TextInput
      id="email1"
      type="email"
      placeholder="name@flowbite.com"
      required={true}
    />
  </div>
  <div>
    <div className="mb-2 block">
      <Label
        htmlFor="password1"
        value="Your password"
      />
    </div>
    <TextInput
      id="password1"
      type="password"
      required={true}
    />
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="remember" />
    <Label htmlFor="remember">
      Remember me
    </Label>
  </div>
  <Button type="submit">
    Submit
  </Button>
</form> */}