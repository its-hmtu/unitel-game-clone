import { Form, Button } from "react-bootstrap";

const SearchBar = (props) => {
  const searchIcon = props.searchicon;
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Control {...props} />
      </Form.Group>
      <>
        {searchIcon &&
          <Button variant="dark">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19.6996C15.9706 19.6996 20 15.7374 20 10.8498C20 5.9622 15.9706 2 11 2C6.02944 2 2 5.9622 2 10.8498C2 15.7374 6.02944 19.6996 11 19.6996Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M18.9299 20.3779C19.4599 21.9512 20.6699 22.1086 21.5999 20.7319C22.4499 19.4733 21.8899 18.4408 20.3499 18.4408C19.2099 18.431 18.5699 19.3061 18.9299 20.3779Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Button>}
      </>
    </Form>
  );
};

export default SearchBar;
