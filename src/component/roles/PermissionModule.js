import React from "react";
import Checkbox from "./Checkbox";

const PermissionModule = ({
  permission,
  type = "permission",
  setModulesPermissions,
}) => {
  const handleOnPermissionChange = (selectedPermission, e) => {
    selectedPermission[`${e.target.name}`] = e.target.checked;
    setModulesPermissions(selectedPermission);
  };
  return (
    <li
      style={type === "permission" ? { borderBottom: "1px solid gray" } : {}}
      key={permission.id}
    >
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4
          className={
            type === "permission"
              ? "text-primary  mx-3"
              : "small text-muted mx-3"
          }
          style={{ display: "inline-block", flexGrow: 1 }}
        >
          {permission.title.toUpperCase()}
        </h4>
        <div style={{ flexGrow: 1 }}>
          <Checkbox
            isChecked={permission.can_view}
            onChangeEvent={handleOnPermissionChange}
            permission={permission}
            name="can_view"
          />
          <Checkbox
            isChecked={permission.can_edit}
            onChangeEvent={handleOnPermissionChange}
            permission={permission}
            name="can_edit"
          />
          <Checkbox
            isChecked={permission.can_delete}
            onChangeEvent={handleOnPermissionChange}
            permission={permission}
            name="can_delete"
          />
          <Checkbox
            isChecked={permission.can_create}
            onChangeEvent={handleOnPermissionChange}
            permission={permission}
            name="can_create"
          />
        </div>
      </ul>

      {permission?.modules?.map((module) => {
        return (
          <ol style={{ listStyle: "none" }} key={module.id}>
            <PermissionModule
              key={module.id}
              permission={module}
              setModulesPermissions={setModulesPermissions}
            />
          </ol>
        );
      })}
    </li>
  );
};

export default PermissionModule;
