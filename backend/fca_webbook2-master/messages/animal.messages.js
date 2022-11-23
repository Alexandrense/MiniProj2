module.exports = {
    success: {
        s0: {
            code: "AnimalCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "AnimalUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "AnimalFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "AnimalDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoAnimals",
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
            code: "AnimalNotFound",
            type: "error"
        }
    }
}