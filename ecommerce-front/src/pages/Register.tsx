import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { Heading } from "@components/common";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpType, signUpSchema } from "@validation/SignUpSchema";
import { Input } from "@components/Form";
import useEmailCheckAvailability from "@hooks/useEmailCheckAvailability";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    getFieldState,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=acount_created");
      });
  };
  const {
    checkEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    resetCheckEmailAvailability,
  } = useEmailCheckAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && value !== enteredEmail) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail && value.length === 0) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    dispatch(resetUI());
  }, [dispatch]);
  if (accessToken) {
    <Navigate to={"/"} />;
  }
  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              type="text"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Email Address"
              name="email"
              register={register}
              error={
                errors.email?.message
                  ? errors.email.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "this email is not available for you to use."
                  : emailAvailabilityStatus === "failed"
                  ? "error from the server."
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of your email, please wait..."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use"
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
            >
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

export default Register;
