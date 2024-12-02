import { useRef } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import "./style.css";

function Captcha() {
  const recaptcha = useRef();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <Form className="formContainer w-50" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>

      <ReCAPTCHA
        ref={recaptcha}
        className="mb-3"
        sitekey={process.env.REACT_APP_SITE_KEY}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default Captcha;
