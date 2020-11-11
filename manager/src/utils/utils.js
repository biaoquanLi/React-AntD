export default {
    formatDate(time) {
        if (!time) return ''
        let date = new Date(time)
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共${data.total}条`
            },
            showQuickJumper: true
        }
    }
}