import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByText,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import ContactForm from "./components/ContactForm";
import { Component } from "react";
import axiosMock from "axios";
import axios from "./components/__mocks__/axios";

afterEach(cleanup);

test("renders App without crashing", () => {
  render(<App />);
});

describe("renders form component", () => {
  it("renders all form fields", () => {
    const { getByLabelText, getByText, getByTestId } = render(<ContactForm />);

    const firstName = getByLabelText(/first name/i);
    const lastName = getByLabelText(/last name/i);
    const email = getByLabelText(/email/i);
    const message = getByTestId("message");
    const button = getByText(/submit/i);

    console.log(message);

    fireEvent.change(firstName, { target: { value: "Benjamin" } });
    fireEvent.change(lastName, { target: { value: "Venker" } });
    fireEvent.change(email, { target: { value: "bvemails@gmail.com" } });
    fireEvent.change(message, {
      target: { value: "test message for testing" },
    });

    expect(firstName.value).toBe("Benjamin");
    expect(lastName.value).toBe("Venker");
    expect(message.value).toBe("test message for testing");

    // Click on the button
    fireEvent.click(button);
  });

  it("fetches data and displays data", async () => {
    axiosMock.get.mockResolvedValueOnce();

    const { getByTestId, getByLabelText } = render(<ContactForm />);
    const button = getByText(/submit/i);
    fireEvent.click(button);

    const response = getByTestId(/response/i);

    expect(response).toBe({
      data: {
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg",
      },
      ad: {
        company: "StatusCode Weekly",
        url: "http://statuscode.org/",
        text:
          "A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things.",
      },
    });
  });
});
