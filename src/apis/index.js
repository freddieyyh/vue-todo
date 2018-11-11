const apis = {
    getBody : function(data) {
        let success;
        let body;
        if (!data || !data.header) {
            success = false, body = null;
        }

        if (data.header.code === 9000) {
            success = true, body = data.body;
        }
        return {success, body};
    }
}

export default apis;