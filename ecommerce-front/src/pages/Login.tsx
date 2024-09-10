import { Form, Button, Col, Row } from "react-bootstrap";
import { Heading } from "@components/common";
import Input from "@components/Form/Input";
import { SignInSchema, signInType } from "@validation/SignInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(SignInSchema),
  });

  const submitForm: SubmitHandler<signInType> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
