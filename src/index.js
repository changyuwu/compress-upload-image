class CanvasTransfer {
  constructor(options) {
    let default_options = {
      upload_type: 'blob',
      upload_input_id: `canvas-compress-upload-input-ele-${this.getUuid()}`,
      compress_canvas_id: `canvas-compress-upload-canvas-ele-${this.getUuid()}`,
      upload_btn_selector: '',
      max_size: {
        width: 500,
        height: 500
      },
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
    let file = this.inputEle.files[0]
    if (!window.FileReader || !this.canvasEle.getContext || !window.atob || !window.Uint8Array || this.options.upload_type !== 'blob') {
      console.log('浏览器不支持 canvas 压缩上传')
      this.doTransferComplete(file)
      return
    }
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      let content = this.result
      let img = new Image()
      img.src = content
      img.onload = function () {
        that.compressEvent({img, file})
      }
    }
  }

  compressEvent({img, file}) {
    let canvas = this.canvasEle
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
    this.doTransferComplete(blob_data)
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

  getUuid(length = 30) {
    let guid = ""
    for (let i = 1; i <= length; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16)
      guid += n
    }
    return `a${guid}`
  }
}

window.CanvasUploaderTrasnsfer = CanvasTransfer

export default CanvasTransfer

