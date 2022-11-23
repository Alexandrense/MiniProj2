module.exports = {
    success: {
        s0: {
            http: 201,
            code: "UserCreated",
            type: "success"
        },
        s1: {
            http: 200,
            code: "UserUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "UserFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "UserDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoUsers",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 409,
            code: "UsernameDuplicate",
            type: "error"
        },
        e1: {
            http: 404,
            code: "UserNotFound",
            type: "error"
        }
    },
    invalid: {
    }
}