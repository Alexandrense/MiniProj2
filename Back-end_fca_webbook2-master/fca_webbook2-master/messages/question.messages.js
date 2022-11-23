module.exports = {
    success: {
        s0: {
            code: "QuestionCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "QuestionUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "QuestionFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "QuestionDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoQuestions",
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
            http: 404,
            code: "QuestionNotFound",
            type: "error"
        }
    }
}