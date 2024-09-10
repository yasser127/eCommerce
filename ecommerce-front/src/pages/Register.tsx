import { Form, Button, Col, Row } from "react-bootstrap";
import { Heading } from "@components/common";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpType, signUpSchema } from "@validation/SignUpSchema";
import { Input } from "@components/Form";
import useEmailCheckAvailability from "@hooks/useEmailCheckAvailability";

const Register = () => {
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

  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data);
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
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
