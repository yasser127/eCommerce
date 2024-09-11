import { Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import { Heading } from "@components/common";
import Input from "@components/Form/Input";
import { Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParams,
  } = useLogin();

  if (accessToken) {
    <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to view this content.
            </Alert>
          )}
          {searchParams.get("message") === "acount_created" && (
            <Alert variant="success">
              Your account has been created; proceed to login.
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="email"
              name="email"
              register={register}
              error={formErrors.email?.message}
            />
            <Input
              label="Password"
              name="password"
              register={register}
              error={formErrors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
