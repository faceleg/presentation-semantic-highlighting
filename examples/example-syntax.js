/**
 * Ensure user has only permissions passed to function
 *
 * @name updatePermissions
 * @param {String[]} permissions Permissions to be applied to user
 */
User.prototype.updatePermissions = function(permissions) {
    permissions = permissions || [];
    var self = this;
    self.permissions(true).then(function(currentPermissions) {

        currentPermissions.forEach(function(currentPermission) {
            var currentPermissionIndex = permissions.indexOf(currentPermission.permission);

            // Permission exists in database but not in desired updates
            if (currentPermissionIndex === -1) {
                currentPermission.destroy();
                return;
            }

            permissions.splice(currentPermissionIndex, 1);
        });

        permissions.forEach(function(permission) {
            self.permissions.create({
                permission: permission
            });
        });

    });
};
