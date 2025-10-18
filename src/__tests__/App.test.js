import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const webDevCheckbox = screen.getByLabelText(/web development/i);
  const dataScienceCheckbox = screen.getByLabelText(/data science/i);
  const uiUxCheckbox = screen.getByLabelText(/ui\/ux design/i);

  expect(webDevCheckbox).toBeInTheDocument();
  expect(dataScienceCheckbox).toBeInTheDocument();
  expect(uiUxCheckbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const webDevCheckbox = screen.getByLabelText(/web development/i);
  const dataScienceCheckbox = screen.getByLabelText(/data science/i);
  const uiUxCheckbox = screen.getByLabelText(/ui\/ux design/i);

  expect(webDevCheckbox).not.toBeChecked();
  expect(dataScienceCheckbox).not.toBeChecked();
  expect(uiUxCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

  expect(nameInput).toHaveValue('John Doe');
  expect(emailInput).toHaveValue('john@example.com');
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const webDevCheckbox = screen.getByLabelText(/web development/i);
  const dataScienceCheckbox = screen.getByLabelText(/data science/i);

  expect(webDevCheckbox).not.toBeChecked();
  expect(dataScienceCheckbox).not.toBeChecked();

  fireEvent.click(webDevCheckbox);
  fireEvent.click(dataScienceCheckbox);

  expect(webDevCheckbox).toBeChecked();
  expect(dataScienceCheckbox).toBeChecked();

  fireEvent.click(webDevCheckbox);

  expect(webDevCheckbox).not.toBeChecked();
  expect(dataScienceCheckbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const webDevCheckbox = screen.getByLabelText(/web development/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
  fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
  fireEvent.click(webDevCheckbox);
  fireEvent.click(submitButton);

  const successMessage = screen.getByText(/thank you jane smith! your email jane@example\.com has been registered\. interests: web development/i);
  expect(successMessage).toBeInTheDocument();
});
