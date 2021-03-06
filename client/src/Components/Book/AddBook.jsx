import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BOOK } from "../../GraphQL/Mutation/Book";
import { useHistory } from "react-router-dom";
import { GET_LIST_BOOK } from "../../GraphQL/Query/Book";

export default function AddBook() {
  const [addBook] = useMutation(ADD_BOOK);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Error, setError] = useState("");
  const history = useHistory();
  const Validity = () => {
    let Error = "";
    //name
    if (!title || !description) {
      Error = "Всі поля мають буть заповнені!";
    }
    if (Error) {
      setError(Error);
      return false;
    }
    return true;
  };
  const onServer = (e) => {
    e.preventDefault();
    const valid = Validity();
    if (valid) {
      addBook({
        variables: { title: title, description: description },
        refetchQueries: [{ query: GET_LIST_BOOK }],
      });
      history.push("/books");
      setError("");
    }
  };
  return (
    <div className="container" style={{ marginTop: "20%" }}>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Create book</h1>
          <form action="" method="POST" onSubmit={onServer}>
            <div className="form-group">
              {Error === "" ? (
                <label htmlFor="title">
                  Title <span className="require">*</span>
                </label>
              ) : (
                <label
                  htmlFor="title"
                  style={Error !== "" ? { color: "red" } : null}
                >
                  {Error}
                </label>
              )}
              <input
                type="text"
                style={Error !== "" ? { border: "2px solid red" } : null}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                name="title"
              />
            </div>

            <div className="form-group">
              {Error === "" ? (
                <label htmlFor="description">
                  Description <span className="require">*</span>
                </label>
              ) : (
                <label
                  htmlFor="description"
                  style={Error !== "" ? { color: "red" } : null}
                >
                  {Error}
                </label>
              )}
              <textarea
                style={Error !== "" ? { border: "2px solid red" } : null}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="form-control"
                name="description"
              ></textarea>
            </div>

            <div className="form-group">
              <button
                type="submit"
                // className="btn btn-primary  btn-lg btn-block"
                className={
                  Error !== ""
                    ? "btn btn-danger  btn-lg btn-block"
                    : "btn btn-primary  btn-lg btn-block"
                }
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
