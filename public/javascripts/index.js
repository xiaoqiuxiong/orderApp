// ajax封装
function $get(url, params='') {
    var layerAjaxLoading;
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'adminApi/' + url,
            data: params,
            success(res) {
                if (res.code == 0) {    
                    resolve(res)
                } else {
                    layer.msg(res.msg)
                    reject('请求错误信息:' + res.msg)
                }
            },
            error(err) {
                layer.msg('请求失败')
                reject('请求错误信息:' + res.msg)
            },
            beforeSend() {
                layerAjaxLoading = layer.load()
            },
            complete() {
                layer.close(layerAjaxLoading)
            }
        })
    })
}

function $post(url, params='') {
    var layerAjaxLoading;
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'adminApi/' + url,
            type: 'post',
            data: params,
            success(res) {
                if (res.code == 0) {
                    resolve(res)
                } else {
                    layer.msg(res.msg)
                    reject('请求错误信息:' + res.msg)
                }
            },
            error(err) {
                layer.msg('请求失败')
                reject('请求错误信息:' + res.msg)
            },
            beforeSend() {
                layerAjaxLoading = layer.load()
            },
            complete() {
                layer.close(layerAjaxLoading)
            }
        })
    })
}