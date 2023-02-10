class DataObject {
    async doesExist(path) { }
    async create(path, content) { }
    async delete(path, recrusive = false) { }
    async download(path) { }
    async publish(path) { }
}

module.exports = DataObject;