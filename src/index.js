class CanvasTransfer {
  constructor(options) {
    let default_options = {
      upload_type: 'blob',
      upload_input_id: `canvas-compress-upload-input-ele-${this._getUuid()}`,
      compress_canvas_id: `canvas-compress-upload-canvas-ele-${this._getUuid()}`,
      upload_btn_selector: '',
      max_size: {
        width: 500,
        height: 500
      },
      multiple: false,
      transferCallback: () => {}
    }
    this.options = Object.assign({}, default_options, options)
    this.inputEle = null
    this.canvasEle = null
    if (!this.options.upload_btn_selector || !document.querySelector(this.options.upload_btn_selector)) {
      console.log('upload_btn_selector 为空')
      return
    }
    this.bindEvent()
  }

  bindEvent() {
    const that = this
    let upload_btn = document.querySelector(this.options.upload_btn_selector)
    upload_btn.addEventListener('click', function() {
      that.checkUploadElements()
      that.inputEle.click()
    })
  }

  checkUploadElements() {
    const that = this
    let input_ele = document.getElementById(this.options.upload_input_id)
    let canvas_ele = document.getElementById(this.options.compress_canvas_id)
    if (!input_ele) {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('id', this.options.upload_input_id)
      input.setAttribute('accept', 'image/*')
      this.options.multiple && (input.setAttribute('multiple', 'multiple'))
      input.style.display = 'none'
      input.addEventListener('change', function() {
        that.onInputChange()
      })
      document.body.appendChild(input)
    }
    if (!canvas_ele) {
      let canvas = document.createElement('canvas')
      canvas.setAttribute('id', this.options.compress_canvas_id)
      canvas.style.display = 'none'
      document.body.appendChild(canvas)
    }
    this.inputEle = document.getElementById(this.options.upload_input_id)
    this.canvasEle = document.getElementById(this.options.compress_canvas_id)
  }

  onInputChange() {
    const that = this
    let files = this.inputEle.files
    let un_transfer_files = this.getEmptyArray(files.length).map(_ => {
      return {
        file: files[_],
        name: files[_].name
      }
    })
    if (!window.FileReader || !this.canvasEle.getContext || !window.atob || !window.Uint8Array || this.options.upload_type !== 'blob') {
      console.log('浏览器不支持 canvas 压缩上传')
      this.doTransferComplete(un_transfer_files)
      return
    }
    let transfer_promises = this.getEmptyArray(files.length).map(_ => this.transferSingleFilePromise(files[_]))
    Promise.all(transfer_promises).then(res => {
      console.log('res', res)
      this.doTransferComplete(res)
    }).catch(err => {
      console.log('err', err)
      this.doTransferComplete(un_transfer_files)
    })
  }

  transferSingleFilePromise(file) {
    const that = this
    return new Promise(resolve => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        let content = this.result
        let img = new Image()
        img.src = content
        img.onload = function () {
          resolve(that.compressEvent({img, file}))
        }
      }
    })
  }

  compressEvent({img, file}) {
    let canvas = this.createRandomCanvasEle()
    let ctx = canvas.getContext('2d')
    let width = img.width
    let height = img.height
    let scale = this.getMaxScale(width, height)
    img.width = width * scale
    img.height = height * scale
    width = width * scale
    height = height * scale
    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)
    let file_type = file.type ? file.type : "image/jpeg"
    let dataURL = canvas.toDataURL(file_type)
    let blob_data = this.dataURItoBlob(dataURL)
    document.body.removeChild(canvas)
    return {file: blob_data, name: file.name}
  }

  createRandomCanvasEle() {
    let canvas_id = `new_add_canvas-compress-upload-canvas-ele-${this._getUuid()}`
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', this.options.compress_canvas_id)
    canvas.style.display = 'none'
    document.body.appendChild(canvas)
    return canvas
  }

  dataURItoBlob(data_url){
    let arr = data_url.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      b_str = atob(arr[1]),
      n = b_str.length,
      u8arr = new Uint8Array(n)
    while(n--){
      u8arr[n] = b_str.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
  }

  doTransferComplete(d) {
    this.options.transferCallback && typeof this.options.transferCallback === 'function' && this.options.transferCallback(d)
    document.body.removeChild(this.inputEle)
    document.body.removeChild(this.canvasEle)
    this.canvasEle = null
    this.inputEle = null
  }

  getMaxScale(w, h) {
    let scale_x = this.options.max_size.width / w
    let scale_y = this.options.max_size.height / h
    return Math.min(scale_x, scale_y) > 1 ? 1 : Math.min(scale_x, scale_y)
  }

  _getUuid(length = 30) {
    let guid = ""
    for (let i = 1; i <= length; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16)
      guid += n
    }
    return `a${guid}`
  }

  static getUuid(length = 30) {
    let guid = ""
    for (let i = 1; i <= length; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16)
      guid += n
    }
    return `a${guid}`
  }
  
  getEmptyArray(len) {
    return Array.from(new Array(len).keys())
  }
}

window.CanvasUploaderTrasnsfer = CanvasTransfer

export default CanvasTransfer

