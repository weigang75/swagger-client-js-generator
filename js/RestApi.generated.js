var Api = new HttpClient();
Api.host="petstore.swagger.io"
Api.basePath="/v2"

/**
* Update an existing pet
* @param {json} data (*必需) Pet object that needs to be added to the store
*       - _id {integer} 
*       - category {json} 
*           - _id {integer} 
*           - name {string} 
*       - name {string} 
*       - photoUrls {array[string]} 
*       - tags {array} 
*           - _id {integer} 
*           - name {string} 
*       - status {string} pet status in the store
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.updatePet = function(data, success, fail){
    Api.put({
        url : Api.basePath + "/pet",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Add a new pet to the store
* @param {json} data (*必需) Pet object that needs to be added to the store
*       - _id {integer} 
*       - category {json} 
*           - _id {integer} 
*           - name {string} 
*       - name {string} 
*       - photoUrls {array[string]} 
*       - tags {array} 
*           - _id {integer} 
*           - name {string} 
*       - status {string} pet status in the store
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.addPet = function(data, success, fail){
    Api.post({
        url : Api.basePath + "/pet",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Finds Pets by status
* @param {string} status Status values that need to be considered for filter
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*/
Api.findPetsByStatus = function(status, success, fail){
    if(status == null) status = "";

    Api.get({
        url : Api.basePath + "/pet/findByStatus?status=" + status + "",
        success : success,
        fail : fail
    });
}

/**
* Finds Pets by tags
* @param {string} tags Tags to filter by
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*/
Api.findPetsByTags = function(tags, success, fail){
    if(tags == null) tags = "";

    Api.get({
        url : Api.basePath + "/pet/findByTags?tags=" + tags + "",
        success : success,
        fail : fail
    });
}

/**
* Find pet by ID
* @param {string} petId ID of pet to return
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*       - _id {integer} 
*       - category {json} 
*           - _id {integer} 
*           - name {string} 
*       - name {string} 
*       - photoUrls {array[string]} 
*       - tags {array} 
*           - _id {integer} 
*           - name {string} 
*       - status {string} pet status in the store
*/
Api.getPetById = function(petId, success, fail){
    Api.get({
        url : Api.basePath + "/pet/" + petId + "",
        success : success,
        fail : fail
    });
}

/**
* Updates a pet in the store with form data
* @param {string} petId ID of pet that needs to be updated
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.updatePetWithForm = function(petId, success, fail){
    Api.post({
        url : Api.basePath + "/pet/" + petId + "",
        success : success,
        fail : fail
    });
}

/**
* Deletes a pet
* @param {string} petId Pet id to delete
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.deletePet = function(petId, success, fail){
    Api.del({
        url : Api.basePath + "/pet/" + petId + "",
        success : success,
        fail : fail
    });
}

/**
* uploads an image
* @param {string} petId ID of pet to update
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*       - code {integer} 
*       - type {string} 
*       - message {string} 
*/
Api.uploadFile = function(petId, success, fail){
    Api.post({
        url : Api.basePath + "/pet/" + petId + "/uploadImage",
        success : success,
        fail : fail
    });
}

/**
* Returns pet inventories by status
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*/
Api.getInventory = function(success, fail){
    Api.get({
        url : Api.basePath + "/store/inventory",
        success : success,
        fail : fail
    });
}

/**
* Place an order for a pet
* @param {json} data (*必需) order placed for purchasing the pet
*       - _id {integer} 
*       - petId {integer} 
*       - quantity {integer} 
*       - shipDate {string} 
*       - status {string} Order Status
*       - complete {boolean} 
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*       - _id {integer} 
*       - petId {integer} 
*       - quantity {integer} 
*       - shipDate {string} 
*       - status {string} Order Status
*       - complete {boolean} 
*/
Api.placeOrder = function(data, success, fail){
    Api.post({
        url : Api.basePath + "/store/order",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Find purchase order by ID
* @param {string} orderId ID of pet that needs to be fetched
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*       - _id {integer} 
*       - petId {integer} 
*       - quantity {integer} 
*       - shipDate {string} 
*       - status {string} Order Status
*       - complete {boolean} 
*/
Api.getOrderById = function(orderId, success, fail){
    Api.get({
        url : Api.basePath + "/store/order/" + orderId + "",
        success : success,
        fail : fail
    });
}

/**
* Delete purchase order by ID
* @param {string} orderId ID of the order that needs to be deleted
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.deleteOrder = function(orderId, success, fail){
    Api.del({
        url : Api.basePath + "/store/order/" + orderId + "",
        success : success,
        fail : fail
    });
}

/**
* Create user
* @param {json} data (*必需) Created user object
*       - _id {integer} 
*       - username {string} 
*       - firstName {string} 
*       - lastName {string} 
*       - email {string} 
*       - password {string} 
*       - phone {string} 
*       - userStatus {integer} User Status
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.createUser = function(data, success, fail){
    Api.post({
        url : Api.basePath + "/user",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Creates list of users with given input array
* @param {array} data (*必需) List of user object
*       - _id {integer} 
*       - username {string} 
*       - firstName {string} 
*       - lastName {string} 
*       - email {string} 
*       - password {string} 
*       - phone {string} 
*       - userStatus {integer} User Status
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.createUsersWithArrayInput = function(data, success, fail){
    Api.post({
        url : Api.basePath + "/user/createWithArray",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Creates list of users with given input array
* @param {array} data (*必需) List of user object
*       - _id {integer} 
*       - username {string} 
*       - firstName {string} 
*       - lastName {string} 
*       - email {string} 
*       - password {string} 
*       - phone {string} 
*       - userStatus {integer} User Status
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.createUsersWithListInput = function(data, success, fail){
    Api.post({
        url : Api.basePath + "/user/createWithList",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Logs user into the system
* @param {string} username The user name for login
* @param {string} password The password for login in clear text
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*/
Api.loginUser = function(username, password, success, fail){
    if(username == null) username = "";
    if(password == null) password = "";

    Api.get({
        url : Api.basePath + "/user/login?username=" + username + "&password=" + password + "",
        success : success,
        fail : fail
    });
}

/**
* Logs out current logged in user session
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.logoutUser = function(success, fail){
    Api.get({
        url : Api.basePath + "/user/logout",
        success : success,
        fail : fail
    });
}

/**
* Get user by user name
* @param {string} username The name that needs to be fetched. Use user1 for testing. 
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
* @return {json} 回调返回的数据
*       - _id {integer} 
*       - username {string} 
*       - firstName {string} 
*       - lastName {string} 
*       - email {string} 
*       - password {string} 
*       - phone {string} 
*       - userStatus {integer} User Status
*/
Api.getUserByName = function(username, success, fail){
    Api.get({
        url : Api.basePath + "/user/" + username + "",
        success : success,
        fail : fail
    });
}

/**
* Updated user
* @param {string} username name that need to be updated
* @param {json} data (*必需) Updated user object
*       - _id {integer} 
*       - username {string} 
*       - firstName {string} 
*       - lastName {string} 
*       - email {string} 
*       - password {string} 
*       - phone {string} 
*       - userStatus {integer} User Status
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.updateUser = function(username, data, success, fail){
    Api.put({
        url : Api.basePath + "/user/" + username + "",
        data : data,
        success : success,
        fail : fail
    });
}

/**
* Delete user
* @param {string} username The name that needs to be deleted
* @param {function} success 成功回调处理函数
* @param {function} fail 失败回调处理函数
*/
Api.deleteUser = function(username, success, fail){
    Api.del({
        url : Api.basePath + "/user/" + username + "",
        success : success,
        fail : fail
    });
}