module.exports = {
    success: {
        s0: {
            http: 201,
            code: "UserLevelCreated",
            type: "success"
        },
        s1: {
            http: 200,
            code: "UserLevelUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "UserLevelsFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "UserLevelDeleted",
            type: "success"
        },
        s4: {
            http: 204,
            code: "NoUserLevels",
            type: "success"
        },
    },
    error: {
        e0: {
            http: 404,
            code: "UserLevelsNotFound",
            type: "error"
        }
    },
    invalid: {
    }
}