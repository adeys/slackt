exports.errors = {
    /**
     * @param {Object} errors
     */
    firstOfAll: errors => {
        let result = {};
        for (let key of Object.keys(errors)) {
            result[key] = errors[key][0];
        }

        return result;
    }
};