function isUnauthenticated(ctx) {
    return !(ctx.request.authenticated || ctx.request.userID);
}

function isAuthenticated(ctx) {
    if (isUnauthenticated(ctx)) {
        throw new Error();
    }

    return true;
}

function isAdmin(ctx) {
    isAuthenticated(ctx);
    const { user } = ctx.request;

    if (!user.admin) {
        throw new Error();
    }

    return true;
}

function isManager(ctx, restaurant) {
    isAuthenticated(ctx);
    const { user } = ctx.request;

    if (!user.manager || (restaurant && user.restaurant.toString() !== restaurant.toString())) {
        throw new Error();
    }

    return true;
}

function isStaff(ctx, restaurant) {
    isAuthenticated(ctx);
    const { user } = ctx.request;

    if (!user.staff || (restaurant && user.restaurant.toString() !== restaurant.toString())) {
        throw new Errors.UnauthorizedAccess('Restricted Area');
    }

    return true;
}

// Check if a given ctx is authenticated as any roles=['staff','manager','admin']
function isAny(ctx, roles, resturant) {
    if (isUnauthenticated(ctx)) return false;
    const { user } = ctx.request;

    for (let role of roles) {
        // If the user does not have the role, skip this check.
        if (!user[role]) continue;
        // If the role is not admin, a resturant was given, and they are not a member, skip.
        if (role !== 'admin' && resturant && user.restaurant.toString() !== resturant.toString()) continue;

        // If the role was admin and they have it, or;
        // If the user has the role, and the resturant if specified
        // Then return true
        return true;
    }

    // If none return true, throw the error.
    throw new Errors.UnauthorizedAccess('Restricted Area');
}

// Check if the user is a certain role, never throw an error
function isRoleBool(ctx, role, resturant) {
    if (isUnauthenticated(ctx)) return false;
    const { user } = ctx.request;
    if (!user[role]) return false;
    if (role !== 'admin' && resturant && user.restaurant.toString() !== resturant.toString()) return false;
    return true;
}

module.exports.isUnauthenticated = isUnauthenticated;
module.exports.isAuthenticated = isAuthenticated;
module.exports.isAdmin = isAdmin;
module.exports.isManager = isManager;
module.exports.isStaff = isStaff;
module.exports.isAny = isAny;
