import React, { useEffect, useState } from "react";
import PermissionModule from "../component/roles/PermissionModule";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(permissions);
  };

  const setModulesPermissions = (selectedPermission) => {
    let permisssions = [...permissions];
    const filtedPermission = setModulesRolesPermissions(
      selectedPermission,
      permisssions
    );
    setPermissions(filtedPermission);
  };
  const setModulesRolesPermissions = (selectedPermission, module) => {
    let permisssions = [...module];
    let hasFound = false;
    permisssions = permisssions.map((permission, pKey) => {
      if (permission.id === selectedPermission.id) {
        hasFound = true;
        return { ...permission, ...selectedPermission };
      }
      if (permission?.modules?.length > 0 && !hasFound) {
        setModulesRolesPermissions(selectedPermission, permission.modules);
      }
      return permission;
    });
    return permisssions;
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch(
          "https://api.npoint.io/54ebc3e831de65644713"
        );
        const data = await response.json();
        setPermissions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermissions();
  }, []);
  return (
    <div className="border">
      <form name="permissionForm" onSubmit={handleOnSubmit}>
        {permissions?.map((permission) => {
          return (
            <ul key={permission.id}>
              <PermissionModule
                key={permission.id}
                permission={permission}
                setModulesPermissions={setModulesPermissions}
              />
            </ul>
          );
        })}
        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default Permissions;
