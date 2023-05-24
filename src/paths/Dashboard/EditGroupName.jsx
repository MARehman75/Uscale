import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const EditGroupName = ({ onEdit }) => {
  const [editgroupName, setEditGroupName] = useState("");
  const [showInputFieldEdit, setShowInputFieldEdit] = useState(false);

  const handleGroupNameEdit = (event) => {
    setEditGroupName(event.target.value);
  };

  const handleCancelClickEdit = () => {
    setShowInputFieldEdit(false);
    setEditGroupName("");
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    if (editgroupName.trim() === "") {
      return; // Don't add empty group names
    }
    onEdit(editgroupName);
    setEditGroupName("");
    setShowInputFieldEdit(false);
  };

  const handleAddGroupClickEdit = () => {
    setShowInputFieldEdit(true);
  };

  return (
    <div className="add-group-form-container">
      {!showInputFieldEdit ? (
        <Button
          type="submit"
          onClick={handleAddGroupClickEdit}
          className="btn btn-add d-flex align-items-center justify-content-center"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            type="button"
            className="btn mt-2"
            style={{ fontSize: "26px" }}
          />
        </Button>
      ) : (
        <form onSubmit={handleSubmitEdit} className="d-flex align-items-center my-3 col-lg-4 col-6">
          <div className="input-group label-input d-flex align-items-center">
            <input
              type="text"
              placeholder="Enter New Label Name"
              className="form-control"
              value={editgroupName}
              onChange={handleGroupNameEdit}
              style={{ width: "22px" }}
            />
            <button
              type="submit"
              className="btn-new d-flex align-items-center justify-content-center ms-2 btn btn-primary"
              style={{ width: "43.99px" }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn-cancel d-flex align-items-center justify-content-center ms-2 btn btn-primary"
              onClick={handleCancelClickEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditGroupName;
