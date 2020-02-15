import http from './http'

class Api {
    constructor() {
        this.http = http
    }

    getListData(params) {
        return this.http.get('static/mock/appListData.json', params)
    }

}

export default new Api()

